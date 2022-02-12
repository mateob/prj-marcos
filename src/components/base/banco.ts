import { Cadeirinha } from './cadeirinha';
import { ObjetoSlot } from './objeto-slot';
import { Passageiro } from './passageiro';

export class Banco extends ObjetoSlot {
	constructor(posicaoX: 'L' | 'R' | 'T' | 'C', posicaoY: 'F' | 'B') {
		super(posicaoX, posicaoY);
	}

	public set slot(slot: Cadeirinha | Passageiro | undefined) {
		if (slot) {
			console.log('Slot do banco ', this.obterPosicao, ' com ', typeof slot);
		} else {
			console.log('Slot ', this.obterPosicao, ' já esta vazio!');
		}
		this._slot = slot;
	}

	public get slot(): Cadeirinha | Passageiro | undefined {
		return this._slot;
	}
}
