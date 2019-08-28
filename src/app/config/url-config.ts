import { environment } from '../../environments/environment';
export class UrlConfig {
  env: string = environment.envName;
  getConfig() {
    switch (this.env) {
      case 'test':
        return {
          'baseUrl': 'https://api-dev.taylorandfrancis.com',
        };
      case 'local':
        return {
          'baseUrl': 'https://api-dev.taylorandfrancis.com',
        };
      case 'dev':
        return {
          'baseUrl': 'https://api-dev.taylorandfrancis.com',
        };
      case 'uat':
        return {
          'baseUrl': 'https://api-uat.taylorandfrancis.com',
        };
      case 'prod':
        return {
          'baseUrl': 'https://api.taylorandfrancis.com',
        };
      default:
        return {
          'baseUrl': 'https://api-dev.taylorandfrancis.com',
        };
    }
  }
}
