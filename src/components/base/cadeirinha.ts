import { PosicaoX } from '../../enum/posicao-x.enum';
import { PosicaoY } from '../../enum/posicao-y.enum';
import { BabyChear, Slot } from '../../types/quem.type';
import { ObjetoSlot } from './objeto-slot';
import { Passageiro } from './passageiro';

export abstract class Cadeirinha extends ObjetoSlot {
	private _passageiro: Passageiro;

	// TODO: Retirar a Cadeirinha com Generics
	public set slot(slot: Slot) {
		if (slot instanceof Cadeirinha) {
			console.log('Não podemos colocar outra cadeira.');
		} else if (slot) {
			console.log('Slot do banco ', this.obterPosicao, ' com ', typeof slot);
		} else {
			console.log('Slot ', this.obterPosicao, ' já esta vazio!');
		}
		this._slot = slot;
	}

	// TODO: Retirar a Cadeirinha com Generics
	public get slot(): Slot {
		return this._slot;
	}

	public get tipo(): string {
		return this._nomeEntidade;
	}

	public abstract validarIdade(idade: number): boolean;

	public colocarCrianca(nome: string, idade: number): void {
		this._passageiro.sentar(nome, idade);
	}

	private _tipo: BabyChear;

	constructor(
		posicaoX: PosicaoX, 
		posicaoY: PosicaoY, 
		tipo: BabyChear = 'E', 
		nome: string = 'Cadeirinha Generica'
		) {
		super(posicaoX, posicaoY, nome);
		this._tipo = tipo;
		this._passageiro = new Passageiro(posicaoX, posicaoY);
		this._slot = this._passageiro;
	}
}
