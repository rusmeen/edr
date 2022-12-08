import { NgModule } from '@angular/core';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  exports: [CdkStepperModule,MatStepperModule,MatProgressSpinnerModule,DragDropModule],
})

export class MaterialModule {}
