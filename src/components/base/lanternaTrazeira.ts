import { Farol } from './farol';

export class LanternaTrazeira extends Farol {
	constructor(posicao: 'L' | 'R') {
		super(posicao);
	}

	public initLuzFreio(): void {
		this._cor = 'Vermelha';
	}
	public initLuzRe(): void {
		this._cor = 'Branca';
	}
	public initLuzPisca(): void {
		this._cor = 'Amarela';
		this._pisca = true;
	}
	public endLuzPisca(): void {
		this.estadoInicial();
	}
	public endLuxFreio(): void {
		this.estadoInicial();
	}
	public endLuzRe(): void {
		this.estadoInicial();
	}
}
