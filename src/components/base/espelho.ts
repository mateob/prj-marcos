import { PosicaoX } from '../../enum/posicao-x.enum';
import { PosicaoY } from '../../enum/posicao-y.enum';
import { BaseObject } from './baseObjec';

export class Espelho extends BaseObject {
	public olhoDePeixe: boolean;

	constructor(posicao: PosicaoX, olhoDePeixe: boolean = false) {
		super(posicao, PosicaoY.F, 'Espelho');
		this.olhoDePeixe = olhoDePeixe;
	}
}
