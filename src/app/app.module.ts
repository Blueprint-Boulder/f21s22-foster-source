import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { ToastContainerComponent } from './common/toast-container/toast-container.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageServiceTestComponent } from './image-service-test/image-service-test.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ToastContainerComponent,
    ImageServiceTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
