import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginViewComponent } from './login-view.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from '../../../shared/apis/user.service';

describe('LoginViewComponent', () => {
  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginViewComponent],
      providers: [provideHttpClientTesting(),
        UserService
      ]
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
