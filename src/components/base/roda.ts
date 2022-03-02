import { PosicaoXText, PosicaoX } from '../../enum/posicao-x.enum';
import { PosicaoY, PosicaoYText } from '../../enum/posicao-y.enum';
import { BaseObject } from './baseObjec';

export class Roda extends BaseObject {
	protected msgQuebrou(): string {
		return `${this.obterPosicao} furado ou explodiu!`;
	}
	protected msgDanificado(): string {
		return `${this.obterPosicao} Vamos desviar dos burados, me resta: Resistencia ${this
			.resistencia} - Durabilidade: ${this.durabilidade}`;
	}

	private _emUso: boolean = false;

	public instalar(): void {
		this._emUso = true;
	}

	public get emUso(): boolean {
		return this._emUso;
	}

	public remover(): void {
		this._emUso = false;
	}

	constructor(posicaoX: PosicaoX, posicaoY: PosicaoY) {
		super(posicaoX, posicaoY, 'Pneu');
		this.resistencia = 40;
		this.durabilidade = 60;
	}

	public get obterPosicao(): string {
		return `${this._nomeEntidade} ${PosicaoXText[this._posicaoX]} ${PosicaoYText[this._posicaoY]}`;
	}
}
