import { TestBed } from '@angular/core/testing';

import { GeneralService } from './general.service';

describe('GeneralService', () => {
  let service: GeneralService;

  beforeEach(() => {
    service = new GeneralService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should test transform data from dateToText method', () => {
    let date_release = "2024-02-24:00:00.000+00:00"
    let textDate = service.setDateRevision(date_release)
    expect(textDate.toISOString()).toEqual("2025-02-24T04:00:00.000Z")
    let date_revision = service.dateToText(textDate)
    expect(date_revision).toEqual("24/02/2025")

  });

  it('should test transform data whit 0 before day is is low than 10', () => {
    let date_release = "2024-02-02T00:00:00.000+00:00"
    let textDate = service.setDateRevision(date_release)
    expect(textDate.toISOString()).toEqual("2025-02-02T04:00:00.000Z")
    let date_revision = service.dateToText(textDate)
    expect(date_revision).toEqual("02/02/2025")

  });
});
