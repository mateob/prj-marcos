export enum StatusPeca {
	SEM_CONCERTO = 'semConcerto', // Sem concerto
	QUEBRADO = 'quebrado', // quebrado
	DANIFICADO = 'danificado', // danificado
	AMACADO = 'amacado', // amaçado
	ARRANHADO = 'arranhado', // arranhado
	REPARADO = 'reparado',
	BOM = 'bom',
	SEMI_NOVO = 'semiNovo',
	NOVO = 'novo'
}

/**
 * Caminhão Suporta 2 tonelada;
 * Cabine pesa 200k 
 * Motor 400k 
 * Motorista 120k
 * Caçamba 300k  
 * Tanque de Combustivel 50k - Capacidade 120L 
 * 
 * Caminhão 2 exos
 * Conforme peso vai andar a uma certa velocidade. 
 * Vazio 120/h largada 60/s - Baixo
 * Com 1T de carga 90/h largada 40/s - Medio
 * Com 2T de carga 60/h largada 30/s - Lato
 * 
 */
