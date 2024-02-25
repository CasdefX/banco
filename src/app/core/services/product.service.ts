import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'
  constructor(private http: HttpClient) {
  }
  /* get all product list */
  getProductsList(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl).pipe(
      tap((response: IProduct[]) => {

        return response
      }), catchError(this.handleError("failed to fetch data"))
    )
  }
  /* check id duplicate */
  getProductsVerification(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/verification', { params: new HttpParams().set('id', id), })
  }
  /* create product record */
  saveProduct(data: any): Observable<IProduct> {
    data.date_revision = data.date_revision.split('/').reverse().join('-')
    return this.http.post<IProduct>(this.baseUrl, data).pipe(
      catchError(this.handleError("failed to save data"))
    )
  }
  /* remove product record */
  updateProduct(data: any): Observable<IProduct> {
    data.date_revision = data.date_revision.split('/').reverse().join('-')
    return this.http.put<IProduct>(this.baseUrl, data)
  }
  /* destroy product record */
  removeProduct(id: string): Observable<string> {
    return this.http.delete(this.baseUrl, { responseType: 'text', params: new HttpParams().set('id', id), })
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<never> => {
      const message = `server returned code ${error.status} with body "${error.error}"`
      throw new Error(`${operation} failed: ${message}`)
    }
  }
}
