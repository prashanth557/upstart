import { BehaviorSubject, Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import {
    HttpErrorResponse,
    HttpHandler,
    HttpHeaderResponse,
    HttpInterceptor,
    HttpProgressEvent,
    HttpRequest,
    HttpResponse,
    HttpSentEvent,
    HttpUserEvent
} from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
    isRefreshingToken: boolean;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    constructor(private injector: Injector) { }
    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent |
        HttpHeaderResponse |
        HttpProgressEvent |
        HttpResponse<any> |
        HttpUserEvent<any>> {
        const authService = this.injector.get(AuthService);
        return next.handle(this.addToken(req, authService.getAuthToken())).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 400:
                            return this.handle400Error(error);
                        case 401:
                            return this.handle401Error(req, next);
                        case 403:
                            return this.handleError(error);
                        default:
                            return this.handleError(error);
                    }
                } else {
                    return observableThrowError(error);
                }
            }));
    }

    handleError(error) {
        if (error && error.status) {
            console.log('Http Failure with status code: ', error.status, error.url ? error.url : '');
        }
        return observableThrowError(error);
    }

    handle400Error(error) {
        if (error && error.status === 400) {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            return this.logoutUser();
        }

        return observableThrowError(error);
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            // this.tokenSubject.next(null);
            // const authService = this.injector.get(AuthService);
            this.logoutUser();
            // return authService.refreshToken().pipe(
            //     switchMap(() => {
            //         const newToken = authService.getAuthToken();
            //         console.log('newToken', newToken);
            //         if (newToken) {
            //             this.tokenSubject.next(newToken);
            //             return next.handle(this.addToken(req, newToken));
            //         }
            //         // If we don't get a new token, we are in trouble so logout.
            //         return this.logoutUser();
            //     }),
            //     catchError(error => {
            //         // If there is an exception calling 'refreshToken', bad news so logout.
            //         console.log('error in refreshtoken', JSON.stringify(error));
            //         return this.logoutUser();
            //     }),
            //     finalize(() => {
            //         this.isRefreshingToken = false;
            //     }));
        } else {
            // if (err.message === 'Authentication failed. Athenticating authority returned non OK status - .400') {
            //     return 'Invalid Credentials';
            // } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.addToken(req, token));
            }));
        }
    }

    logoutUser() {
        const authService = this.injector.get(AuthService);
        authService.deleteTokens();
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
        return observableThrowError(new Error('Your session seems to be expired'));
    }
}
