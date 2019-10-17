import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment'
import { Client, ClientAdapter } from './client.model';
import { Feature, FeatureAdapter } from './feature.model'
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient,
    private clientAdapter: ClientAdapter,
    private featureAdapter: FeatureAdapter, ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      alert("Sorry an error occured on the client side")
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error instanceof HttpErrorResponse && error.status == 404) {
        window.open('/', '_self')
      }
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  public changePriority(id: number, newPriority: number) {
    console.log(id, newPriority)
    return this.httpClient.patch(environment.api + 'features/' + id,
      {
        //"product_area": "AS"
        "priority": newPriority,
      }).pipe(retry(1),
        catchError(this.errorHandl))
  }

  public createClient(clientName: string) {
    return this.httpClient.post(environment.api + 'clients',
      {
        "name": clientName,
      }).pipe(retry(1),
        catchError(this.errorHandl))
  }

  public createFeature(featureTitle: string, featureDescription: string, featureDate: string, featureArea: string, client: number, priority: number) {
    return this.httpClient.post(environment.api + 'features',
      {
        "title": featureTitle,
        "description": featureDescription,
        "target_date": featureDate,
        "client": client,
        "product_area": featureArea,
        "priority": priority

      }).pipe(retry(1),
        catchError(this.errorHandl))
  }

  public getFeatures(params: any): Observable<Feature[]> {
    if (params.client) {
      return this.httpClient.get(environment.api + 'features?client=' + params.client)
        .pipe(
          map((data: any[]) => data.map(item => this.featureAdapter.adapt(item))),
          retry(1),
          catchError(this.errorHandl)
        )
    }
    else {
      return this.httpClient.get(environment.api + 'features')
        .pipe(
          map((data: any[]) => data.map(item => this.featureAdapter.adapt(item))),
          retry(1),
          catchError(this.errorHandl)
        )
    }

  }

  public getClients(): Observable<Client[]> {
    return this.httpClient.get(environment.api + 'clients')
      .pipe(
        map((data: any[]) => data.map(item => this.clientAdapter.adapt(item))),
        retry(1),
        catchError(this.errorHandl)
      )
  }
}
