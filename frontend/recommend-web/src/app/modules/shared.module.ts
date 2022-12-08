import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule} from '@angular/common/http';


@NgModule({
    exports: [

        HttpClientModule,FormsModule,ReactiveFormsModule
    ]
})
export class SharedModule { };