import { PosicaoX } from '../../enum/posicao-x.enum';
import { PosicaoY } from '../../enum/posicao-y.enum';
import { BaseObject } from './baseObjec';

export class Macaneta extends BaseObject {
	constructor(posicaoX: PosicaoX, posicaoY: PosicaoY) {
		super(posicaoX, posicaoY, 'Maçaneta');
	}
}
