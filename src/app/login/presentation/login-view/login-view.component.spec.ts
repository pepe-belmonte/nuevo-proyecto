import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginViewComponent } from './login-view.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from '../../../shared/apis/user.service';
import { AuthTokenService } from '../../../shared/services/auth-token.service';
import { of } from 'rxjs';

describe('LoginViewComponent', () => {
  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;
  //espias para devolver datos ficticios
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let authServiceSpy: jasmine.SpyObj<AuthTokenService>;

  beforeEach(async () => {
    //metodos que se van a espiar
    userServiceSpy = jasmine.createSpyObj('UserService', ['userLogin', 'userCreate']);
    authServiceSpy = jasmine.createSpyObj('AuthTokenService', ['login', 'goToHome']);    

    // mock de los datos que se van a devolver
    userServiceSpy.userLogin.and.returnValue(of({ username: '', email: '', name: '', surname: '', token: '' }));
    userServiceSpy.userCreate.and.returnValue(of({ username: 'newuser', email: 'a@b.com', name: 'Name', surname: 'Surname', password: 'pass' }));

    await TestBed.configureTestingModule({
      imports: [LoginViewComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthTokenService, useValue: authServiceSpy }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
