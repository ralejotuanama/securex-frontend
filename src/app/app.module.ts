import { ServerErrorsInterceptor } from './shared/server-errors.interceptor';
import { environment } from './../environments/environment';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonaComponent } from './pages/persona/persona.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PersonaEdicionComponent } from './pages/persona/persona-edicion/persona-edicion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoginComponent } from './pages/login/login.component';
import { JwtModule } from "@auth0/angular-jwt";
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';


export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    PersonaEdicionComponent,
    LoginComponent,
    Not403Component,
    Not404Component
   
  ],
  //entryComponents:[ MedicoDialogoComponent ] //era necesario desde Angular 8 hacia atrás
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    PdfViewerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.ALLOWD_HOST],
        disallowedRoutes: [`http://${environment.ALLOWD_HOST}/login/enviarCorreo`],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
