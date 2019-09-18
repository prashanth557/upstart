import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequestInterceptorService } from './request.interceptor';
import { inject, TestBed } from '@angular/core/testing';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent } from '@angular/common/http';
  import { Injectable, Injector } from '@angular/core';
  import { AuthService } from '../auth.service';
  import { CookieService } from 'ng2-cookies';
  import { BehaviorSubject, Observable, throwError as observableThrowError } from 'rxjs';

describe('RequestInterceptorService', () => {
  let service: RequestInterceptorService;
  class MockInjector {
    get() {
    }
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RequestInterceptorService, AuthService, CookieService,
        { provide: Injector, useClass: MockInjector}
      ]
    });
    service = TestBed.get(RequestInterceptorService);
  });

  it('should handle400Error', () => {
    spyOn(service, 'logoutUser');
    const error ={status: 400, message: 'invalid HTTP method/URL pair'};
    service.handle400Error(error);
    expect(service.logoutUser).toHaveBeenCalled();
  });

  it('should handleError', () => {
    spyOn(console, 'log');
    const error ={status: 400, message: 'invalid HTTP method/URL pair'};
    service.handleError(error);
    expect(console.log).toHaveBeenCalled();
  });
  
});