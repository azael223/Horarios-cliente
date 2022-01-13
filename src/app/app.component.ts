import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { Grupo } from './interfaces/Grupo.interface';
import { Maestro } from './interfaces/Maestro.interface';
import { Turno } from './interfaces/Turno.interface';
import { ApiService } from './services/api.service';
import * as moment from 'moment';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Horarios';
  constructor(private _api: ApiService) {}

  @ViewChild('horario') horario!: ScheduleComponent;

  private onDestroy$ = new Subject<any>();

  public turnos: Turno[] = [];
  public grupos: Grupo[] = [];
  public maestros: Maestro[] = [];

  public turnoControl = new FormControl(null, [Validators.required]);
  public grupoControl = new FormControl(null, [Validators.required]);

  ngOnInit(): void {
    this.getTurnos();
    // this.getGrupos();
    // this.getProfesores();
    this.onTurnoChange();
    this.onGrupoChange();
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {
    this.onDestroy$.next(false);
    this.onDestroy$.complete();
  }

  getTurnos() {
    this._api.Turnos.get()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((turnos) => {
        this.turnos = turnos;
      });
  }

  getGrupos(turno?: any) {
    this._api.Grupos.get(turno)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((grupos) => {
        this.grupos = grupos;
      });
  }

  getProfesores(grupo?: any) {
    this._api.Maestros.get(grupo)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((maestros) => {
        this.maestros = maestros;
      });
  }

  onTurnoChange() {
    this.turnoControl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((id) => {
        this.getGrupos(id);
        const turno = this.turnos.find((turno) => id == turno.id);
        this.horario.inicio = Number(turno?.hora_inicio.split(':')[0]);
        this.horario.fin = Number(turno?.hora_fin.split(':')[0]);
        this.horario.events = [];

        this.maestros = [];
        this.grupos = [];
      });
  }

  onGrupoChange() {
    this.grupoControl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((id) => {
        this.maestros = this.grupos.find(({ id }) => id)?.maestros || [];
        this.horario.events = [];
      });
  }

  generarHorario() {
    this._api.Horarios.gen()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((horario: any) => {
        let events: any[] = [];
        horario.forEach((h: any, index: number) => {
          events = [...events, ...this.eventMap(h, index + 1)];
        });
        this.horario.events = events;
      });
  }

  eventMap(horario: any[], index: number): CalendarEvent[] {
    return horario.map((evento) => ({
      start: moment()
        .startOf('week')
        .add(index, 'days')
        .set('hour', evento.hora_inicio)
        .toDate(),
      title: `${evento.materia} - ${evento.maestro}`,
      end: moment()
        .startOf('week')
        .add(index, 'days')
        .set('hour', evento.hora_fin)
        .toDate(),
    }));
  }
}
