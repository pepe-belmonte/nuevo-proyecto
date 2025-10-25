import { NgClass} from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { LoginInterface } from '../../../shared/models/login.model';
import { UserService } from '../../../shared/apis/user.service';
import { LoginUserDTO } from '../../../shared/interfaces/login-user.dto';
import { RegisterInterface } from '../../../shared/models/register.model';
import { RegisterUserDTO } from '../../../shared/interfaces/register-user.dto';
import { AuthTokenService } from '../../../shared/services/auth-token.service';

@Component({
    selector: 'app-login-view',
    imports: [
        NgClass,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './login-view.component.html',
    styleUrl: './login-view.component.scss'
})
export class LoginViewComponent {

  formLogin: FormGroup;
  formRegister: FormGroup;
  isLoading = signal(false);
  isShakeForm: boolean = false; // hay que sacudir el formulario?
  isHideLoginPassword: boolean = true;
  isHidePassword: boolean = true;
  isHideRepassword: boolean = true;
  isShowPyro: boolean = false;
  isShowLogin: boolean = true;
  isShowRegister: boolean = false;
  isLoginDone: boolean= false;
  isRegisterDone: boolean= false;

  constructor(
    public formUtils: FormUtilsService,
    private apiUser: UserService,
    private auth: AuthTokenService
  ) {
    this.formLogin = new FormGroup({
      username: new FormControl<string>('pepe',[Validators.required]),
      password: new FormControl<string>('pepe',[Validators.required])
    })
    this.formRegister = new FormGroup({
      username: new FormControl<string>('',[Validators.required]),
      email: new FormControl<string>('',[Validators.required]),
      name: new FormControl<string>('',[Validators.required]),
      surname: new FormControl<string>(''),
      password: new FormControl<string>('',[Validators.required]),
      repassword: new FormControl<string>('',[Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.formLogin.markAllAsTouched();
    this.formLogin.updateValueAndValidity();
    if (this.formLogin.valid) {
      const loginData: LoginInterface= {
        username : this.formLogin.get('username')?.value,
        password : this.formLogin.get('password')?.value
      }
      this.getLoginUser(loginData);

    }else {
      console.log ('formulario con errores');
      this.shakeForm();
    }
  }

  onRegister() {
    this.formRegister.markAllAsTouched();
    this.formRegister.updateValueAndValidity();
    if ( this.formRegister.get('password')?.value != this.formRegister.get('repassword')?.value) {
      this.formRegister.get('password')?.setErrors({
        loginError: 'Las contraseñas deben ser iguales'
      })
    }

    if (this.formRegister.valid) {
      const registerData: RegisterInterface= {
        username : this.formRegister.get('username')?.value,
        email : this.formRegister.get('email')?.value,
        name : this.formRegister.get('name')?.value,
        surname : this.formRegister.get('surname')?.value,
        password : this.formRegister.get('password')?.value
      }
      this.setRegisterUser(registerData);

    }else {
      console.log ('formulario con errores');
      this.shakeForm();
    }
  }

  shakeForm() {
    this.isShakeForm =true; // agita el formulario
    setTimeout(() => {
      this.isShakeForm =false;
    }, 1000);
  }

  showPyro() {
    this.isShowPyro =true; // agita el formulario
    setTimeout(() => {
      this.isShowPyro =false;
    }, 30000);
  }

  getLoginUser(loginData: LoginInterface) {
    this.isLoading.set(true);
    this.apiUser.userLogin(loginData).subscribe({
      next: (res: LoginUserDTO) => {
        this.isLoading.set(false);
        if (res.token) {
          this.auth.login(res.token);
          this.isLoginDone = true;
          setTimeout(() => {
            this.isLoginDone = false;
            this.auth.goToHome();
          }, 5000);
        }
      },
      error: (err: any) => {
        this.isLoading.set(false);
        console.error(err);
        this.shakeForm();
        if (err.status == 401) {
          this.formLogin.get('password')?.setErrors({
            loginError: err?.error.message
          })
        }else {
          console.log ('Error no controlado');
          if (err?.error.message ) {
            this.formLogin.get('password')?.setErrors({
              loginError: err?.error.message
            })
          }else {
            this.formLogin.get('password')?.setErrors({
              loginError: err?.message
            })
          }
        }
      }
    })

  }

  setRegisterUser(registerData: RegisterInterface) {
    this.isLoading.set(true);
    this.apiUser.userCreate(registerData).subscribe({
      next: (res: RegisterUserDTO) => {
        this.isLoading.set(false);
        this.isRegisterDone=true;
        this.formRegister.reset();
        this.showPyro();
        setTimeout(() => {
          this.isRegisterDone=false;
          this.isShowLogin=true;
          this.isShowRegister=false;
        }, 5000);
      },
      error: (err: any) => {
        this.isLoading.set(false);
        console.error(err);
        this.shakeForm();
        if (err.status == 401) {
          this.formRegister.get('repassword')?.setErrors({
            loginError: err?.error.message
          })
        }else {
          console.log ('Error no controlado');
          if (err?.error.message ) {
            if (typeof err.error.message == 'string') {
              this.formRegister.get('repassword')?.setErrors({
                loginError: err?.error.message
              })
            }else {
              const isDuplicate = err?.error.message?.errorInfo.findIndex((message: any) => {
                return typeof message == 'string' && message.startsWith('Duplicate');});
              if (isDuplicate != -1) {
                this.formRegister.get('username')?.setErrors({
                  loginError: 'Nombre de usuario ya existe'
                })  
              }
            }
          }else {
            this.formRegister.get('repassword')?.setErrors({
              loginError: err?.message
            })
          }
        }
      }
    })

  }
}
