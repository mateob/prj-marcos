import { PosicaoX } from '../../enum/posicao-x.enum';
import { PosicaoY } from '../../enum/posicao-y.enum';
import { CustomError } from '../../types/erro-carro';
import { BaseObject } from './baseObjec';

export class Porta extends BaseObject {
	private aberta: boolean = false;
	private trancada: boolean = false;
	private acionado: boolean = false;

	constructor(posicaoX: PosicaoX, posicaoY: PosicaoY) {
		super(posicaoX, posicaoY, 'Porta');
		this.resistencia = 12;
		this.durabilidade = 80;
	}

	public get portaAberta() {
		return this.aberta;
	}

	public get portaTrancada() {
		return this.trancada;
	}

	public get fuiAcionada() {
		return this.acionado;
	}

	public abrir(forca: number) {
		if (this.aberta) {
			throw new CustomError(`A porta já esta aberta!`, this._nomeEntidade, {
				pX: this._posicaoX,
				pY: this._posicaoY
			});
		}
		this.aberta = true;
		this.receberDano = forca / 2;
		this.acionado = true;
		// console.log(`Estou sendo aberta ${this.obterPosicao}`);
	}

	protected msgDanificado(): string {
		return this.aberta ? 'Fui aberta com Violencia, toma um calmante' : 'Porta foi lacrada, pega mais leve!';
	}

	protected msgResistindo(): string {
		if (this.aberta) {
			throw new CustomError(`${this.obterPosicao} não foi aberta, vai malhar um pouco!`, this._nomeEntidade);
		}
		return super.msgResistindo();
	}

	public fechar() {
		this.aberta = false;
	}

	public trancar() {
		this.trancada = true;
	}

	public desctrancar() {
		this.trancada = false;
	}
}
