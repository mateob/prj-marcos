import { BaseObject } from './baseObjec';

export class Macaneta extends BaseObject {
	constructor(posicaoX: 'L' | 'R' | 'C', posicaoY: 'F' | 'B') {
		super(posicaoX, posicaoY);
	}
}
