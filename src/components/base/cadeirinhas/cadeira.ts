import { PosicaoX } from '../../../enum/posicao-x.enum';
import { PosicaoY } from '../../../enum/posicao-y.enum';
import { Cadeirinha } from '../cadeirinha';

export class Cadeira extends Cadeirinha {
	constructor(posicaoX: PosicaoX, posicaoY: PosicaoY) {
		super(posicaoX, posicaoY, 'C', 'Cadeira');
	}

	public validarIdade(idade: number): boolean {
		return idade >= 1 && idade <= 4;
	}
}
