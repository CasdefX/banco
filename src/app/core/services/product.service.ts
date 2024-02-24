import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { Observable, map } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'
  constructor(private http: HttpClient, private gnrlService: GeneralService) {
  }
  /* get all product list */
  getProductsList(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl)
      .pipe(
        map((response: any) => {
          for (const item of response) {
            item.isMenuOpen = false;
          }
          return response
        })
      )
  }
  /* check id duplicate */
  getProductsVerification(id: string): Observable<any> {
    const options = id ?
      { params: new HttpParams().set('id', id) } : {};
    return this.http.get<any>(this.baseUrl + '/verification', options)
  }
  /* create product record */
  saveProduct(data: any): Observable<IProduct> {
    data.date_revision = data.date_revision.split('/').reverse().join('-')
    return this.http.post<IProduct>(this.baseUrl, data)
  }
  /* remove product record */
  updateProduct(data: any): Observable<IProduct> {
    data.date_revision = data.date_revision.split('/').reverse().join('-')
    return this.http.put<IProduct>(this.baseUrl, data)
  }
  /* destroy product record */
  removeProduct(id: string): Observable<string> {
    return this.http.delete(this.baseUrl, { responseType: 'text', params: new HttpParams().set('id', id), }).pipe(
      map((response: any) => {
        return response
      })
    )
  }
}
