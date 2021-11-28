import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { isObject } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root',
})
export class HttpDateService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // @ts-ignore
      // proceed when there is a response; ignore other events
      filter((event) => event instanceof HttpResponse),
      map(
        (event: HttpResponse<any>) => {
          if (event.body === undefined) {
            return event;
          }
          this.convertDates(event);
          return event;
        },
        // Operation failed; error is an HttpErrorResponse
        // @ts-ignore
        (error) => event
      )
    );
  }

  private convertDates(o: any): void {
    Object.keys(o).forEach((p) => {
      if (isObject(o[p])) {
        this.convertDates(o[p]);
      } else if (typeof o[p] === 'string' || o[p] instanceof String) {
        if (this.isIsotString(o[p])) {
          o[p] = new Date(o[p]);
        }
      }
    });
  }

  private isIsotString(s: string): boolean {
    let isotRegex =
      /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
    return isotRegex.test(s);
  }
}
