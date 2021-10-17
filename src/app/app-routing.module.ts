
import { Not404Component } from './pages/not404/not404.component';
import { Not403Component } from './pages/not403/not403.component';
import { GuardService } from './_service/guard.service';
import { LoginComponent } from './pages/login/login.component';
import { PersonaEdicionComponent } from './pages/persona/persona-edicion/persona-edicion.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'persona', component: PersonaComponent, children: [
      { path: 'nuevo', component: PersonaEdicionComponent },
      { path: 'edicion/:id', component: PersonaEdicionComponent }
    ], canActivate: [GuardService]
  },
 
  { path: 'login', component: LoginComponent },
  { path: 'not-403', component: Not403Component },
  { path: 'not-404', component: Not404Component },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
