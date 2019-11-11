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
          'refreshTokenUrl': 'https://exucrawlauth.azurewebsites.net/api/v1/users/refreshtoken',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/kwdrelvncjobs',
          // 'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/mapmonitorjobs',
          'organicKeywordUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/organickwds',
          'usersUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/getAll/',
          'alertsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/alerts',
          'bulkCrawlUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/bulkproductcrawls'
        };
      case 'local':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/',
          // 'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://exucrawlauth.azurewebsites.net/api/v1/users/login',
          'refreshTokenUrl': 'https://exucrawlauth.azurewebsites.net/api/v1/users/refreshtoken',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/kwdrelvncjobs',
          // 'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/mapmonitorjobs',
          'organicKeywordUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/organickwds',
          'usersUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/getAll/',
          'alertsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/alerts',
          'bulkCrawlUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/bulkproductcrawls'
        };
      case 'dev':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/',
          // 'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://exucrawlauth.azurewebsites.net/api/v1/users/login',
          'refreshTokenUrl': 'https://exucrawlauth.azurewebsites.net/api/v1/users/refreshtoken',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/kwdrelvncjobs',
          // 'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/mapmonitorjobs',
          'organicKeywordUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/organickwds',
          'usersUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/getAll/',
          'alertsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/alerts',
          'bulkCrawlUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/bulkproductcrawls'
        };
      case 'uat':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/',
          // 'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://exucrawlauth.azurewebsites.net/api/v1/users/login',
          'refreshTokenUrl': 'https://exucrawlauth.azurewebsites.net/api/v1/users/refreshtoken',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/kwdrelvncjobs',
          // 'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/mapmonitorjobs',
          'organicKeywordUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/organickwds',
          'usersUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/getAll/',
          'alertsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/alerts',
          'bulkCrawlUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/bulkproductcrawls'
        };
      case 'prod':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/',
          // 'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://exucrawlauth.azurewebsites.net/api/v1/users/login',
          'refreshTokenUrl': 'https://exucrawlauth.azurewebsites.net/api/v1/users/refreshtoken',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/kwdrelvncjobs',
          // 'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/mapmonitorjobs',
          'organicKeywordUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/organickwds',
          'usersUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/getAll/',
          'alertsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/alerts',
          'bulkCrawlUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/bulkproductcrawls'
        };
      default:
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/',
          // 'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://exucrawlauth.azurewebsites.net/api/v1/users/login',
          'refreshTokenUrl': 'https://exucrawlauth.azurewebsites.net/api/v1/users/refreshtoken',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/kwdrelvncjobs',
          // 'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/mapmonitorjobs',
          'organicKeywordUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/organickwds',
          'usersUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/getAll/',
          'alertsUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/alerts',
          'bulkCrawlUrl': 'https://exucrawlapis.azurewebsites.net/api/v1/bulkproductcrawls'
        };
    }
  }
}
