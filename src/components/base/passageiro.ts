import { BaseObject } from './baseObjec';

export class Passageiro extends BaseObject {
	private _ocupado: boolean;
	private _nome: string;
	private _idade: number;

	constructor(
		posicaoX: 'L' | 'R' | 'C',
		posicaoY: 'F' | 'B',
		nome: string = 'Acento vazio',
		ocupado: boolean = false
	) {
		super(posicaoX, posicaoY);
		this._ocupado = ocupado;
		this._nome = nome;
		this._idade = 0;
	}

	public get acentoOcupado() {
		return this._ocupado;
	}

	public liberado(): void {
		this._ocupado = false;
		console.log(`${this._nome} saiu de ${this.obterPosicao} - Idade ${this._idade}`);
	}

	public sentar(nome: string, idade: number): void {
		this._ocupado = true;
		this._nome = nome;
		this._idade = idade;
		console.log(`${this._nome} sentou em ${this.obterPosicao} - Idade ${this._idade}`);
	}
}
