import { Carro } from './components/carro';
import { PosicaoY } from './enum/posicao-y.enum';
import { QuemEnum } from './enum/quem.enum';
import { Data } from './types/quem.type';

// Função inicial para startar a aplicação
const run = () => {
	try {
		console.log('Iniciando as interações entre componentes de um carro');
		// Aqui vai o codigo
		const carro1 = new Carro();
		console.log(`Meu carro tem: 
            Chassi: ${carro1.chassi},
        `);
		carro1.abrir(QuemEnum.M, 30);
		carro1.sentar(QuemEnum.M, 'Marcelo', 60);
		carro1.colocarCinto(QuemEnum.M);
		carro1.fechar(QuemEnum.M);
		console.log('*------------------------------------------------------*');

		carro1.abrir(QuemEnum.C, 30);
		// Esposa esqueceu a bolsa no banco.
		// Abriu a porta, pegou a bolsa e fechou a porta
		carro1.fechar(QuemEnum.C);
		console.log('*------------------------------------------------------*');

		// Filho resouvel entrar no carro pela porta trazeira.
		carro1.abrir(QuemEnum.PR, 30);
		carro1.sentar(QuemEnum.PR, 'Fabricio', 14);
		carro1.colocarCinto(QuemEnum.PR);
		carro1.fechar(QuemEnum.PR);
		console.log('*------------------------------------------------------*\r\n');
		// console.log(`Estou gerando um texto com
		// Quebra de linha
		// Em mais de uma linha
		// .....`);

		carro1.abrir(QuemEnum.PL, 30);
		carro1.instalarCadeira(QuemEnum.PL, PosicaoY.B);
		carro1.sentarCrianca('PL', 'Joãosinho', 1);

		carro1.sentar(QuemEnum.PL, 'Maria', 6);
		carro1.fechar(QuemEnum.PL);
		carro1.sentar(QuemEnum.PR, 'Maria', 6);
		carro1.sentar(QuemEnum.PC, 'Maria', 6);
		carro1.fechar(QuemEnum.PR);

		console.log('*------------------------------------------------------*');

		// carro1.listaChamada();

		console.log('*------------------------------------------------------*');
		const teste: Data = { teste: QuemEnum.C };
		carro1.ligar();
		console.log('Acionando a Freio');
		carro1.freio(10);
		// Aqui termina o codigo
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};

run();
