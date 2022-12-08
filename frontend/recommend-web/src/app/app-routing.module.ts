import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



// import { AuthGuard } from './_helpers';

const accountModule = () => import('./components/account/account.module').then(x => x.AccountModule);
const InputDataModule = () => import('./components/Input-data/input-data.module').then(x => x.InputDataModule);

const routes: Routes = [
    { path: '', loadChildren:accountModule },
    //  { path: 'register',component:RegisterComponent },
    { path: 'home', loadChildren:InputDataModule  },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
