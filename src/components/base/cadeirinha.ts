import { BaseObject } from './baseObjec';

export class cadeirinha extends BaseObject {
	constructor(posicaoX: 'L' | 'R' | 'T' | 'C', posicaoY: 'F' | 'B') {
		super(posicaoX, posicaoY);
	}
}