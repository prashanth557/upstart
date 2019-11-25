import { Injectable } from '@angular/core';
import { HttpWrapper } from '../services/http-wrapper/http-wrapper';
import { UrlConfig } from '../config/url-config';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class SellerCrawlService {

  config = new UrlConfig().getConfig();
  constructor(public http: HttpWrapper) {
  }
  getSellerCrawlJobs(pagenum, limit) {
    const url = this.config.sellerCrawlsUrl + '?pagenum=' + pagenum + '&pagesize=' + limit;
    return this.http.authenticatedGet(url)
      .toPromise()
      .then(res => {
        return res;
      }).catch(err => {
        return this.handleError(err);
      });
  }

  createCrawlJobs(jobTitle: string, file: File) {
    const url = 'https://exucfileuploader.azurewebsites.net/sellercrawls';
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

  // Delete a job using jobId
  deleteJob(jobId) {
    const url = this.config.sellerCrawlsUrl + '/' + jobId;
    return this.http.authenticatedDelete(url)
      .toPromise()
      .then(res => {
        return res;
      }).catch(err => {
        return this.handleError(err);
      });
  }

  // Run a particular job
  runJob(productId) {
    const url = this.config.sellerCrawlsUrl + '/' + productId + '/run';
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

  // Run History of a particular Job
  getSellerCrawlRunHistory(jobId, pageNum, pageLimit) {
    const url = this.config.sellerCrawlsUrl + '/' + jobId + '/runhistory';
    return this.http.authenticatedGet(url).toPromise().then((data: any) => {
      if (data) {
        return data;
      }
    }).catch((err: any) => {
      this.handleError(err);
    });
  }


  // Run Results of a particular Job of particular runId 
  getSellerCrawlRunResults(jobId, runId, pageNumber, pageLimit) {
    const url = this.config.sellerCrawlsUrl + '/' + jobId + '/runhistory/' + runId
      + '/result?pagenum=' + pageNumber + '&pagesize=' + pageLimit;
    return this.http.authenticatedGet(url).toPromise().then((data: any) => {
      if (data) {
        return data;
      }
    }).catch((err: any) => {
      this.handleError(err);
    });
  }

  // Summary of Last run job
  getSellerLastRunSummary(jobId) {
    const url = this.config.sellerCrawlsUrl + '/' + jobId + '/lastresultsummary';
    return this.http.authenticatedGet(url).toPromise().then((data: any) => {
      if (data) {
        return data;
      }
    }).catch((err: any) => {
      this.handleError(err);
    });
  }

  // Summary of Run history 
  getSellerRunResultSummary(jobId, runId) {
    const url = this.config.sellerCrawlsUrl + '/' + jobId + '/runhistory/' + runId + '/resultsummary';
    return this.http.authenticatedGet(url).toPromise().then((data: any) => {
      if (data) {
        return data;
      }
    }).catch((err: any) => {
      this.handleError(err);
    });
  }

  // Last Run job Details
  getSellerCrawlLastRunJobDetails(jobId) {
    const url = this.config.sellerCrawlsUrl + '/' + jobId + '/lastresult';
    return this.http.authenticatedGet(url)
      .toPromise()
      .then(res => {
        return res;
      }).catch(err => {
        return this.handleError(err);
      });
  }

  // Last run summary details
  getSellerCrawlLastRunSummarDetails(jobId) {
    const url = this.config.sellerCrawlsUrl + '/' + jobId + '/lastresultsummary';
    return this.http.authenticatedGet(url)
      .toPromise()
      .then(res => {
        return res;
      }).catch(err => {
        return this.handleError(err);
      });
  }

  // Details of a particular seller Job
  getSellerCrawlJobDetails(jobId, offset, limit) {
    const url = this.config.sellerCrawlsUrl + '/' + jobId;
    return this.http.authenticatedGet(url)
      .toPromise()
      .then(res => {
        return res;
      }).catch(err => {
        return this.handleError(err);
      });
  }

  // Export details to CSV
  exportRunHistory(jobId, runId) {
    const url = this.config.sellerCrawlsUrl + '/' + jobId + '/runhistory/'  + runId + '/export';
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