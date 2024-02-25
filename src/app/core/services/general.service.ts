import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }
  dateToText = function (stringDate: string | Date) {
    let date: any = stringDate
    var month = (date.getMonth() + 1)
    if (month < 10) {
      month = "0" + month
    }
    var day = date.getDate()
    if (day < 10) {
      day = "0" + day
    }

    let dateText: any = day + "/" + month + "/" + date.getFullYear();
    return dateText
  }
  setDateRevision(date_release: any) {
    const date = new Date(date_release.split("-")[0], parseInt(date_release.split("-")[1]) - 1, parseInt(date_release.split("-")[2]));
    date.setDate(date.getDate())
    date.setFullYear(date.getFullYear() + 1)
    return date

  }
}
