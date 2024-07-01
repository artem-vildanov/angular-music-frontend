import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SongBaseComponent} from "../../song/song-base/song-base.component";
import {LoginComponent} from "../auth/login/login.component";
import {PublicBaseComponent} from "../public/public-base/public-base.component";
import {HomeBaseComponent} from "../home/home-base/home-base.component";
import {BaseAuthGuard} from "../../guards/base-auth-guard";
import {AuthenticatedGuard} from "../../guards/authenticated.guard";
import {UnauthorizedGuard} from "../../guards/unauthorized.guard";

const routes: Routes = [
    { path: '', redirectTo: '/public', pathMatch: 'full' },
    { path: 'songs', component: SongBaseComponent, canActivate: [AuthenticatedGuard] },
    { path: 'auth', component: LoginComponent, canActivate: [UnauthorizedGuard] },
    { path: 'public', component: PublicBaseComponent, canActivate: [UnauthorizedGuard] },
    { path: 'home', component: HomeBaseComponent, canActivate: [AuthenticatedGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
