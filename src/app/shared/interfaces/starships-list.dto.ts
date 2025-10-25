import { StarshipDTO } from "./starship.dto";

export interface StarshipsListDTO {
	count: number,
	next: string | null,
	previous: string | null,
	results: StarshipDTO[]
}