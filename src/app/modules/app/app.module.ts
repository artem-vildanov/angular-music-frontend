import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongModule } from '../song/song.module'
import {AuthModule} from "../auth/auth.module";
import {SongApiService} from "../../services/song/song-api.service";
import {AuthApiService} from "../../services/auth/auth-api.service";
import {SongStateService} from "../../services/song/song-state.service";
import {ErrorInterceptor} from "../../interceptors/error.interceptor";
import {TokenInterceptor} from "../../interceptors/token.interceptor";
import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi
} from "@angular/common/http";
import {SpinnerModule} from "../spinner/spinner.module";
import {MatDialogModule} from "@angular/material/dialog";

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
        AuthModule,
        SpinnerModule,
        MatDialogModule,
    ],
    providers: [
        SongApiService,
        AuthApiService,
        SongStateService,
        TokenInterceptorProvider,
        ErrorInterceptorProvider,
        provideHttpClient(withInterceptorsFromDi()),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
