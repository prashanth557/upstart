import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { HttpWrapper, IRequestOptions } from '../services/http-wrapper/http-wrapper';
import { UrlConfig } from '../config/url-config';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BulkCrawlService {

  config = new UrlConfig().getConfig();
  constructor(public http: HttpWrapper) {
  }
  getBulkPageList(pagenum, limit) {
    const url = this.config.bulkCrawlUrl + '?pagenum=' + pagenum + '&pagesize=' + limit;
    return this.http.authenticatedGet(url)
      .toPromise()
      .then(res => {
        return res;
      }).catch(err => {
        return this.handleError(err);
      });
  }

  getBulkCrawlJobDetails(jobId, offset, limit) {
    const url = this.config.bulkCrawlUrl + '/' + jobId;
    return this.http.authenticatedGet(url)
      .toPromise()
      .then(res => {
        return res;
      }).catch(err => {
        return this.handleError(err);
      });
  }

  createBulkJobs(jobTitle: string, file: File) {
    const url = 'https://exucfileuploader.azurewebsites.net/bulkproductcrawls';
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('jobTitle', jobTitle);
    formdata.append('token', Cookie.get('_token'));
    return this.http.authenticatedPost(url, formdata).toPromise().then(data => {
      return data;
    }).catch(err => {
      this.handleError(err);
    });
  }

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

  runJob(productId, urlPath) {
    const url = this.config.baseApiUrl + urlPath + '/' + productId + '/run';
    return this.http.authenticatedPost(url, {})
      .toPromise()
      .then(res => {
        if (res) {
          return res;
        }
      }).catch(err => {
        return this.handleError(err);
      });
  }

  getBulkCrawlRunHistory(jobId, pageNum, pageLimit) {
    const url = this.config.bulkCrawlUrl + '/' + jobId + '/runhistory';
    return this.http.authenticatedGet(url).toPromise().then((data: any) => {
      if (data) {
        return data;
      }
    }).catch((err: any) => {
      this.handleError(err);
    });
  }

  getBulkCrawlRunResults(jobId, runId, pageNumber, pageLimit) {
    const url = this.config.bulkCrawlUrl + '/' + jobId + '/runhistory/' + runId
      + '/result?pagenum=' + pageNumber + '&pagesize=' + pageLimit;
    return this.http.authenticatedGet(url).toPromise().then((data: any) => {
      if (data) {
        return data;
      }
    }).catch((err: any) => {
      this.handleError(err);
    });
  }

  getBulkLastRunSummary(jobId) {
    const url = this.config.bulkCrawlUrl + '/' + jobId + '/lastresultsummary';
    return this.http.authenticatedGet(url).toPromise().then((data: any) => {
      if (data) {
        return data;
      }
    }).catch((err: any) => {
      this.handleError(err);
    });
  }

  getBulkRunResultSummary(jobId, runId) {
    const url = this.config.bulkCrawlUrl + '/' + jobId + '/runhistory/' + runId + '/resultsummary';
    return this.http.authenticatedGet(url).toPromise().then((data: any) => {
      if (data) {
        return data;
      }
    }).catch((err: any) => {
      this.handleError(err);
    });
  }

  getBulkCrawlLastRunJobDetails(jobId) {
    const url = this.config.bulkCrawlUrl + '/' + jobId + '/lastresult';
    return this.http.authenticatedGet(url)
      .toPromise()
      .then(res => {
        return res;
      }).catch(err => {
        return this.handleError(err);
      });
  }

  getBulkCrawlLastRunSummarDetails(jobId) {
    const url = this.config.bulkCrawlUrl + '/' + jobId + '/lastresultsummary';
    return this.http.authenticatedGet(url)
      .toPromise()
      .then(res => {
        return res;
      }).catch(err => {
        return this.handleError(err);
      });
  }

  exportRunHistory(jobId, runId) {
    const url = this.config.bulkCrawlUrl + '/' + jobId + '/runhistory/' + runId + '/export';
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
    return Promise.reject(error);
  }

}