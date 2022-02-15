import { Slot } from '../../types/quem.type';
import { BaseObject } from './baseObjec';

export abstract class ObjetoSlot extends BaseObject {
	protected _slot: Slot = undefined;
	public abstract set slot(slot: Slot);
	public abstract get slot(): Slot;
}
