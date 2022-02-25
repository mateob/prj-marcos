import { Pedal } from './pedal';

export class Acelerador extends Pedal {
	constructor() {
		super('acelerador');
	}

	public acao(forca: number): number {
		this._valorAplicado = forca;
		this.acionado = forca < 5;
		return this._valorAplicado;
	}
}
