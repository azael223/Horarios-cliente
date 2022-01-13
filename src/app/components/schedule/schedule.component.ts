import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, addHours, endOfMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  viewDate: Date = new Date();

  refresh = new Subject<void>();

  @ViewChild('inicio') inicio!: number;
  @ViewChild('fin') fin!: number;

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  events: CalendarEvent[] = [];
}
