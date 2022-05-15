import { Cliente } from './Cliente';

export interface ApiResponse {
  mensagem: string;
  cliente: Cliente | null;
}
