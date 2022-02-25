import { Pedal } from './pedal';

export class Embreagem extends Pedal {
	constructor() {
		super('embreagem');
	}

	public acao(forca: number): number {
		if (forca >= 6) {
			this._valorAplicado = forca;
			this.acionado = true;
		} else {
			console.log(`A ${this._name} esta sofrendo`);
			this._valorAplicado = 0;
			this.acionado = false;
		}
		return this._valorAplicado;
	}
}
