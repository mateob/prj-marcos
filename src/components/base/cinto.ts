import { PosicaoX } from '../../enum/posicao-x.enum';
import { PosicaoY } from '../../enum/posicao-y.enum';
import { BaseObject } from './baseObjec';

export class Cinto extends BaseObject {
	private _afivelado: boolean = false;
	private _tipo: 2 | 3;

	constructor(posicaoX: PosicaoX, posicaoY: PosicaoY, tipo: 2 | 3 = 3) {
		super(posicaoX, posicaoY, 'Cinto');
		this._tipo = tipo;
	}

	public get seguro() {
		return this._afivelado;
	}

	public travar() {
		this._afivelado = true;
		console.log(`Estou afivelado ${this.obterPosicao} é sou ${this._tipo} pontas`);
	}

	public destravar() {
		this._afivelado = false;
		console.log(`Estou destravado ${this.obterPosicao} é sou ${this._tipo} pontas`);
	}
}
