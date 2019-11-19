import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UrlConfig } from '../config/url-config';

@Injectable()
export class ActivateOnAccessToken implements CanActivate {
    config = new UrlConfig().getConfig();
    constructor(private router: Router) { 
    }

    canActivate(){
        const role = Cookie.get('role');
        if(role.toLowerCase() === 'admin') {
            return true;
        } else {
            window.location.href = this.config.websiteUrl;
        }
    }
}
