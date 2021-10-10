import { HttpClient } from '@angular/common/http';
import { EmailService } from './email.service';
import { EmailMockService } from './email.mock.service';

const emailServiceFactory = (http: HttpClient) => {
  return new EmailMockService(http);
};

export const emailServiceProvider = {
  provide: EmailService,
  useFactory: emailServiceFactory,
  deps: [HttpClient],
};
