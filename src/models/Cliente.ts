interface BaseCliente {
  idCliente: string;
  nome: string;
  email: string;
  cpf: string;
}

export interface ClienteJson extends BaseCliente {
  dataNascimento: string;
}

interface ClienteEntity extends BaseCliente {
  dataNascimento: Date;
}

export class Cliente implements ClienteEntity {
  dataNascimento: Date;
  idCliente: string;
  nome: string;
  email: string;
  cpf: string;

  constructor(props: ClienteJson) {
    this.idCliente = props.idCliente;
    this.dataNascimento = new Date(props.dataNascimento);
    this.nome = props.nome;
    this.email = props.email;
    this.cpf = props.cpf;
  }
}
