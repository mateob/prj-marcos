import { Pedal } from './pedal';

export class Acelerador extends Pedal {
	public acao(): void {
		console.log('acelerando...');
	}
}
