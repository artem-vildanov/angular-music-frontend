import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongModule } from '../song/song.module';
import { ShowIfEmptyDirective } from '../_directives/show-if-empty.directive';
import {AuthModule} from "../auth/auth.module";
import {SongApiService} from "../_services/song/song-api.service";
import {AuthApiService} from "../_services/auth/auth-api.service";
import {SongStateService} from "../_services/song/song-state.service";
import {ErrorInterceptor} from "../_interceptors/error.interceptor";
import {TokenInterceptor} from "../_interceptors/token.interceptor";
import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpClientModule,
    provideHttpClient,
    withInterceptorsFromDi
} from "@angular/common/http";

const TokenInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
}

const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SongModule,
        AuthModule
    ],
    providers: [
        SongApiService,
        AuthApiService,
        SongStateService,
        TokenInterceptorProvider,
        ErrorInterceptorProvider,
        provideHttpClient(withInterceptorsFromDi())
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
