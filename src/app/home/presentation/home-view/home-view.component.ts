import { Component, effect, signal } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { AuthTokenService } from '../../../shared/services/auth-token.service';
import { StarWarsService } from '../../../shared/apis/starwars.service';
import { StarshipsListDTO } from '../../../shared/interfaces/starships-list.dto';
import { StarshipDTO } from '../../../shared/interfaces/starship.dto';

@Component({
  selector: 'app-home-view',
  imports: [CardComponent],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss',
})
export class HomeViewComponent {
  isLogged: boolean = false;
  userData: any = {};
  isImageSelected = signal(false);
  imageSelected = signal('');
  isLoading = signal(false);
  starships: StarshipDTO[] = [];

  constructor(private auth: AuthTokenService, private apiSW: StarWarsService) {
    // observable para comprobar si hay cambios en el login
    this.auth.getLogged().subscribe((res: boolean) => {
      this.isLogged = res;
      if (this.isLogged) {
        this.userData = this.auth.getToken();
        console.log(this.userData);
      }
    });

    this.getStarships(''); // carga inicial

    // efect para cambiar el estado 
    effect(() => {
      this.isImageSelected.set(false);
      if (this.imageSelected() !== '' ) {
        this.isImageSelected.set(true);
      }
    });    
  }

  onImageSelected($event: string) {
    if (this.imageSelected() === $event ) {
      this.imageSelected.update(val => '');
    }else {
      this.imageSelected.update(val => $event);
    }
  }

  getStarships(params: string) {
    this.isLoading.set(true);
    this.apiSW.getStarships(params).subscribe({
      next: (res: StarshipsListDTO) => {
        this.starships = [];
        this.isLoading.set(false);
        res.results.forEach((starship, index) => {
          setTimeout(() => {
            this.starships.push(starship);
          }, index * 500);
        });
      },
      error: (err: any) => {
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }
}
