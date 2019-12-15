import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { AdminComponent} from './admin/admin.component';
import { OpenComponent} from './open/open.component';
import { SecureComponent} from './secure/secure.component';
import { SignInComponent } from './home/sign-in/sign-in.component';
import { RegisterComponent } from './home/register/register.component';
import { SongDetailComponent } from './home/song-detail/song-detail.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AdminSignInComponent } from './admin/admin-sign-in/admin-sign-in.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'admin',
    component:AdminComponent
  },
  {
    path:'admin/login',
    component:AdminSignInComponent
  },
  {
    path:'open',
    component:OpenComponent
  },
  {
    path:'secure',
    component:SecureComponent
  },
  {
    path:'login',
    component:SignInComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'home/songDetail',
    component:SongDetailComponent
  },
  {
    path:'playlist',
    component:PlaylistComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
