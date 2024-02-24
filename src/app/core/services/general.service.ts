import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }
  dateToText = function (stringDate: string | Date) {
    let date: any = new Date(stringDate);
    var valor = (date.getMonth() + 1)
    if (valor < 10) {
      valor = "0" + valor
    }
    var valor2 = date.getDate()
    if (valor2 < 10) {
      valor2 = "0" + valor2
    }

    let dateText: any = valor2 + "/" + valor + "/" + date.getFullYear();
    return dateText
  }
  setDateRevision(date_release: Date) {
    const date = new Date(date_release);
    date.setDate(date.getDate() + 1)
    date.setFullYear(date.getFullYear() + 1)
    return date

  }
}
