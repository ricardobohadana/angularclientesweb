import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Cliente, ClienteJson } from 'src/models/Cliente';
import { ApiResponse } from 'src/models/ApiResponse';

@Component({
  selector: 'app-consultar-clientes',
  templateUrl: './consultar-clientes.component.html',
  styleUrls: ['./consultar-clientes.component.css'],
})
export class ConsultarClientesComponent implements OnInit {
  mensagemExclusao: string = '';

  clientes: Cliente[] = [];

  constructor(private httpClient: HttpClient, private toast: ToastrService) {}

  ngOnInit(): void {
    this.httpClient
      .get<ClienteJson[]>(environment.baseUrl + 'api/cliente')
      .subscribe((data) => {
        this.clientes = data.map((c) => {
          c.cpf =
            c.cpf.substring(0, 3) +
            '.' +
            c.cpf.substring(3, 6) +
            '.' +
            c.cpf.substring(6, 9) +
            '-' +
            c.cpf.substring(9, 11);
          return new Cliente(c);
        });
      });
  }

  excluirCliente(idCliente: string): void {
    if (window.confirm('Deseja realmente excluir este cliente?')) {
      this.httpClient
        .delete<ApiResponse>(environment.baseUrl + 'api/Cliente/' + idCliente)
        .subscribe((data) => {
          console.log(data);
          this.mensagemExclusao = data.mensagem;
          this.ngOnInit();
          this.showDeleteNotification();
        });
    }
  }

  showDeleteNotification() {
    this.toast.success('', this.mensagemExclusao, {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }
}
