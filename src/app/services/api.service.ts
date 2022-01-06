import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Grupo } from '../interfaces/Grupo.interface';
import { Maestro } from '../interfaces/Maestro.interface';
import { Turno } from '../interfaces/Turno.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public Maestros = {
    get: (grupo?: any) => {
      const params: any = {};
      if (grupo) params.grupo = grupo;
      return this.http.get<Maestro[]>(`${environment.apiUri}/maestros`, {
        params,
      });
    },
  };

  public Turnos = {
    get: (filters?: any) =>
      this.http.get<Turno[]>(`${environment.apiUri}/turnos`),
  };

  public Grupos = {
    get: (turno?: any) => {
      const params: any = {};
      if (turno) params.turno = turno;
      return this.http.get<Grupo[]>(`${environment.apiUri}/grupos`, {
        params,
      });
    },
  };
}
