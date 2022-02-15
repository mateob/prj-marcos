import { PosicaoX } from "../enum/posicao-x.enum";
import { PosicaoY } from "../enum/posicao-y.enum";
import { Quem, QuemBack } from "../types/quem.type";

export class QuemUtils {
    public static quemE(quem: Quem | QuemBack): { x: PosicaoX; y: PosicaoY } {
        switch (quem) {
			case 'M':
				return { x: PosicaoX.L, y: PosicaoY.F };
			case 'PL':
				return { x: PosicaoX.L, y: PosicaoY.B };
			case 'C':
				return { x: PosicaoX.R, y: PosicaoY.F };
			case 'PR':
				return { x: PosicaoX.R, y: PosicaoY.B };
			default:
			case 'PC':
				return { x: PosicaoX.C, y: PosicaoY.B };
		}
    }

    public static qualPosicao(posicaoX: string, posicaoY: string): string {
        if(posicaoY === 'F') {
            if( posicaoX === 'L'){
                return 'M';
            } else {
                return 'C';
            }
        } else {
            return `P${posicaoX}`;
        }
    }
}