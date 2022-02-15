import { PosicaoX } from "../../enum/posicao-x.enum";
import { PosicaoY } from "../../enum/posicao-y.enum";
import { PronomeQuemEnum, QuemEnum, QuemSouEnum } from "../../enum/quem.enum";
import { QuemUtils } from "../../utils/quem.utils";

export abstract class BaseObject {
	private _posicaoX: PosicaoX;
	private _posicaoY: PosicaoY;
	protected _nomeEntidade: string;

	constructor(posicaoX: PosicaoX, posicaoY: PosicaoY, nome: string) {
		this._posicaoX = posicaoX;
		this._posicaoY = posicaoY;
		this._nomeEntidade = nome;
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
