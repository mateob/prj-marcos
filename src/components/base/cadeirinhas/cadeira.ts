import { Cadeirinha } from '../cadeirinha';

export class Cadeira extends Cadeirinha {
	constructor(posicaoX: 'L' | 'R' | 'T' | 'C' | string, posicaoY: 'B' | string, nome: string, idade: number) {
		super(posicaoX, posicaoY, 'E');
		if (idade >= 1 && idade <= 4) {
			console.log(`Bem vindo ${nome}!`);
		} else {
			console.log('Vai ficar apertado!');
		}
	}
}
