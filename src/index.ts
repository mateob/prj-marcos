import { Carro } from './components/carro';

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
		carro1.abrir('M');
		carro1.sentar('M', 'Marcelo', 32);
		carro1.colocarCinto('M');
		carro1.fechar('M');

		carro1.abrir('C');
		// Esposa esqueceu a bolsa no banco.
		// Abriu a porta, pegou a bolsa e fechou a porta
		carro1.fechar('C');

		// Filho resouvel entrar no carro pela porta trazeira.
		carro1.abrir('PR');
		carro1.sentar('PR', 'Fabricio', 14);
		carro1.colocarCinto('PL');
		carro1.fechar('PR');

		carro1.instalarCadeira('PL', 'B', 'Rafael', 1);

		carro1.ligar();
		console.log('Acionando a Freio');
		carro1.freio();
		// Aqui termina o codigo
	} catch (error) {
		console.log(`Deu erro: `, error);
	}
};

run();
