import { environment } from '../../environments/environment';
export class UrlConfig {
  env: string = environment.envName || 'dev';
  getConfig() {
    switch (this.env) {
      case 'test':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://private-15aca8-ucrawl1.apiary-mock.com/users/login',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/mapmonitorjobs',
        };
      case 'local':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://private-15aca8-ucrawl1.apiary-mock.com/users/login',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/mapmonitorjobs',
        };
      case 'dev':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://private-15aca8-ucrawl1.apiary-mock.com/users/login',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/mapmonitorjobs',
        };
      case 'uat':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://private-15aca8-ucrawl1.apiary-mock.com/users/login',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/mapmonitorjobs',
        };
      case 'prod':
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://private-15aca8-ucrawl1.apiary-mock.com/users/login',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/mapmonitorjobs',
        };
      default:
        return {
          'baseUrl': 'https://api-dev.upstart.com',
          'baseApiUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/',
          'loginUrl' : 'https://private-15aca8-ucrawl1.apiary-mock.com/users/login',
          'changePasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/changepass',
          'forgotPasswordUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/users/forgotpass',
          'keywordRelevanceUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs',
          'mapMontiorJobsUrl': 'https://private-15aca8-ucrawl1.apiary-mock.com/mapmonitorjobs',
        };
    }
  }
}
