import { Pedal } from './pedal';

export class Embreagem extends Pedal {
	public acao(): void {
		console.log('acionada a embreagem...');
	}
}
