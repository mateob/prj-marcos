export abstract class Farol {
	protected _intenciadade: number;
	protected _cor: string;
	protected _pisca: boolean;
	protected _posicao: 'L' | 'R';

	constructor(posicao: 'L' | 'R' = 'L', intencidade: number = 1, cor: string = 'Branca', pisca: boolean = false) {
		this._intenciadade = intencidade;
		this._cor = cor;
		this._pisca = pisca;
		this._posicao = posicao;
	}

	public get intencidade(): number {
		return this._intenciadade;
	}
	public get cor(): string {
		return this._cor;
	}
	public get pisca(): boolean {
		return this._pisca;
	}
	public get posicao(): 'L' | 'R' {
		return this._posicao;
	}

	protected estadoInicial() {
		this._cor = '';
		this._pisca = false;
		this._intenciadade = 1;
	}
}
