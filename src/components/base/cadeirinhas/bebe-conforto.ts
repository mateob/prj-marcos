import { PosicaoX } from '../../../enum/posicao-x.enum';
import { PosicaoY } from '../../../enum/posicao-y.enum';
import { Cadeirinha } from '../cadeirinha';

export class BebeConforto extends Cadeirinha {
	constructor(posicaoX: PosicaoX, posicaoY: PosicaoY) {
		super(posicaoX, posicaoY, 'B', 'Bebe-Conforto');
	}

	public validarIdade(idade: number): boolean {
		return idade >= 0 && idade <= 1;
	}
}
