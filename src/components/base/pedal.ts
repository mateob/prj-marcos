export abstract class Pedal {
	constructor() {}

	public resistencia: number = 0;
	public acionado: boolean = false;
	public abstract acao(): void;
}
