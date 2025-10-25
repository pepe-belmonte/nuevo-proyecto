import { Injectable } from '@angular/core';

enum FormControlStatus {VALID='VALID' , INVALID='INVALID' , PENDING='PENDING' , DISABLED='DISABLED'};

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  checkStatus(formCtrl: any): boolean {
    let _status = false;
    if (formCtrl && formCtrl.touched) {
      if (formCtrl.status === FormControlStatus.INVALID) {
        _status = true;
      } else if (
        formCtrl.status === FormControlStatus.VALID ) {
        _status = false;
      }
    }
    return _status;
  }

  // mensajes de error estandar
  getErrorMessage(formCtrl: any): string {
    let _message:string = '';
    if (formCtrl.touched) {
      if (formCtrl.status === FormControlStatus.INVALID) {
        // recorre los errores para concatenar
        Object.keys(formCtrl.errors).forEach((err:any) => {
          if (_message! = '') {
            _message = _message.concat('. ');
          }
          switch (err) {
            case 'required':
              _message = _message.concat('Campo obligatorio') ;
              break;
            case 'email':
              _message = _message.concat('Debe ser un email válido') ;
              break;
            default:
              if (typeof formCtrl.errors[err] == 'boolean'){
                _message = _message.concat(err) ;
              } else {
                _message = _message.concat(formCtrl.errors[err]) ;
              }
              break;
          }
        });
      }
    }
    return _message;
  }
  
}
