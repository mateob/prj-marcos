import { PosicaoX } from '../../enum/posicao-x.enum';
import { PosicaoY } from '../../enum/posicao-y.enum';
import { Slot } from '../../types/quem.type';
import { Cadeirinha } from './cadeirinha';
import { ObjetoSlot } from './objeto-slot';
import { Passageiro } from './passageiro';

export class Banco extends ObjetoSlot {
	private _tipo: 'T' | 'C';

	constructor(posicaoX: PosicaoX, posicaoY: PosicaoY, tipo: 'T' | 'C' = 'C') {
		super(posicaoX, posicaoY, 'Banco');
		this._tipo = tipo;
	}

	public set slot(slot: Slot) {
		if (slot instanceof Passageiro) {
			console.log(this.obterPosicao, 'esta ocupado por', slot.nome);
		} else if (slot instanceof Cadeirinha){
			console.log(this.obterPosicao, 'foi instalado', slot.tipo);
		} else {
			console.log('Banco', this.obterPosicao, 'já esta vazio!');
		}
		this._slot = slot;
	}

	public get slot(): Slot {
		return this._slot;
	}
}
