import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Grupo } from './interfaces/Grupo.interface';
import { Maestro } from './interfaces/Maestro.interface';
import { Turno } from './interfaces/Turno.interface';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Horarios';
  constructor(private _api: ApiService) {}

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
        this.maestros = [];
        this.grupos = [];
      });
  }

  onGrupoChange() {
    this.grupoControl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((id) => {
        this.getProfesores();
        this.maestros = [];
      });
  }
}
