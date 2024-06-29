import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SongBaseComponent} from "../song/song-base/song-base.component";
import {LoginComponent} from "../auth/login/login.component";

const routes: Routes = [
    { path: 'songs', component: SongBaseComponent },
    { path: 'auth', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
