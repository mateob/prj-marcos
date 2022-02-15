import { Caneta } from "./components/caneta";

const run = () => {
    try {
        console.log('Projeto 01 - Caneta Bic');
        console.log(`
        - Criar a estrutura de clases para uma caneta Bic
        - A Caneta deve receber 3 tipos de cores.
            - Azul, Vermelha ou Preta
                - crair um enum
        - Quando criar a caneta. 
            - Informar tamanho 
            - Cor da tampa 
            - Cor da tampão
            - Cor do plastico
        - Metodos
            - Tirar a Tampa 
            - Colocar a tampa 
            - Escrever - deve receber um valor String
                - Deve mostrar a escrita e a cor com a que esta escrevendo. 
        `);

        // Aqui vai o codigo. 
        const bic = new Caneta();
        // bic.metodo();


        // Aqui termina o codigo.
    } catch (error) {
		console.log(`Deu erro: `, error);
	}
}

run();