import { Pedal } from './pedal';

export class Freio extends Pedal {
	constructor() {
		super('freio');
	}

	/**
	 * Força
	 * Resistencia
	 * valorAplicado = vai ser usado para Aceleraçõa - Freio - Ou embreagem.
	 * 
	 */

	// força > 10 = freiada brusca = valor = 100
	// força > 5 < 10 = freiada gradual = 99 ~ 25
	// força < 5 = mal ta freiando = 24 ~ 10
	public acao(forca: number): number {
		this._valorAplicado = forca;
		this.acionado = forca < 5;
		return this._valorAplicado;
	}
}
