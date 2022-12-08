import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../modules/shared.module';

import { LoginComponent,RegisterComponent} from '../../components';
import { AccountService } from '../../services';
import { AccountRoutingModule } from './account-routing.module';


@NgModule({
    imports: [
     
        CommonModule,SharedModule,AccountRoutingModule

    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    providers: [AccountService ],
  
})
export class AccountModule { };