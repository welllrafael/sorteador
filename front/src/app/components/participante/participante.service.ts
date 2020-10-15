import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { EMPTY, Observable } from 'rxjs';
import { Participante } from './participante.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {

  baseUrl = "http://localhost:3001/participante"
  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg,'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    })
  }

  create(participante: Participante): Observable<Participante> {
    return this.http.post<Participante>(this.baseUrl, participante).pipe(
      map(obj=>obj),
      catchError(e => this.erroHandler(e))
    );
  }

  
  read(): Observable<Participante[]>{
    return this.http.get<Participante[]>(this.baseUrl).pipe(
      map(obj=>obj),
      catchError(e => this.erroHandler(e))
    );
  }

  readNotChoose(): Observable<Participante[]>{
    return this.http.get<Participante[]>(this.baseUrl).pipe(
      map(obj=>obj),
      catchError(e => this.erroHandler(e))
    );
  }
  
  readById(id: number): Observable<Participante>{
    const url = `${this.baseUrl}/${id}`;
    console.log(url);
    return this.http.get<Participante>(url).pipe(
      map(obj=>obj),
      catchError(e => this.erroHandler(e))
    );
  }
  
  update(participante: Participante): Observable<Participante>{
    const url = `${this.baseUrl}/${participante.id}`  
    return this.http.put<Participante>(url,participante).pipe(
      map(obj=>obj),
      catchError(e => this.erroHandler(e))
    );
  }
  
  delete(id: number): Observable<Participante>{
    const url = `${this.baseUrl}/${id}`;
    console.log(url);
    return this.http.delete<Participante>(url).pipe(
      map(obj=>obj),
      catchError(e => this.erroHandler(e))
    );
  }
  
  erroHandler(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro',true)
    return EMPTY;
  }
}
