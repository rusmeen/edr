import { NgModule } from '@angular/core';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  exports: [CdkStepperModule,MatStepperModule,MatProgressSpinnerModule,DragDropModule,MatProgressBarModule],
})

export class MaterialModule {}
