import { ObjetoSlot } from './objeto-slot';
import { Passageiro } from './passageiro';

export class Cadeirinha extends ObjetoSlot {
	// TODO: Retirar a Cadeirinha com Generics
	public set slot(slot: Cadeirinha | Passageiro | undefined) {
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
	public get slot(): Cadeirinha | Passageiro | undefined {
		return this._slot;
	}

	private _tipo: 'B' | 'C' | 'E';

	constructor(posicaoX: string, posicaoY: string, tipo: 'B' | 'C' | 'E') {
		super(posicaoX, posicaoY);
		this._tipo = tipo;
	}
}
