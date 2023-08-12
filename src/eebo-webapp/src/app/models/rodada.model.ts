import { Orquestra } from './orquetra.model';

export interface Rodada {
  nome: string;
  orquestras: Orquestra[];
  proxima?: Orquestra;
  emExecucao?: Orquestra;
}
