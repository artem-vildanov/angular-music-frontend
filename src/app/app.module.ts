import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongBaseModule } from './song-base/song-base.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, SongBaseModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
