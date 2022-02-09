import { BaseObject } from './baseObjec';

export class Espelho extends BaseObject {
	public olhoDePeixe: boolean;

	constructor(posicao: 'L' | 'R' | 'C', olhoDePeixe: boolean = false) {
		super(posicao, '');
		this.olhoDePeixe = olhoDePeixe;
	}
}
