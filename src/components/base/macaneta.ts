import { BaseObject } from './baseObjec';

export class macaneta extends BaseObject {
	constructor(posicaoX: 'L' | 'R' | 'C' , posicaoY: 'F' | 'B') {
		super(posicaoX, posicaoY);
	}
}