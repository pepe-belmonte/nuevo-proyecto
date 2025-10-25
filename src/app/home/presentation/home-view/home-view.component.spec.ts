import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewComponent } from './home-view.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthTokenService } from '../../../shared/services/auth-token.service';
import { StarWarsService } from '../../../shared/apis/starwars.service';
import { of } from 'rxjs';
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

    // Mock del comportamiento por defecto
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
});
