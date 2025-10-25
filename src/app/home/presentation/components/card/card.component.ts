import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { StarshipDTO } from '../../../../shared/interfaces/starship.dto';

@Component({
    selector: 'app-card',
    imports: [],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
  starship = input<StarshipDTO>();
  image = input<string>();
  clickImage = output<string>();

  onClickImage(): void {
    const img = this.image()??'';
    this.clickImage.emit(img);
  }
}
