import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpWrapper } from './http-wrapper';
import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

describe('HttpWrapper', () => {
  let service: HttpWrapper;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpWrapper, HttpClient]
    });
    service = TestBed.get(HttpWrapper);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('`authenticatedGet` method', () => {
    it('should call authenticatedGet',
      inject([HttpClient],
        (httpClient: HttpClient) => {
          service.authenticatedGet('/').subscribe((data: any) => {
            expect(httpClient.get).toHaveBeenCalled();
          });
        }));
  });
  describe('`authenticatedPost` method', () => {
    it('should call authenticatedGet',
      inject([HttpClient],
        (httpClient: HttpClient) => {
          service.authenticatedPost('/', {}, {}).subscribe((data: any) => {
            expect(httpClient.post).toHaveBeenCalled();
          });
        }));
  });
  describe('`authenticatedPut` method', () => {
    it('should call authenticatedGet',
      inject([HttpClient],
        (httpClient: HttpClient) => {
          service.authenticatedPut('/', {}).subscribe((data: any) => {
            expect(httpClient.put).toHaveBeenCalled();
          });
        }));
  });
  describe('`authenticatedDelete` method', () => {
    it('should call authenticatedGet',
      inject([HttpClient],
        (httpClient: HttpClient) => {
          service.authenticatedDelete('/').subscribe((data: any) => {
            expect(httpClient.delete).toHaveBeenCalled();
          });
        }));
  });
});
