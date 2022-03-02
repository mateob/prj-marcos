import { PosicaoX } from '../../enum/posicao-x.enum';
import { PosicaoY } from '../../enum/posicao-y.enum';
import { Qualidade } from '../../enum/qualidade.enum';
import { PronomeQuemEnum, QuemEnum, QuemSouEnum } from '../../enum/quem.enum';
import { StatusPeca } from '../../enum/status-peca.enum';
import { CustomError } from '../../types/erro-carro';
import { QuemUtils } from '../../utils/quem.utils';

export abstract class BaseObject {
	protected _posicaoX: PosicaoX;
	protected _posicaoY: PosicaoY;
	protected _nomeEntidade: string;
	private _resistencia: number = 1;
	private _resistenciaInicial: number = 0;
	private _durabilidade: number = 1;
	private _durabilidadeInicia: number = 0;
	private _status: StatusPeca = StatusPeca.NOVO;

	protected set resistencia(rest: number) {
		this._resistencia = rest;
		if (this._resistencia > this._resistenciaInicial) {
			this._resistenciaInicial = this._resistencia;
		}
		this.alterarStatus();
	}

	protected set durabilidade(rest: number) {
		this._durabilidade = rest;
		if (this._durabilidade > this._durabilidadeInicia) {
			this._durabilidadeInicia = this._durabilidade;
		}
		this.alterarStatus();
	}

	constructor(posicaoX: PosicaoX, posicaoY: PosicaoY, nome: string) {
		this._posicaoX = posicaoX;
		this._posicaoY = posicaoY;
		this._nomeEntidade = nome;
	}

	public consertar(qualidade: Qualidade, troca: boolean = false) {
		if (!troca && this._status === StatusPeca.SEM_CONCERTO) {
			throw new CustomError(
				`${this._nomeEntidade} não pode ser reparadom, stats ${this._status}`,
				this._nomeEntidade,
				{ pX: this._posicaoX }
			);
		}
		if (qualidade === Qualidade.R && this._status === StatusPeca.DANIFICADO) {
			throw new CustomError(
				`${this._nomeEntidade}, realizada gambiarra mal feita, stats ${this._status}`,
				this._nomeEntidade,
				{ pX: this._posicaoX }
			);
		}

		/**
	 	 * Descrevendo o Include 
		 * Quando tenho um Array = [];
		 * ['Valor1', 'Valor2'].includes(valorX) <- estou verificando se o valorX esta na lista
		 * 
		 * ValorX = Verde
		 * Lista = [Azul, Roxo]
		 * 
		 * Lista.inclues(ValorX) = false; 
		 * 
	     */
		if (qualidade === Qualidade.M && [ StatusPeca.SEM_CONCERTO, StatusPeca.QUEBRADO ].includes(this._status)) {
			throw new CustomError(
				`${this._nomeEntidade}, repoaro insuficiente, não vai funcionar, stats ${this._status}`,
				this._nomeEntidade,
				{ pX: this._posicaoX }
			);
		}

		switch (qualidade) {
			case Qualidade.R:
				this.reinicarValores(troca ? 3 : 4.5);
				break;
			case Qualidade.M:
				this.reinicarValores(troca ? 2 : 3.5);
				break;
			case Qualidade.B:
				this.reinicarValores(troca ? 0 : 1.5);
				break;
		}
	}

	private reinicarValores(divisor: number = 0) {
		if (divisor > 0) {
			this.resistencia = Math.round(this._resistenciaInicial / divisor);
			this.durabilidade = Math.round(this._durabilidadeInicia / divisor);
		} else {
			this.resistencia = this._resistenciaInicial;
			this.durabilidade = this._durabilidadeInicia;
		}
	}

	private alterarStatus() {
		const percentualResistencia = this.regraDeTres(this._resistenciaInicial, this._resistencia);
		const percentualDurabilidade = this.regraDeTres(this._durabilidadeInicia, this._durabilidade);
		if (this.validarEntreValores(100, 100, false, percentualResistencia, percentualDurabilidade)) {
			this._status = StatusPeca.NOVO;
		}
		if (this.validarEntreValores(90, 99, false, percentualResistencia, percentualDurabilidade)) {
			this._status = StatusPeca.SEMI_NOVO;
		}
		if (this.validarEntreValores(80, 89, false, percentualResistencia, percentualDurabilidade)) {
			this._status = StatusPeca.BOM;
		}
		if (this.validarEntreValores(70, 79, false, percentualResistencia, percentualDurabilidade)) {
			this._status = StatusPeca.REPARADO;
		}
		if (this.validarEntreValores(30, 69, false, percentualResistencia, percentualDurabilidade)) {
			this._status = StatusPeca.DANIFICADO;
		}
		if (this.validarEntreValores(10, 29, false, percentualResistencia, percentualDurabilidade)) {
			this._status = StatusPeca.QUEBRADO;
		}
		if (this.validarEntreValores(0, 9, false, percentualResistencia, percentualDurabilidade)) {
			this._status = StatusPeca.SEM_CONCERTO;
		}
		console.log('Meu status', this._status);
	}

	private validarEntreValores(
		valorInicial: number,
		valorFinal: number,
		equalidade: boolean,
		...args: number[]
	): boolean {
		return args.reduce((target: boolean, data) => {
			if (data >= valorInicial && data <= valorFinal) {
				target = true;
			}
			return target;
		}, equalidade);
	}

	private regraDeTres(valorTotal: number, valorAtaul: number): number {
		const valorX = valorAtaul * 100;
		return valorX / valorTotal;
	}

	public set receberDano(dano: number) {
		// dano = 20
		// resistencia = 18
		// dano - resistencia = 2
		// durabilidade = 10

		if (dano > this._resistencia) {
			this._resistencia = 0;
			if (dano - this._resistencia > this._durabilidade) {
				this._durabilidade = 0;
			} else {
				this._durabilidade -= dano;
			}
		} else {
			this._resistencia -= dano;
			console.log(this.msgResistindo());
		}

		if (this._durabilidade === 0) {
			throw new CustomError(this.msgQuebrou(), this._nomeEntidade, { pX: this._posicaoX });
			// console.log(this.msgQuebrou());
		} else if (this._resistencia === 0) {
			console.log(this.msgDanificado());
		}
	}

	protected msgQuebrou(): string {
		return `${this.obterPosicao} Quebrei`;
	}
	protected msgDanificado(): string {
		return `${this.obterPosicao} Estou danificado`;
	}

	protected msgResistindo(): string {
		return `${this.obterPosicao} Estou resistindo`;
	}

	public get obterPosicao() {
		const quem = QuemUtils.qualPosicao(this._posicaoX, this._posicaoY) as QuemEnum;
		return `${this._nomeEntidade} ${PronomeQuemEnum[quem]} ${QuemSouEnum[quem]}`;
	}

	public get pX() {
		return this._posicaoX;
	}

	public get pY() {
		return this._posicaoY;
	}
}
