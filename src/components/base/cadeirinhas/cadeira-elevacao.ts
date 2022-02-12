import { Cadeirinha } from '../cadeirinha';

export class CadeiraElevacao extends Cadeirinha {
	constructor(posicaoX: 'L' | 'R' | 'T' | 'C' | string, posicaoY: 'B' | string, nome: string, idade: number) {
		super(posicaoX, posicaoY, 'E');
		if (idade >= 4 && idade <= 7) {
			console.log(`Bem vindo ${nome}! Quase um adulto!`);
		} else {
			console.log('Vai ficar apertado!');
		}
	}
}
