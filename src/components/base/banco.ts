import { BaseObject } from './baseObjec';

export class Banco extends BaseObject {
	constructor(posicaoX: 'L' | 'R' | 'T', posicaoY: 'F' | 'B') {
		super(posicaoX, posicaoY);
	}
}
