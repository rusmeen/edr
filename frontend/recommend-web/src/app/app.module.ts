import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
// import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
// import { AlertComponent } from './components';
import { HomeComponent ,RegisterComponent,LoginComponent} from './components';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        // AlertComponent,
        // HomeComponent,
        RegisterComponent,
        LoginComponent
    ],
    providers: [
        // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };