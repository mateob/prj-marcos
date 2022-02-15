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
import { BabyChear, Quem, QuemBack } from '../types/quem.type';
import { QuemUtils } from '../utils/quem.utils';
import { PosicaoX } from '../enum/posicao-x.enum';
import { PosicaoY } from '../enum/posicao-y.enum';

export class Carro {
	// Quando a Class e instanciada "Primeria coisa a ser feita antes de qualquer outra"
	constructor() {
		console.log('Chamou o construtor');
	}

	private _passageiros: Passageiro[] = [
		new Passageiro(PosicaoX.L, PosicaoY.F),
		new Passageiro(PosicaoX.L, PosicaoY.B),
		new Passageiro(PosicaoX.R, PosicaoY.F),
		new Passageiro(PosicaoX.R, PosicaoY.B),
		new Passageiro(PosicaoX.C, PosicaoY.B)
	];

	private _rodas: number = 4;
	public get rodas(): number {
		return this._rodas;
	}
	public readonly chassi: number = 1;

	private _farol: Farol[] = [
		new Lanterna(PosicaoX.L),
		new Lanterna(PosicaoX.R),
		new LanternaTrazeira(PosicaoX.L),
		new LanternaTrazeira(PosicaoX.R)
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

	public abrir(quem: Quem): void {
		const porta = this.pesquisarEntidade(quem, this._portas) as Porta;
		if (porta) {
			porta.abrir();
		} else {
			console.log('Não tem porta, cade a porta?');
		}
	}

	public fechar(quem: Quem): void {
		const porta = this.pesquisarEntidade(quem, this._portas) as Porta;
		if (porta) {
			porta.fechar();
		} else {
			console.log('Não tem porta, cade a porta?');
		}
	}

	public sentar(quem: Quem, nome: string, idade: number): void {
		const passageiro = this.pesquisarEntidade(quem, this._passageiros) as Passageiro;
		if (passageiro) {
			passageiro.sentar(nome, idade);
			const banco = this.pesquisarEntidade(quem, this._bancos) as Banco;
			if (banco) {
				banco.slot = passageiro;
			} else {
				console.log('Erro não tem banco!');
			}
		} else {
			console.log('Passageiro não existe, e um Fantasma!!!!');
		}
	}

	public instalarCadeira(quem: Quem, tipo: PosicaoY.B | PosicaoX.C | 'E'): void {
		const banco = this.pesquisarEntidade(quem, this._bancos) as Banco;
		if (banco && !banco.slot) {
			banco.slot = this.criarCadeirinha(quem, tipo);
		} else if (banco) {
			console.log('Ei! estou ocupado com ', banco.slot);
		} else {
			console.log('Banco não existe');
		}
	}

	public sentarCrianca(quem: 'PL' | 'PR' | 'PC', nome: string, idade: number ) {
		const banco = this.pesquisarEntidade(quem, this._bancos) as Banco;
		if(banco){
			if (banco.slot instanceof Cadeirinha) {
				if (banco.slot.validarIdade(idade)) {
					banco.slot.colocarCrianca(nome, idade);
				} else {
					console.log('Crainça não comporta para esta cadeirinha', idade);
				}
			} else if (banco.slot) {
				console.log('O Banco esta ocupado', banco.slot.obterPosicao);
			} else {
				console.log('O Banco esta vazio, coloque uma cadeirinha para ', nome);
			}
		} else {
			console.log('Banco não existe!');
		}
	}

	private criarCadeirinha(
		quem: QuemBack,
		tipo: BabyChear,
	): Cadeirinha | undefined {
		const { x, y } = QuemUtils.quemE(quem);
		switch (tipo) {
			case PosicaoY.B:
				console.log('Colocou a cadeira BebeConforto');
				return new BebeConforto(x, y);
			case PosicaoX.C:
				console.log('Colocou a cadeira Cadeira');
				return new Cadeira(x, y);
			case 'E':
				console.log('Colocou a cadeira Cadeira Elevação');
				return new CadeiraElevacao(x, y);
		}
	}

	private pesquisarEntidade(quem: Quem | string, lista: BaseObject[]): BaseObject | undefined {
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
			const coordenadas = QuemUtils.quemE(quem);
			return p.pX === coordenadas.x && p.pY === coordenadas.y;
		});
	}

	public levantarse(quem: Quem): void {
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

	public colocarCinto(quem: Quem): void {
		const cinto = this.pesquisarEntidade(quem, this._cinto) as Cinto;
		if (cinto) {
			cinto.travar();
		} else {
			console.log('Cinto esta estragado ou com mal funcionamento');
		}
	}

	public tirarCinto(quem: Quem): void {
		const cinto = this.pesquisarEntidade(quem, this._cinto) as Cinto;
		if (cinto) {
			cinto.destravar();
		} else {
			console.log('Cinto esta estragado ou com mal funcionamento');
		}
	}
	
	public listaChamada(): void {
		this._bancos.forEach((b) => {
			const posicao = `No ${b.obterPosicao},`;
			if(b.slot instanceof Passageiro){
				console.log(posicao, 'esta sentado', b.slot.nome);
			} else if (b.slot instanceof Cadeirinha) {
				if(b.slot.slot instanceof Passageiro){
					console.log(posicao, 'esta', b.slot.tipo, 'e esta com', b.slot.slot.nome);
				} else {
					console.log(posicao, 'esta', b.slot.tipo, 'e esta vazia');
				}
			} else {
				console.log(posicao, 'esta vazio');
			}
		});
	}

	private _pedais: Pedal[] = [ new Acelerador(), new Freio(), new Embreagem() ];

	private _portas: Porta[] = [ 
		new Porta(PosicaoX.L, PosicaoY.F), 
		new Porta(PosicaoX.L, PosicaoY.B), 
		new Porta(PosicaoX.R, PosicaoY.F), 
		new Porta(PosicaoX.R, PosicaoY.B) 
	];
	
	private _bancos: Banco[] = [ 
		new Banco(PosicaoX.L, PosicaoY.F), 
		new Banco(PosicaoX.R, PosicaoY.F), 
		new Banco(PosicaoX.R, PosicaoY.B), 
		new Banco(PosicaoX.L, PosicaoY.B),
		new Banco(PosicaoX.C, PosicaoY.B) 
	];

	private _espelhos: Espelho[] = [ 
		new Espelho(PosicaoX.L), 
		new Espelho(PosicaoX.R), 
		new Espelho(PosicaoX.C) 
	];

	private _cinto: Cinto[] = [
		new Cinto(PosicaoX.L, PosicaoY.F),
		new Cinto(PosicaoX.L, PosicaoY.B),
		new Cinto(PosicaoX.R, PosicaoY.F),
		new Cinto(PosicaoX.R, PosicaoY.B),
		new Cinto(PosicaoX.C, PosicaoY.B, 2)
	];

	private _cadeirinhas: Cadeirinha[] = [];

	private _macanetas: Macaneta[] = [
		new Macaneta(PosicaoX.L, PosicaoY.F),
		new Macaneta(PosicaoX.L, PosicaoY.B),
		new Macaneta(PosicaoX.R, PosicaoY.F),
		new Macaneta(PosicaoX.R, PosicaoY.B),
		new Macaneta(PosicaoX.C, PosicaoY.B)
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
	// Adicionar a propriedade TIPO a entidade Banco aceitando 'T' | PosicaoX.C
	// Adicionar os tres bancos trazeiros ao carro.
	// Verificar se criança tem a ideade correta para o bebe conforto, e implementar metodo para colocar a criança na cadeirinha.
	// Apresentar mensagem de BemVindo somente quando a criança estiver na cadeirinha (slot !== undefined)
}
