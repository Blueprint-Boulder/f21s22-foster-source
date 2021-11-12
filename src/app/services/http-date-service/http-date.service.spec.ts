import { TestBed } from '@angular/core/testing';

import { HttpDateService } from './http-date.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {accountServiceProvider} from "../account-service/account.service.provider";
import {AccountService} from "../account-service/account.service";
import {AccountImplService} from "../account-service/account.impl.service";

describe('HttpDateService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AccountService, useClass: AccountImplService, deps: [HttpClient]},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpDateService,
          multi: true,
        }
      ]
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('interceptor', () => {
    it('Should change dates in req', () => {
      const dummy = {
        a: "Hey man!",
        b: 331,
        c: [1, 2, "3"],
        nest: {
          nestAgain: {
            date: "2021-10-27T00:25:21+00:00"
          },
          date: "2021-10-27T00:25:21+00:00"
        }
      }

      service.getApplicants().subscribe(applicantRes => {
        // @ts-ignore
        expect((dummy as any).nest.date instanceof Date).toBeTrue();
      })

      const req = httpMock.expectOne(`${environment.backendHost}/api/db/accounts/applicants`);
      expect(req.request.method).toBe("GET");
      req.flush(dummy);

    })
  })
});
