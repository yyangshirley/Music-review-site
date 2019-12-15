import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OpenComponent } from './open/open.component';
import { SecureComponent } from './secure/secure.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatCardModule,
  MatSortModule,
  MatExpansionModule,
  MatDialogModule,


} from '@angular/material';
import { SignInComponent } from './home/sign-in/sign-in.component';
import { RegisterComponent } from './home/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './home/shared/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { 
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  LoginOpt
} from 'angularx-social-login';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { SongDetailComponent } from './home/song-detail/song-detail.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AdminSignInComponent } from './admin/admin-sign-in/admin-sign-in.component';
// import { DialogComponent } from './home/song-detail/dialog/dialog.component';

const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("374198599565-j1tdo3o3fsupbaqoa03182rtrtvfav01.apps.googleusercontent.com", googleLoginOptions)
  }
]);
export function provideConfig(){
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OpenComponent,
    SecureComponent,
    AdminComponent,
    SignInComponent,
    RegisterComponent,
    SongDetailComponent,
    PlaylistComponent,
    AdminSignInComponent,
    // DialogComponent
    
  ],
  // entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSortModule,
    SocialLoginModule,
    MatExpansionModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSliderModule,


  ],
  providers: [UserService,{
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true},
    {provide: AuthServiceConfig,
    useFactory: provideConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
