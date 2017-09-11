import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppConfig } from './app.config';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { GlobalEventsManager } from './_events/events.manager';

import {
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent, 
    ProfileComponent,
    NavbarComponent
} from './_components/index'


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent,
        ProfileComponent,
        NavbarComponent
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        GlobalEventsManager
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }