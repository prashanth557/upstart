import { environment } from '../../environments/environment';
export class UrlConfig {
  env: string = environment.envName || 'dev';
  getConfig() {
    switch (this.env) {
      case 'test':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/',
          'loginUrl' : 'https://exucrawlauth.azurewebsites.net/api/v1/users/login',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/kwdrelvncjobs',
          // 'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/mapmonitorjobs',
          'organicKeywordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/organickwds',
        };
      case 'local':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/',
          // 'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://exucrawlauth.azurewebsites.net/api/v1/users/login',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/kwdrelvncjobs',
          // 'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/mapmonitorjobs',
          'organicKeywordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/organickwds',
        };
      case 'dev':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/',
          // 'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://exucrawlauth.azurewebsites.net/api/v1/users/login',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/kwdrelvncjobs',
          // 'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/mapmonitorjobs',
          'organicKeywordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/organickwds',
        };
      case 'uat':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/',
          // 'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://exucrawlauth.azurewebsites.net/api/v1/users/login',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/kwdrelvncjobs',
          // 'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/mapmonitorjobs',
          'organicKeywordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/organickwds',
        };
      case 'prod':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/',
          // 'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://exucrawlauth.azurewebsites.net/api/v1/users/login',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/kwdrelvncjobs',
          // 'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/mapmonitorjobs',
          'organicKeywordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/organickwds',
        };
      default:
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/',
          // 'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://exucrawlauth.azurewebsites.net/api/v1/users/login',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/kwdrelvncjobs',
          // 'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/mapmonitorjobs',
          'organicKeywordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/organickwds',
        };
    }
  }
}
