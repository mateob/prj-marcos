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
            Rodas: ${carro1.rodas}
        `);
		carro1.abrir(QuemEnum.M);
		carro1.sentar(QuemEnum.M, 'Marcelo', 32);
		carro1.colocarCinto(QuemEnum.M);
		carro1.fechar(QuemEnum.M);
		console.log('*------------------------------------------------------*');

		carro1.abrir(QuemEnum.C);
		// Esposa esqueceu a bolsa no banco.
		// Abriu a porta, pegou a bolsa e fechou a porta
		carro1.fechar(QuemEnum.C);
		console.log('*------------------------------------------------------*');

		// Filho resouvel entrar no carro pela porta trazeira.
		carro1.abrir(QuemEnum.PR);
		carro1.sentar(QuemEnum.PR, 'Fabricio', 14);
		carro1.colocarCinto(QuemEnum.PR);
		carro1.fechar(QuemEnum.PR);
		console.log('*------------------------------------------------------*\r\n');
		// console.log(`Estou gerando um texto com 
		// Quebra de linha 
		// Em mais de uma linha 
		// .....`);

		carro1.abrir(QuemEnum.PL);
		carro1.instalarCadeira(QuemEnum.PL, PosicaoY.B);
		carro1.sentarCrianca('PL', 'Joãosinho', 1);

		carro1.sentar(QuemEnum.PL, 'Maria', 6);
		carro1.fechar(QuemEnum.PL);

		console.log('*------------------------------------------------------*');

		carro1.listaChamada();



		console.log('*------------------------------------------------------*');
		const teste: Data = { teste: QuemEnum.C };
		carro1.ligar();
		console.log('Acionando a Freio');
		carro1.freio();
		// Aqui termina o codigo
	} catch (error) {
		console.log(`Deu erro: `, error);
	}
};

run();
