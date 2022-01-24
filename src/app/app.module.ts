import { availabilityServiceProvider } from './services/availability-service/availability.service.provider';
import { announcementServiceProvider } from './services/announcement-service/announcement.service.provider';
import { phoneNumberServiceProvider } from './services/phone-number-service/phone-number.service.provider';
import { blacklistServiceProvider } from './services/blacklist-service/blacklist.service.provider';
import { BugReportModalComponent } from './common/bug-report-modal/bug-report-modal.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { ToastContainerComponent } from './common/toast-container/toast-container.component';
import { profileServiceProvider } from './services/profile-service/profile.service.provider';
import { accountServiceProvider } from './services/account-service/account.service.provider';
import { addressServiceProvider } from './services/address-service/address.service.provider';
import { imageServiceProvider } from './services/image-service/image.service.provider';
import { bugServiceProvider } from './services/bug-service/bug.service.provider';
import { HttpDateService } from './services/http-date-service/http-date.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoggingInterceptor } from './services/logging.interceptor';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ToastContainerComponent,
    NavBarComponent,
    BugReportModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpDateService,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    profileServiceProvider,
    accountServiceProvider,
    addressServiceProvider,
    phoneNumberServiceProvider,
    blacklistServiceProvider,
    announcementServiceProvider,
    imageServiceProvider,
    announcementServiceProvider,
    availabilityServiceProvider,
    bugServiceProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
