import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpWrapper, IRequestOptions } from '../services/http-wrapper/http-wrapper';
import { UrlConfig } from '../config/url-config';
import { Cookie} from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  config = new UrlConfig().getConfig();
  constructor( public http: HttpWrapper) { }

  // Get all the keyword relevance job details
  getAllKeywordRelevanceJobDetails(offset) {
    const url = this.config.keywordRelevanceUrl + '?offset=' + offset + '&limit=5';
     const options: IRequestOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'text'
      })
    };
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'application/json' };
    return this.http.authenticatedGet(url, options)
    .toPromise()
    .then((res: any) => {
      if (res) {
        return Promise.resolve(res);
      }
    }).catch(err => {
      return this.handleError(err);
    });
  }

  // Run a particular job
  runJob(productId, path) {
    const url = this.config.baseApiUrl + path + '/' + productId + '/run';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      if (res) {
        return res;
      }
    }).catch(err => {
      return this.handleError(err);
    });
  }

  // Get Keywordrelevance Job details
  getKeyWordRelevanceJobDetails(jobId) {
    const url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresult';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  // Delete a job using jobId
  deleteJob(jobId) {
    const url = this.config.keywordRelevanceUrl + '/' + jobId;
    return this.http.authenticatedDelete(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  createKeywordJob(keywordInput, jobTitle) {
    const url = this.config.keywordRelevanceUrl;
    const body = {
      'keywordInput': keywordInput,
      'title': jobTitle
    };
    return this.http.authenticatedPost(url, body)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  // get brand presence for a job Id

  getBrandPresenceDetails(jobId) {
    const url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresult/brandspresence';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getBrandRatingDetails(jobId) {
    const url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresult/brandsproductrating';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getNumberOfImages(jobId) {
    const url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresult/brandsavgimages';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getNumberOfBulletPoints(jobId) {
    const url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresult/brandsavgbullets';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getNumberOfCharacters(jobId) {
    const url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresult/brandsavgtitlelength';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }


  // Map Montior Jobs

 getAllMapMontiorJobDetails() {
    const url = this.config.mapMontiorJobsUrl;
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getMapMontiorJobDetails(jobId) {
    const url = this.config.mapMontiorJobsUrl + '/' + jobId;
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getMapMontiorLastRunJobDetails(jobId) {
    const url = this.config.mapMontiorJobsUrl + '/' + jobId + '/lastrunresult';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getRunHistoryDetails(jobId, runId) {
    const url = this.config.mapMontiorJobsUrl + '/' + jobId + '/runhistory/' + runId + '/result';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  public handleError(error: any): Promise<any> {
    console.error('An error in api execution occurred', error);
    return Promise.reject(error.message || error);
  }
}
