import { Cookie } from 'ng2-cookies';
import { Inject } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { AppStorage } from '../services/for-storage/universal.inject';

export function getTokenData(parsedToken?: string): any {
  const token: string = parsedToken ? parsedToken : Cookie.get('_token');
  return token ? jwtDecode(token) : {};
}

export class TokenUtil {

  constructor(@Inject(AppStorage) private appStorage: Storage) {}

  public getTokenData(): any {
    return getTokenData(this.appStorage.getItem('_token'));
  }

  public getOrganizationId(): string {
    const tokenData = this.getTokenData();
    return (tokenData && tokenData.user && tokenData.user.organizationId) ? tokenData.user.organizationId.toString() : '';
  }

  public isAnonymous(): boolean {
    const tokenData = this.getTokenData();
    // if organization Id is present, consider as authenticated
    return (tokenData && tokenData.user && tokenData.user.userType.toLowerCase() === 'ip' && !tokenData.user.organizationId) ? true : false;
  }

  public getPartyId(): string {
    const tokenObj: any = this.getTokenData();
    return tokenObj.user ? (tokenObj.user.partyId ? tokenObj.user.partyId.toString() : '') : '';
  }

  public getCountryCodeFromToken(): string {
    const tokenObj: any = this.getTokenData();
    return tokenObj.country_code;
  }

  public getTokenFromCookie() {
    return Cookie.get('_token');
  }

}
