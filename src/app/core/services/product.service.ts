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
  getProductsVerification(id: number): Observable<any> {
    const options = id ?
      { params: new HttpParams().set('id', id) } : {};
    return this.http.get<any>(this.baseUrl + '/verification', options)
  }
  saveProduct(data: any): Observable<IProduct> {
    data.date_revision.setValue(data.date_revision.value.split('/').reverse().join('-'))
    return this.http.post<IProduct>(this.baseUrl, data)
  }
  updateProduct(data: any): Observable<IProduct> {
    data.date_revision.setValue(data.date_revision.value.split('/').reverse().join('-'))
    return this.http.put<IProduct>(this.baseUrl, data)
  }
}
