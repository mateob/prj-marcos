import { Acelerador } from './base/acelerador';
import { Banco } from './base/banco';
import { Cinto } from './base/cinto';
import { Embreagem } from './base/embreagem';
import { Espelho } from './base/espelho';
import { Farol } from './base/farol';
import { Freio } from './base/freio';
import { Lanterna } from './base/lanterna';
import { LanternaTrazeira } from './base/lanternaTrazeira';
import { Passageiro } from './base/passageiro';
import { Pedal } from './base/pedal';
import { Porta } from './base/porta';

export class Carro {
	// Quando a Class e instanciada "Primeria coisa a ser feita antes de qualquer outra"
	constructor() {
		console.log('Chamou o construtor');
	}

	private _passageiros: Passageiro[] = [
		new Passageiro('L', 'F'),
		new Passageiro('L', 'B'),
		new Passageiro('R', 'F'),
		new Passageiro('R', 'B'),
		new Passageiro('C', 'B')
	];

	private _rodas: number = 4;
	public get rodas(): number {
		return this._rodas;
	}
	public readonly chassi: number = 1;

	private _farol: Farol[] = [
		new Lanterna('L'),
		new Lanterna('R'),
		new LanternaTrazeira('L'),
		new LanternaTrazeira('R')
	];

	public ligar(): void {
		this._farol.map((f) => {
			if (f instanceof Lanterna) {
				f.luzBaixa();
				console.log(`Farol: ${f.posicao} - Intenciade ${f.intencidade} - Cor ${f.cor}`);
			}
			return f;
		});
		this._pedais.forEach((p) => {
			if (!(p instanceof Acelerador)) {
				p.acao();
			}
		});
		this._cinto.forEach((c) => {
			const porta = this._portas.find((p) => p.pX === c.pX && p.pY === c.pY);
			if (porta && porta.fuiAcionada) {
				// espera que o falor de seguro = false
				if (this._passageiros.some((p) => p.pX === c.pX && p.pY === c.pY && p.acentoOcupado) && !c.seguro) {
					console.log(`Errou! Multa sendo aplicada ${c.obterPosicao}`);
				}
			}
		});
		this._portas.forEach((p) => {
			if (p.portaAberta) {
				console.log(`Erro! A porta esta aberta ${p.obterPosicao}`);
			}
		});
	}

	public re(): void {
		this._farol.map((f) => {
			if (f instanceof LanternaTrazeira) {
				f.initLuzRe();
				console.log(`Farol: ${f.posicao} - Intenciade ${f.intencidade} - Cor ${f.cor}`);
			}
			return f;
		});
	}

	public freio(): void {
		this._farol.map((f) => {
			if (f instanceof LanternaTrazeira) {
				f.initLuzFreio();
				console.log(`Farol: ${f.posicao} - Intenciade ${f.intencidade} - Cor ${f.cor}`);
			}
			return f;
		});
		this._pedais.forEach((p) => {
			if (p instanceof Freio) {
				p.acao();
			}
		});
	}

	public abrir(quem: 'M' | 'C' | 'PL' | 'PR'): void {
		this._portas.map((p) => {
			if (quem === 'M' && p.pX === 'L' && p.pY === 'F') {
				p.abrir();
			}
			if (quem === 'PL' && p.pX === 'L' && p.pY === 'B') {
				p.abrir();
			}
			if (quem === 'C' && p.pX === 'R' && p.pY === 'F') {
				p.abrir();
			}
			if (quem === 'PR' && p.pX === 'R' && p.pY === 'B') {
				p.abrir();
			}
		});
	}

	public fechar(quem: 'M' | 'C' | 'PL' | 'PR'): void {
		this._portas.map((p) => {
			if (quem === 'M' && p.pX === 'L' && p.pY === 'F') {
				p.fechar();
			}
			if (quem === 'PL' && p.pX === 'L' && p.pY === 'B') {
				p.fechar();
			}
			if (quem === 'C' && p.pX === 'R' && p.pY === 'F') {
				p.fechar();
			}
			if (quem === 'PR' && p.pX === 'R' && p.pY === 'B') {
				p.fechar();
			}
		});
	}

	public sentar(quem: 'M' | 'C' | 'PL' | 'PR', nome: string, idade: number): void {
		this._passageiros.map((p) => {
			if (quem === 'M' && p.pX === 'L' && p.pY === 'F') {
				p.sentar(nome, idade);
			}
			if (quem === 'PL' && p.pX === 'L' && p.pY === 'B') {
				p.sentar(nome, idade);
			}
			if (quem === 'C' && p.pX === 'R' && p.pY === 'F') {
				p.sentar(nome, idade);
			}
			if (quem === 'PR' && p.pX === 'R' && p.pY === 'B') {
				p.sentar(nome, idade);
			}
		});
	}

	public levantarse(quem: 'M' | 'C' | 'PL' | 'PR'): void {
		this._passageiros.map((p) => {
			if (quem === 'M' && p.pX === 'L' && p.pY === 'F') {
				p.liberado();
			}
			if (quem === 'PL' && p.pX === 'L' && p.pY === 'B') {
				p.liberado();
			}
			if (quem === 'C' && p.pX === 'R' && p.pY === 'F') {
				p.liberado();
			}
			if (quem === 'PR' && p.pX === 'R' && p.pY === 'B') {
				p.liberado();
			}
		});
	}

	public colocarCinto(quem: 'M' | 'C' | 'PL' | 'PR'): void {
		this._cinto.map((c) => {
			if (quem === 'M' && c.pX === 'L' && c.pY === 'F') {
				c.travar();
			}
			if (quem === 'PL' && c.pX === 'L' && c.pY === 'B') {
				c.travar();
			}
			if (quem === 'C' && c.pX === 'R' && c.pY === 'F') {
				c.travar();
			}
			if (quem === 'PR' && c.pX === 'R' && c.pY === 'B') {
				c.travar();
			}
		});
	}
	public tirarCinto(quem: 'M' | 'C' | 'PL' | 'PR'): void {
		this._cinto.map((c) => {
			if (quem === 'M' && c.pX === 'L' && c.pY === 'F') {
				c.destravar();
			}
			if (quem === 'PL' && c.pX === 'L' && c.pY === 'B') {
				c.destravar();
			}
			if (quem === 'C' && c.pX === 'R' && c.pY === 'F') {
				c.destravar();
			}
			if (quem === 'PR' && c.pX === 'R' && c.pY === 'B') {
				c.destravar();
			}
		});
	}

	private _pedais: Pedal[] = [ new Acelerador(), new Freio(), new Embreagem() ];

	// Crair estrutura de Espelhos da mesma foram que foi feito os Farois.
	// OBS: Considerar portas em L|R é F|B (Front e Back)
	private _portas: Porta[] = [ new Porta('L', 'F'), new Porta('L', 'B'), new Porta('R', 'F'), new Porta('R', 'B') ];
	// Crair estrutura de Espelhos da mesma foram que foi feito os Farois.
	// OBS: Pensar nas variações de Bancos.
	private _bancos: Banco[] = [ new Banco('L', 'F'), new Banco('R', 'F'), new Banco('T', 'B') ];
	// Crair estrutura de Espelhos da mesma foram que foi feito os Farois.
	// OBS: lembrar do retrovisor não tem L|R
	private _espelhos: Espelho[] = [ new Espelho('L'), new Espelho('R'), new Espelho('C') ];

	private _cinto: Cinto[] = [
		new Cinto('L', 'F'),
		new Cinto('L', 'B'),
		new Cinto('R', 'F'),
		new Cinto('R', 'B'),
		new Cinto('C', 'B', 2)
	];

	/** Tarefa para casa - 08/02/2022 */
	// Criar estrutura para cadeirinha (modelos por idade)
	private _cadeirinha: number = 3;
	// Criar estrutura para maçaneta
	private _macaneta: number = 5;
	// Adicionar Banco no Meio!

	private _limpavidro: number = 3;
	private _motor: number = 1;
	private _direcao: number = 1;
	private _cambio: number = 1;
	private _parabrisa: number = 2;
	private _busina: number = 1;
}
