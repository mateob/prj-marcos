import { Pedal } from './pedal';

export class Freio extends Pedal {
	public acao(): void {
		console.log('freio acionado...');
	}
}
