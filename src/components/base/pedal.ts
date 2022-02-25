export abstract class Pedal {
	protected _name: string = '';
	constructor(name: string) {
		this._name = name;
	}

	protected _resistencia: number = 0;
	protected _pressao: number = 0;
	protected _valorAplicado: number = 0;
	public acionado: boolean = false;

	public acionamento(forca: number): number {
		if (forca > this._resistencia) {
			return this.acao(forca - this._resistencia);
		} else {
			console.log(`Não aplicou força suficiente para ${this._name}`);
			return 0;
		}
	}
	public abstract acao(forca: number): number;
}
