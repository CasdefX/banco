import { FormValidateService } from './form-validate.service';
import { FormBuilder, Validators } from '@angular/forms';

describe('formValidateService', () => {
  let service: FormValidateService;
  const fb = new FormBuilder();
  let insideModel = {
    id: "22",
    name: "22",
  }
  let myModel = {
    id: "22",
    name: "22",
    description: "22",
    logo: "22",
    date_release: "22",
    date_revision: fb.group(insideModel)
  }
  beforeEach(() => {

    service = new FormValidateService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should reset fromGroup and inside variables formGroups', () => {
    const form = fb.group(myModel);
    service.resetForm(form)
    console.log(form.controls['id'].value)
    expect(form.controls['id'].value).toEqual(null);
    expect(form.controls['name'].value).toEqual(null);
    expect(form.controls['description'].value).toEqual(null);
    expect(form.controls['date_revision'].value).toEqual({
      id: null,
      name: null
    });
  });
  it('should invalid because required validation on formControl', () => {

    const form = fb.group({
      requiredField: ['', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(10)]
      }], ...myModel
    });
    service.validityForm(form)
    expect(form.valid).toBeFalsy();
  });
  it('should invalid because minLength validation on formControl', () => {

    const form = fb.group({
      requiredField: ['Hola', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(10)]
      }], ...myModel
    });
    service.validityForm(form)
    expect(form.valid).toBeFalsy();
  });
  it('should invalid because maxLength validation on formControl', () => {

    const form = fb.group({
      requiredField: ['Hola Mundo !', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(10)]
      }], ...myModel
    });
    service.validityForm(form)
    expect(form.valid).toBeFalsy();
  });
  it('should valid from', () => {

    const form = fb.group({
      requiredField: ['Hola Mundo', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(10)]
      }], ...myModel
    });
    service.validityForm(form)
    expect(form.valid).toBeTruthy();
  });

  it('should invalid nasty from when submit', () => {
    const formControl = fb.control('', [Validators.required]);
    const formGroup = fb.group({
      requiredField: ['Hola Mundo', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
      }]
    });
    const formArray = fb.array([formControl, formGroup], [Validators.required]);

    const form = fb.group({
      requiredField: ['Hola Mundo', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
      }],
      requiredArray: fb.array([formControl, formGroup], [Validators.required]),
      requiredGroup: fb.group({
        requiredField: ['', {
          validators: [Validators.required, Validators.minLength(5), Validators.maxLength(10)]
        }]
      }), ...myModel
    });
    service.validateAllFormFields(form);
    expect(form.valid).toBeFalsy();
    service.validateAllFormFields(formControl);
    expect(formControl.valid).toBeFalsy();
    service.validateAllFormFields(formArray);
    expect(formArray.valid).toBeFalsy();
  });
  it('should valid nasty from when submit', () => {

    const form = fb.group({
      requiredField: ['Hola Mundo', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(10)]
      }],
      requiredGroup: fb.group({
        requiredField: ['Truthy', {
          validators: [Validators.required, Validators.minLength(5), Validators.maxLength(10)]
        }]
      }), ...myModel
    });
    service.validateAllFormFields(form)
    expect(form.valid).toBeTruthy();
  });
  it('should get keys of error', () => {
    const form = fb.group({
      requiredField: ['', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(10)]
      }],
      ...myModel
    });
    let data = service.getKeys(form.controls['requiredField'].errors);
    console.log(data);
    expect(data).toEqual(['required']);
    form.controls['requiredField'].setValue('hola');
    data = service.getKeys(form.controls['requiredField'].errors);
    console.log(data);
    expect(data).toEqual(['minlength']);
    form.controls['requiredField'].setValue('hola222222222');
    data = service.getKeys(form.controls['requiredField'].errors);
    console.log(data);
    expect(data).toEqual(['maxlength']);
  });

  it('should validate idValidator an get message error', () => {
    const form = fb.group({
      requiredField: [''],
      ...myModel
    });
    service.idValidator(form.controls.requiredField)
    let errors = form.controls['requiredField'].errors
    expect(errors).toEqual({ "idSelectRequired": true });
    let msg = service.getMsgError(form.controls['requiredField'])
    expect(msg).toContain("Id no valido!.");
  });
  it('should validate idValidator and do not get error', () => {
    const form = fb.group({
      requiredField: ['222'],
      ...myModel
    });
    service.idValidator(form.controls.requiredField)
    let errors = form.controls['requiredField'].errors
    expect(errors).toEqual(null);
  });

  it('should validate dateValidator and get message error', () => {
    const form = fb.group({
      requiredField: ['2023-02-24'],
      ...myModel
    });
    //test year
    service.dateValidator(form.controls.requiredField)
    let errors = form.controls['requiredField'].errors
    expect(errors).toEqual({ "validateDateRequired": true });
    //test month 
    form.controls['requiredField'].setValue('2024-01-24')
    service.dateValidator(form.controls.requiredField)
    errors = form.controls['requiredField'].errors
    expect(errors).toEqual({ "validateDateRequired": true });
    //test day
    form.controls['requiredField'].setValue('2024-02-24')
    service.dateValidator(form.controls.requiredField)
    errors = form.controls['requiredField'].errors
    expect(errors).toEqual({ "validateDateRequired": true });
    //get message error
    let msg = service.getMsgError(form.controls['requiredField'])
    expect(msg).toContain("La fecha no puede ser menor a la actual!");
  });
  it('should validate dateValidator and do not get error', () => {

    const form = fb.group({
      requiredField: ['2024-04-24'],
      ...myModel
    });
    service.dateValidator(form.controls.requiredField)
    let errors = form.controls['requiredField'].errors
    expect(errors).toEqual(null);
  });
});
