import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../modules/shared.module';
import { InputDataRoutingModule } from './input-data-routing.module';
import { HomeComponent ,CategoryComponent ,FileUploadComponent} from '../../components';

import { MaterialModule } from '../../modules/material.module';

@NgModule({
    imports: [
     
        CommonModule,
        SharedModule,
        MaterialModule,InputDataRoutingModule
    ],
    declarations: [
         HomeComponent,
        CategoryComponent,
        FileUploadComponent
    ],
    providers: [ ]
})
export class InputDataModule { };