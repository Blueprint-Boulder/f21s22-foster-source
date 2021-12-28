import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { ToastContainerComponent } from './common/toast-container/toast-container.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { HttpDateService } from './services/http-date-service/http-date.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoggingInterceptor } from './services/logging.interceptor';
import { profileServiceProvider } from './services/profile-service/profile.service.provider';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ToastContainerComponent, NavBarComponent],
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
