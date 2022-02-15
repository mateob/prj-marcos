import { Cadeirinha } from '../components/base/cadeirinha';
import { Passageiro } from '../components/base/passageiro';
import { QuemEnum } from '../enum/quem.enum';

export type Quem = QuemEnum;
export type QuemBack = Omit<Quem, 'M' | 'C'>;
// export type PositionX = 'L' | 'R' | 'T' | 'C';
// export type PositionY = 'F' | 'B';
export type BabyChear = 'B' | 'C' | 'E';
export type Slot = Cadeirinha | Passageiro | undefined;
export type Data = { [key: string]: QuemEnum };
