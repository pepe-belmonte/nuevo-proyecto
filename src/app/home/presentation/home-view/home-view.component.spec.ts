import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeViewComponent } from './home-view.component';
import { AuthTokenService } from '../../../shared/services/auth-token.service';
import { StarWarsService } from '../../../shared/apis/starwars.service';
import { of, throwError } from 'rxjs';
import { StarshipsListDTO } from '../../../shared/interfaces/starships-list.dto';

describe('HomeViewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;
  // espias para devolver datos ficticios
  let authServiceSpy: jasmine.SpyObj<AuthTokenService>;
  let starWarsServiceSpy: jasmine.SpyObj<StarWarsService>;

  // valores mockeados
  const mockStarshipsResponse: StarshipsListDTO = {
    count: 2,
    next: null,
    previous: null,
    results: [
      {
        name: 'X-wing',
        model: 'T-65 X-wing',
        manufacturer: 'Incom Corporation',
        cost_in_credits: '149999',
        length: '12.5',
        max_atmosphering_speed: '1050',
        crew: '1',
        passengers: '0',
        cargo_capacity: '110',
        consumables: '1 week',
        hyperdrive_rating: '1.0',
        MGLT: '100',
        starship_class: 'Starfighter',
        pilots: [],
        films: [],
        created: '2014-12-12T11:19:05.340000Z',
        edited: '2014-12-20T21:23:49.886000Z',
        url: 'https://swapi.dev/api/starships/12/'
      },
      {
        name: 'TIE Fighter',
        model: 'Twin Ion Engine/Ln Starfighter',
        manufacturer: 'Sienar Fleet Systems',
        cost_in_credits: 'unknown',
        length: '6.4',
        max_atmosphering_speed: '1200',
        crew: '1',
        passengers: '0',
        cargo_capacity: '65',
        consumables: '2 days',
        hyperdrive_rating: 'none',
        MGLT: '100',
        starship_class: 'Starfighter',
        pilots: [],
        films: [],
        created: '2014-12-12T11:19:05.340000Z',
        edited: '2014-12-20T21:23:49.886000Z',
        url: 'https://swapi.dev/api/starships/13/'
      }
    ]
  };  

  beforeEach(async () => {
    // establecemos los métodos que vamos a espiar
    authServiceSpy = jasmine.createSpyObj('AuthTokenService', ['getLogged', 'getToken']);
    starWarsServiceSpy = jasmine.createSpyObj('StarWarsService', ['getStarships']);

    // Mock de los datos que se van a devolver
    authServiceSpy.getLogged.and.returnValue(of(false));
    authServiceSpy.getToken.and.returnValue({ name: 'Test User' });
    starWarsServiceSpy.getStarships.and.returnValue(of(mockStarshipsResponse));

    await TestBed.configureTestingModule({
      imports: [
        HomeViewComponent
      ],
      // providers de los servicios
      providers: [
        { provide: AuthTokenService, useValue: authServiceSpy },
        { provide: StarWarsService, useValue: starWarsServiceSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.isLogged).toBeFalse();
    expect(component.userData).toEqual({});
    expect(component.imageSelected).toBe('');
    expect(component.isLoading()).toBeFalse();
    expect(component.starships).toEqual([]);
  });

  it('should update isLogged and userData when user logs in', () => {
    authServiceSpy.getLogged.and.returnValue(of(true));
    const mockUserData = { name: 'Test User' };
    authServiceSpy.getToken.and.returnValue(mockUserData);

    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isLogged).toBeTrue();
    expect(component.userData).toEqual(mockUserData);
  });

    it('should toggle imageSelected when onImageSelected is called', () => {
    const testImage = 'test-image.jpg';
    
    // Primera llamada - debería establecer la imagen
    component.onImageSelected(testImage);
    expect(component.imageSelected).toBe(testImage);
    
    // Segunda llamada con la misma imagen - debería limpiar la selección
    component.onImageSelected(testImage);
    expect(component.imageSelected).toBe('');
    
  });

  it('should load starships successfully', fakeAsync(() => {
    component.getStarships('');
    expect(component.isLoading()).toBeTrue();

    tick();
    expect(starWarsServiceSpy.getStarships).toHaveBeenCalledWith('');
    
    // Esperamos que se procesen todas las naves (500ms por nave)
    tick(1000);
    
    expect(component.starships.length).toBe(2); // devuelve dos registros
    expect(component.isLoading()).toBeFalse(); // cambiado el switch a false
    expect(component.starships[0].name).toBe('X-wing'); // comprueba el primer registro
    expect(component.starships[1].name).toBe('TIE Fighter'); // comprueba el segundo registro
  }));

  it('should handle error when loading starships fails', fakeAsync(() => {
    const errorMessage = 'Error loading starships';
    // devuelve error al recuperar los registros
    starWarsServiceSpy.getStarships.and.returnValue(throwError(() => new Error(errorMessage)));
    
    spyOn(console, 'error'); // comprobamos que en consola aparece el error
    component.getStarships('');
    
    expect(component.isLoading()).toBeTrue(); // cambiado el switch a true
    tick(); // espera
    
    expect(component.isLoading()).toBeFalse(); // cambiado el switch a false
    expect(console.error).toHaveBeenCalled();
    expect(component.starships.length).toBe(0); // no devuelve registros
  }));
});
