import { BaseObject } from './baseObjec';

export class Porta extends BaseObject {
	private aberta: boolean = false;
	private trancada: boolean = false;
	private acionado: boolean = false;

	constructor(posicaoX: 'L' | 'R', posicaoY: 'F' | 'B') {
		super(posicaoX, posicaoY);
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

	public abrir() {
		this.aberta = true;
		this.acionado = true;
		console.log(`Estou sendo aberta ${this.obterPosicao}`);
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
