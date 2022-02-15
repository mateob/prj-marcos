import { PosicaoX } from '../../../enum/posicao-x.enum';
import { PosicaoY } from '../../../enum/posicao-y.enum';
import { Cadeirinha } from '../cadeirinha';

export class CadeiraElevacao extends Cadeirinha {

	constructor(posicaoX: PosicaoX, posicaoY: PosicaoY) {
		super(posicaoX, posicaoY, 'E', 'Acento de Elevação');
	}

	public validarIdade(idade: number): boolean {
		return idade >= 4 && idade <= 7;
	}
}
