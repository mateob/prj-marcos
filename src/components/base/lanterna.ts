import { Farol } from './farol';

export class Lanterna extends Farol {
	constructor(posicao: 'L' | 'R') {
		super(posicao);
	}

	public luzApagada(): void {
		this._intenciadade = 0;
	}
	public luzBaixa(): void {
		this._intenciadade = 1;
	}
	public luzMedia(): void {
		this._intenciadade = 2;
	}
	public luxAlta(): void {
		this._intenciadade = 3;
	}
}
