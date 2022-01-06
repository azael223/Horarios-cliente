import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Maestro } from 'src/app/interfaces/Maestro.interface';
@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss'],
})
export class PriorityComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input('profesores') profesores: Maestro[] = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.profesores, event.previousIndex, event.currentIndex);
  }
}
