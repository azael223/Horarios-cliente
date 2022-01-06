import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriorityComponent } from './priority.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [PriorityComponent],
  imports: [CommonModule, DragDropModule],
  exports: [PriorityComponent],
})
export class PriorityModule {}
