export abstract class BaseObject {
	private _posicaoX: string;
	private _posicaoY: string;

	constructor(posicaoX: string, posicaoY: string) {
		this._posicaoX = posicaoX;
		this._posicaoY = posicaoY;
	}

	public get obterPosicao() {
		return `Minha posição é ${this._posicaoX} - ${this._posicaoY}`;
	}

	public get pX() {
		return this._posicaoX;
	}

	public get pY() {
		return this._posicaoY;
	}
}
