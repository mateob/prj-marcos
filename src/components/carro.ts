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
import { Cadeirinha } from './base/cadeirinha';
import { Macaneta } from './base/macaneta';
import { BaseObject } from './base/baseObjec';
import { BebeConforto } from './base/cadeirinhas/bebe-conforto';
import { Cadeira } from './base/cadeirinhas/cadeira';
import { CadeiraElevacao } from './base/cadeirinhas/cadeira-elevacao';

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
		const porta = this.pesquisarEntidade(quem, this._portas) as Porta;
		if (porta) {
			porta.abrir();
		} else {
			console.log('Não tem porta, cade a porta?');
		}
	}

	public fechar(quem: 'M' | 'C' | 'PL' | 'PR'): void {
		const porta = this.pesquisarEntidade(quem, this._portas) as Porta;
		if (porta) {
			porta.fechar();
		} else {
			console.log('Não tem porta, cade a porta?');
		}
	}

	public sentar(quem: 'M' | 'C' | 'PL' | 'PR', nome: string, idade: number): void {
		const passageiro = this.pesquisarEntidade(quem, this._passageiros) as Passageiro;
		if (passageiro) {
			passageiro.sentar(nome, idade);
			const banco = this._bancos.find((b) => b.pX === passageiro.pX && b.pY === passageiro.pY);
			if (banco) {
				banco.slot = passageiro;
			} else {
				console.log('Erro não tem banco!');
			}
		} else {
			console.log('Passageiro não existe, e um Fantasma!!!!');
		}
	}

	public instalarCadeira(quem: 'PL' | 'PR', tipo: 'B' | 'C' | 'E', nome: string, idade: number): void {
		const banco = this.pesquisarEntidade(quem, this._bancos) as Banco;
		if (banco && !banco.slot) {
			banco.slot = this.criarCadeirinha(quem, tipo, nome, idade);
		} else if (banco) {
			console.log('Ei! estou ocupado com ', banco.slot);
		} else {
			console.log('Banco não existe');
		}
	}

	private criarCadeirinha(
		quem: 'PL' | 'PR',
		tipo: 'B' | 'C' | 'E',
		nome: string,
		idade: number
	): Cadeirinha | undefined {
		const { x, y } = this.quemE(quem);
		switch (tipo) {
			case 'B':
				return new BebeConforto(x, y, nome, idade);
			case 'C':
				return new Cadeira(x, y, nome, idade);
			case 'E':
				return new CadeiraElevacao(x, y, nome, idade);
		}
	}

	private pesquisarEntidade(quem: 'M' | 'C' | 'PL' | 'PR', lista: BaseObject[]): BaseObject | undefined {
		// let retorno: Passageiro | undefined = undefined;
		// for (let x = 0; x < this._passageiros.length; x += 1) {
		// 	const passageiro = this._passageiros[x];
		// 	const coordenadas = this.quemE(quem);
		// 	if (passageiro.pX === coordenadas.x && passageiro.pY === coordenadas.y) {
		// 		retorno = passageiro;
		// 	}
		// }

		// return retorno;
		return lista.find((p) => {
			const coordenadas = this.quemE(quem);
			return p.pX === coordenadas.x && p.pY === coordenadas.y;
		});
	}

	private quemE(quem: 'M' | 'C' | 'PL' | 'PR'): { x: string; y: string } {
		switch (quem) {
			case 'M':
				return { x: 'L', y: 'F' };
			case 'PL':
				return { x: 'L', y: 'B' };
			case 'C':
				return { x: 'R', y: 'F' };
			case 'PR':
				return { x: 'R', y: 'B' };
		}
	}

	public levantarse(quem: 'M' | 'C' | 'PL' | 'PR'): void {
		const passageiro = this.pesquisarEntidade(quem, this._passageiros) as Passageiro;
		if (passageiro) {
			passageiro.liberado();
			const banco = this._bancos.find((b) => b.pX === passageiro.pX && b.pY === passageiro.pY);
			if (banco) {
				if (banco.slot) {
					banco.slot = undefined;
				} else {
					console.log('Banco já esta vazio, passageiro sumiu!');
				}
			} else {
				console.log('Erro não tem banco!');
			}
		} else {
			console.log('Passageiro não existe, e um Fantasma!!!!');
		}
	}

	public colocarCinto(quem: 'M' | 'C' | 'PL' | 'PR'): void {
		const cinto = this.pesquisarEntidade(quem, this._cinto) as Cinto;
		if (cinto) {
			cinto.travar();
		} else {
			console.log('Cinto esta estragado ou com mal funcionamento');
		}
	}

	public tirarCinto(quem: 'M' | 'C' | 'PL' | 'PR'): void {
		const cinto = this.pesquisarEntidade(quem, this._cinto) as Cinto;
		if (cinto) {
			cinto.destravar();
		} else {
			console.log('Cinto esta estragado ou com mal funcionamento');
		}
	}

	private _pedais: Pedal[] = [ new Acelerador(), new Freio(), new Embreagem() ];

	private _portas: Porta[] = [ new Porta('L', 'F'), new Porta('L', 'B'), new Porta('R', 'F'), new Porta('R', 'B') ];
	private _bancos: Banco[] = [ new Banco('L', 'F'), new Banco('R', 'F'), new Banco('R', 'B'), new Banco('L', 'B') ];
	private _espelhos: Espelho[] = [ new Espelho('L'), new Espelho('R'), new Espelho('C') ];

	private _cinto: Cinto[] = [
		new Cinto('L', 'F'),
		new Cinto('L', 'B'),
		new Cinto('R', 'F'),
		new Cinto('R', 'B'),
		new Cinto('C', 'B', 2)
	];

	private _cadeirinhas: Cadeirinha[] = [];

	private _macanetas: Macaneta[] = [
		new Macaneta('L', 'F'),
		new Macaneta('L', 'B'),
		new Macaneta('R', 'F'),
		new Macaneta('R', 'B'),
		new Macaneta('C', 'B')
	];

	/** Tarefa para casa - 08/02/2022 */
	// Criar estrutura para cadeirinha (modelos por idade)

	// Criar estrutura para maçaneta
	private _macaneta: number = 5;
	// Adicionar Banco no Meio!

	private _limpavidro: number = 3;
	private _motor: number = 1;
	private _direcao: number = 1;
	private _cambio: number = 1;
	private _parabrisa: number = 2;
	private _buzina: number = 1;

	/** Tarefa para casa - 11/02/2022 */
	// Adicionar a propriedade TIPO a entidade Banco aceitando 'T' | 'C'
	// Adicionar os tres bancos trazeiros ao carro.
	// Verificar se criança tem a ideade correta para o bebe conforto, e implementar metodo para colocar a criança na cadeirinha.
	// Apresentar mensagem de BemVindo somente quando a criança estiver na cadeirinha (slot !== undefined)
}
