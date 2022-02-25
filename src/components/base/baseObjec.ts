import { PosicaoX } from '../../enum/posicao-x.enum';
import { PosicaoY } from '../../enum/posicao-y.enum';
import { PronomeQuemEnum, QuemEnum, QuemSouEnum } from '../../enum/quem.enum';
import { CustomError } from '../../types/erro-carro';
import { QuemUtils } from '../../utils/quem.utils';

export abstract class BaseObject {
	protected _posicaoX: PosicaoX;
	protected _posicaoY: PosicaoY;
	protected _nomeEntidade: string;
	// TODO: Marcos - alterar esta propriedade para privado e corrigir nas demais classes.
	protected _resistencia: number = 1;
	protected _durabilidade: number = 1;
	// TODO: Marcos - Criar propriedade para manter o valor original da resistencia

	// TODO: Marcos - realizar as mesmas alterações da propriedade Resistencia para Durabilidade.
	protected set resistencia(rest: number) {
		this._resistencia = rest;

		// TODO: Marcos - informar o valor de rest para a nova propriedade.
	}

	constructor(posicaoX: PosicaoX, posicaoY: PosicaoY, nome: string) {
		this._posicaoX = posicaoX;
		this._posicaoY = posicaoY;
		this._nomeEntidade = nome;
	}

	public set receberDano(dano: number) {
		// dano = 20
		// resistencia = 18
		// dano - resistencia = 2
		// durabilidade = 10

		if (dano > this._resistencia) {
			this._resistencia = 0;
			if (dano - this._resistencia > this._durabilidade) {
				this._durabilidade = 0;
			} else {
				this._durabilidade -= dano;
			}
		} else {
			this._resistencia -= dano;
			console.log(this.msgResistindo());
		}

		if (this._durabilidade === 0) {
			throw new CustomError(this.msgQuebrou(), this._nomeEntidade, { pX: this._posicaoX });
			// console.log(this.msgQuebrou());
		} else if (this._resistencia === 0) {
			console.log(this.msgDanificado());
		}
	}

	protected msgQuebrou(): string {
		return `${this.obterPosicao} Quebrei`;
	}
	protected msgDanificado(): string {
		return `${this.obterPosicao} Estou danificado`;
	}

	protected msgResistindo(): string {
		return `${this.obterPosicao} Estou resistindo`;
	}

	public get obterPosicao() {
		const quem = QuemUtils.qualPosicao(this._posicaoX, this._posicaoY) as QuemEnum;
		return `${this._nomeEntidade} ${PronomeQuemEnum[quem]} ${QuemSouEnum[quem]}`;
	}

	public get pX() {
		return this._posicaoX;
	}

	public get pY() {
		return this._posicaoY;
	}
}
