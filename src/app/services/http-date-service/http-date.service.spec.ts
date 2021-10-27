import { TestBed } from '@angular/core/testing';

import { HttpDateService } from './http-date.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {databaseServiceProvider, databaseServiceTestProvider} from "../database-service/database.service.provider";
import {DatabaseService} from "../database-service/database.service";
import {environment} from "../../../environments/environment";

describe('HttpDateService', () => {
  let service: DatabaseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        databaseServiceTestProvider,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpDateService,
          multi: true,
        }
      ]
    });
    service = TestBed.inject(DatabaseService);
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

      const req = httpMock.expectOne(`${environment.backendHost}/api/db/applicants`);
      expect(req.request.method).toBe("GET");
      req.flush(dummy);

    })
  })
});
