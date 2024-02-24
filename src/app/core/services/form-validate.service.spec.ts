import { TestBed } from '@angular/core/testing';

import { FormValidateService } from './form-validate.service';

describe('formValidateService', () => {
  let service: FormValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormValidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
