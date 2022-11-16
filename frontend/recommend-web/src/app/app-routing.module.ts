import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent,RegisterComponent,LoginComponent } from './components';
// import { AuthGuard } from './_helpers';

// const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
// const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: LoginComponent, },
     { path: 'register',component:RegisterComponent },
    // { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
