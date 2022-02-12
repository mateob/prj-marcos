import { BaseObject } from './baseObjec';
import { Cadeirinha } from './cadeirinha';
import { Passageiro } from './passageiro';

export abstract class ObjetoSlot extends BaseObject {
	protected _slot: Cadeirinha | Passageiro | undefined = undefined;
	public abstract set slot(slot: Cadeirinha | Passageiro | undefined);
	public abstract get slot(): Cadeirinha | Passageiro | undefined;
}
