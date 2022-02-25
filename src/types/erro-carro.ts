import { PosicaoX } from '../enum/posicao-x.enum';
import { PosicaoY } from '../enum/posicao-y.enum';

export class CustomError extends Error {
	private _posicao: { pX?: PosicaoX; pY?: PosicaoY };
	private _origem: string;
	public name: string = 'CustomError';
	private _message: string;

	constructor(msg: string, origem?: string, posicao?: { pX?: PosicaoX; pY?: PosicaoY }) {
		super(msg);
		Object.setPrototypeOf(this, CustomError.prototype);
		this._posicao = posicao || {};
		this._origem = origem || 'Não se sabe';
		this._message = msg;
		Error.captureStackTrace(this, CustomError);
		Object.defineProperty(this, 'message', {
			get() {
				return this.montarMensagem();
			}
		});
	}

	private montarMensagem(): string {
		return `Erro: 
    Origem: ${this._origem}
    Posição: X ${this._posicao.pX} - Y ${this._posicao.pY}
    Mensagem: ${this._message}
        `;
	}
}
