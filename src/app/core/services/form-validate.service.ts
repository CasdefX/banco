import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
@Injectable({
    providedIn: 'root'
})
export class FormValidateService {

    constructor() { }

    resetForm(form: any) {
        form.reset();
        Object.keys(form.controls).forEach(
            field => {
                const control = form.get(field);
                if (control instanceof FormControl) {
                    form.get(field).setErrors(null);
                } else if (control instanceof FormGroup) {
                    this.resetForm(control);
                }

            }
        );

    }
    validityForm(form: any) {
        Object.keys(form.controls).forEach(
            field => {
                form.get(field).updateValueAndValidity();
            }
        );
    }
    //permite tener el submit button activo y al hacer click verifica todos los campos requeridos
    validateAllFormFields(form: any) {
        if (form instanceof FormControl) {
            form.markAsTouched({ onlySelf: true });
        } else if (form instanceof FormGroup) {
            Object.keys(form.controls).forEach(field => {
                const control = form.get(field);
                if (control instanceof FormControl) {
                    control.markAsTouched({ onlySelf: true });
                } else if (control instanceof FormGroup) {
                    this.validateAllFormFields(control);
                } else if (control instanceof FormArray) {
                    Object.keys(control.controls).forEach(field => {
                        const aControl = control.get(field);
                        if (aControl instanceof FormControl) {
                            aControl.markAsTouched({ onlySelf: true });
                        } else if (aControl instanceof FormGroup) {
                            this.validateAllFormFields(aControl);
                        }
                    })
                }
            });
        } else if (form instanceof FormArray) {
            Object.keys(form.controls).forEach(field => {
                const control = form.get(field);
                if (control instanceof FormControl) {
                    control.markAsTouched({ onlySelf: true });
                } else if (control instanceof FormGroup) {
                    this.validateAllFormFields(control);
                }
            })
        }

    }
    //mostramos el error según las Validaciones de los formControl
    getMsgError(control: any) {
        const errors: any = {
            required: `Este campo es requerido!`,
            remote: `Por favor, corrija este campo.`,
            idSelectRequired: `Id no valido!.`,
            idDuplicate: 'El id ya existe en los registros! ',
            validateDateRequired: `La fecha no puede ser menor a la actual!.`,
            email: `Ingrese una dirección de email electrónico válida.`,
            url: `Ingrese una URL válida.`,
            date: `Ingrese una date válida.`,
            dateISO: `Ingrese un Fecha válida (ISO).`,
            number: `Introduzca un número válido.`,
            digits: `Ingrese sólo dígitos.`,
            creditcard: `Ingrese un número de tarjeta de crédito válido.`,
            equalTo: `Ingrese el mismo valor de nuevo.`,
            maxlength: `Por favor no entre más que ${control?.errors?.maxlength?.requiredLength || ''} caracteres`,
            minlength: `Por favor entre al menos ${control?.errors?.minlength?.requiredLength || ''} en caracteres`,
            rangelength: `Por favor entre en un valor entre ${control?.errors?.rangelength?.minlength || ''} y ${control?.errors?.rangelength?.maxlength || ''} caracteres mucho tiempo`,
            range: `Por favor entre en un valor entre ${control?.errors?.range?.rangeMin || ''} y ${control?.errors?.range?.rangeMax || ''}`,
            max: `Por favor entre en un valor menos que o igual a ${control?.errors?.max?.max || ''}`,
            min: `Por favor entre en un valor mayor que o igual a ${control?.errors?.min?.min || ''}`,
            gt: `Debe ser mayor que ${control?.errors?.gt?.gt || ''}`,
            gte: `Debe ser mayor o igual que ${control?.errors?.gte?.gte || ''}`,
            ngxUniqueCheck: 'El valor de entrada ya existe, vuelva a ingresar',
            repeat: 'Entrada inconsistente dos veces',
            pattern: 'El formato de entrada de la opción es incorrecto',
            imageRequired: 'Solo archivos de imagen son permitidos.',
            pdfRequired: 'Solo archivos de pdf son permitidos.',
            notObject: 'Seleccione una opción válida',
        }
        if (control.errors) {
            const keys: any = this.getKeys(control.errors)
            return errors[keys[0]]
        }
    }
    getKeys(setting: any) {
        return Object.keys(setting);
    }
    //validación para el campo id
    idValidator(control: FormControl) {
        const error: ValidationErrors = { idSelectRequired: true };
        try {
            if (!control.value) throw new Error()
        } catch (e) {
            control.setErrors(error);
            return error;
        }
        control.setErrors(null);
        return null;
    }
    //validación para el campo id
    dateValidator(control: FormControl) {
        const error: ValidationErrors = { validateDateRequired: true };
        try {
            let now = new Date()
            let date = control.value.split("-");
            let month = now.getMonth() + 1
            if (now.getFullYear() > date[0]) {
                throw new Error()
            }
            if (month > date[1]) {
                throw new Error()
            } else
                if (month >= date[1] && now.getDate() > date[2]) {
                    throw new Error()
                }
        } catch (e) {
            control.setErrors(error);
            return error;
        }
        control.setErrors(null);
        return null;
    }
}
