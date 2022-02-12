import { Cadeirinha } from '../cadeirinha';

export class BebeConforto extends Cadeirinha {
	constructor(posicaoX: 'L' | 'R' | 'T' | 'C' | string, posicaoY: 'B' | string, nome: string, idade: number) {
		super(posicaoX, posicaoY, 'B');
		if (idade >= 0 && idade <= 1) {
			console.log(`Bem vindo bebe ${nome}!`);
		} else {
			console.log('Vai ficar apertado!');
		}
	}
}
