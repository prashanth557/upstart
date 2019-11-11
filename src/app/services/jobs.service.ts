import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { HttpWrapper, IRequestOptions } from '../services/http-wrapper/http-wrapper';
import { UrlConfig } from '../config/url-config';
import { Cookie} from 'ng2-cookies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  config = new UrlConfig().getConfig();
  constructor( public http: HttpWrapper) { }

  // Get all the keyword relevance job details
  getAllKeywordRelevanceJobDetails(pagenum, limit) {
    const url = this.config.keywordRelevanceUrl + '?pagenum=' +  pagenum + '&pagesize=' + limit;
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

  getSpecificJobDetails(jobId) {
    const url = this.config.keywordRelevanceUrl + '/' + jobId;
    return this.http.authenticatedGet(url , {})
    .toPromise()
    .then(res => {
      if (res) {
        return Promise.resolve(res);
      }
    }).catch(err => {
      return this.handleError(err);
    });
  }

  // Get Keywordrelevance Job details
  getKeyWordRelevanceJobDetails(jobId, offset, limit) {
    const url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresult' + '?pagenum=' +  offset  + '&pagesize=' + limit;
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  // Get Keywordrelevance Job details
  getKeyWordRelevanceLastJobSummary(jobId) {
    const url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresultsummary';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  // Delete a job using jobId
  deleteJob(jobId, urlPath) {
    const url = this.config.baseApiUrl + urlPath + '/' + jobId;
    return this.http.authenticatedDelete(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  // Run a particular job
  runJob(productId, urlPath) {
    const url = this.config.baseApiUrl + urlPath + '/' + productId + '/run';
    return this.http.authenticatedPost(url , {})
    .toPromise()
    .then(res => {
      if (res) {
        return res;
      }
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
    // const url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresult/brandspresence';
    const url = 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs/' + jobId + '/lastresult/brandspresence';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getBrandRatingDetails(jobId) {
    // const url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresult/brandsproductrating';
    const url = 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs/' + jobId + '/lastresult/brandsproductrating';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getNumberOfImages(jobId) {
    // const url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresult/brandsavgimages';
    const url = 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs/' + jobId + '/lastresult/brandsavgimages';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getNumberOfBulletPoints(jobId) {
    // const url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresult/brandsavgbullets';
    const url = 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs/' + jobId + '/lastresult/brandsavgbullets';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getNumberOfCharacters(jobId) {
    // const url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresult/brandsavgtitlelength';
    const url = 'https://private-15aca8-ucrawl1.apiary-mock.com/kwdrelvncjobs/' + jobId + '/lastresult/brandsavgtitlelength';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  // Map montior summary
  getMapMonitorSummary() {
    const url = this.config.baseApiUrl + '/mapmonitorsummary';
    // const url = 'https://private-15aca8-ucrawl1.apiary-mock.com/mapmonitorsummary';
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  // Map Montior Jobs

 getAllMapMontiorJobDetails(pagenum, limit) {
    const url = this.config.mapMontiorJobsUrl + '?pagenum=' + pagenum + '&pagesize=' + limit;
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getMapMontiorJobDetails(jobId, pagenum, limit) {
    const url = this.config.mapMontiorJobsUrl + '/' + jobId + '?pagenum=' + pagenum + '&pagesize=' + limit;
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
  getRunHistoryDetails(jobId, runId, pageNum, pageLimit) {
    const url = this.config.mapMontiorJobsUrl + '/' + jobId + '/runhistory/' + runId + '/result' +
    '?pagenum=' +  pageNum  + '&pagesize=' + pageLimit;
    return this.http.authenticatedGet(url)
    .toPromise()
    .then(res => {
      return res;
    }).catch(err => {
      return this.handleError(err);
    });
  }

  // getOrganicKeywordsMap
  getAllOrganicJobDetails(pagenum, limit) {
    const url = this.config.organicKeywordUrl + '?pagenum=' +  pagenum  + '&pagesize=' + limit;
    return this.http.authenticatedGet(url)
    .toPromise()
    .then((res: any) => {
      if (res) {
        return res;
      }
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getAnalyticsDetails(urlPath, jobId, type, fromDate?: any, toDate?: any ) {
      let url;
      if (type && type.toLowerCase() === 'keyword relevance') {
         url = this.config.keywordRelevanceUrl + '/' + jobId + '/lastresult/' + urlPath;
      } else {
        if (fromDate === '') {
          fromDate = '2019-11-01';
        } if (toDate === '') {
          toDate = '2019-11-11';
        }
        url = this.config.organicKeywordUrl + '/' + jobId + '/runresults/' + urlPath + '?from=' + fromDate + '&to=' + toDate;
      }
      return this.http.authenticatedGet(url)
        .toPromise()
        .then((response: any) => {
          if (response) {
            console.log('TypeOf urlPath', typeof response);
            return response;
          } else {
            return {};
          }
        })
        .catch( err => {
          this.handleError(err);
        });
  }

  createMapMonitorJob(jobTitle: string, file: File) {
    const url = 'https://exucfileuploader.azurewebsites.net/mapmonitorjobs';
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('jobTitle', jobTitle);
    formdata.append('token', Cookie.get('_token'));
    return this.http.authenticatedPost(url, formdata).toPromise().then(data => {
      return data;
    }).catch( err => {
      this.handleError(err);
    });
  }

  createBulkJobs(jobTitle: string, file: File) {
    const url = this.config.bulkCrawlUrl;
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('jobTitle', jobTitle);
    formdata.append('token', Cookie.get('_token'));
    return this.http.authenticatedPost(url, formdata).toPromise().then(data => {
      return data;
    }).catch( err => {
      this.handleError(err);
    });
  }

  getMapMonitorRunHistoryDetails(jobId: any, offset, limit) {
    const url = this.config.mapMontiorJobsUrl + '/' + jobId + '/runhistory?pagenum=' + ( offset + 1 ) + '&pagesize=' + limit ;
    return this.http.authenticatedGet(url).toPromise().then( res => {
      return res;
    }).catch( err => {
      this.handleError(err);
    });
  }

  createOrganicKeyword(title) {
    const body = {
      'keyword': title
    };
    const url = this.config.organicKeywordUrl;
    return this.http.authenticatedPost(url, body).toPromise().then( (data: any) => {
      return data;
    }).catch( (err: any) => {
      this.handleError(err);
    });
  }


  updateOrganicKeyword(jobId, body) {
    const url = this.config.organicKeywordUrl + '/' + jobId;
    return this.http.authenticatedPut(url, body).toPromise().then( (data: any) => {
      if (data) {
        return data;
      }
    }).catch((err) => {
      this.handleError(err);
    });
  }

  enableOrganickeywordsSchedule(jobId) {
    const url = this.config.organicKeywordUrl + '/' + jobId + '/schedule';
    return this.http.authenticatedPost(url, {}).toPromise().then( (data: any) => {
      if (data) {
        return data;
      }
    }).catch( (err: any) => {
      this.handleError(err);
    });
  }

  deleteOrganickeywordsSchedule(jobId) {
    const url = this.config.organicKeywordUrl + '/' + jobId + '/schedule';
    return this.http.authenticatedDelete(url).toPromise().then( (data: any) => {
      // if (data) {
        return data;
      // }
    }).catch( (err: any) => {
      this.handleError(err);
    });
  }

  getOrganickeywordsRunHistory(jobId, pageNumber, pageLimit) {
    const url = this.config.organicKeywordUrl + '/' + jobId + '/runhistory' + '?pagenum=' +  pageNumber  + '&pagesize=' + pageLimit;
    return this.http.authenticatedGet(url).toPromise().then( (data: any) => {
      if (data) {
        return data;
      }
    }).catch( (err: any) => {
      this.handleError(err);
    });
  }

  getOrganicRunResults(jobId, runId, pageNumber, pageLimit) {
    const url = this.config.organicKeywordUrl + '/' + jobId + '/runhistory/' + runId
    + '/result?pagenum=' +  pageNumber  + '&pagesize=' + pageLimit;
    return this.http.authenticatedGet(url).toPromise().then( (data: any) => {
      if (data) {
        return data;
      }
    }).catch( (err: any) => {
      this.handleError(err);
    });
  }

  deleteOrganicKeyword(jobId) {
    const url = this.config.organicKeywordUrl + '/' + jobId;
    return this.http.authenticatedDelete(url).toPromise().then( (data: any) => {
      return data;
    }).catch( (err ) => {
      this.handleError(err);
    });
  }

  disableOrganicJob(jobId) {
    const url = this.config.organicKeywordUrl + '/' + jobId;
    const body = {
      'jobId': 'jobId'
    };
    return this.http.authenticatedPost(url, body).toPromise().then( (data: any) => {
      return data;
    }).catch( (err) => {
      this.handleError(err);
    });
  }

  getSpecificOrganicJobDetails(jobId) {
    const url = this.config.organicKeywordUrl + '/' + jobId;
    return this.http.authenticatedGet(url).toPromise().then( (data: any) => {
      if (data) {
       return data;
      }
    }).catch( (err) => {
      this.handleError(err);
    });
  }

  getUserList(path) {
  const url = this.config.usersUrl + path;
  return this.http.authenticatedGet(url).toPromise().then( (data: any) => {
    if (data) {
     return data;
    }
  }).catch( (err) => {
    this.handleError(err);
  });
  }
    

  createAdmin(path, body) {
    const url = this.config.baseApiUrl + path;
    return this.http.authenticatedPost(url, body).toPromise().then( (data: any) => {
      if (data) {
        return Promise.resolve(data);
      }
    }).catch(err => {
      return this.handleError(err);
    });
  }

  createVendor(path, name) {
    const url = this.config.baseApiUrl + path;
    const body = {
      name: name
    };
    return this.http.authenticatedPost(url, body).toPromise().then( (data: any) => {
      return Promise.resolve(data);
    }).catch(err => {
      return this.handleError(err);
    });
  }

  getAlerts(pageNumber, pageLimit) {
    const url = this.config.alertsUrl + '?pagenum=' +  pageNumber  + '&pagesize=' + pageLimit;
    return this.http.authenticatedGet(url).toPromise().then( (data: any) => {
      return Promise.resolve(data);
    }).catch(err => {
      return this.handleError(err);
    });
  }

  public handleError(error: any): Promise<any> {
    console.error('An error in api execution occurred', error);
    return Promise.reject(error);
  }
}
