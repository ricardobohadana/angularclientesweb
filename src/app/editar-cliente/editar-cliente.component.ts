import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/models/ApiResponse';
import { Cliente, ClienteJson } from 'src/models/Cliente';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private toast: ToastrService, //inicializando a classe ActivatedRoute
    private activateRoute: ActivatedRoute
  ) {}

  mensagem: string = '';

  showSpinner: boolean = false;

  form = new FormGroup({
    idCliente: new FormControl('', []),
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    dataNascimento: new FormControl('', [Validators.required]),
  });

  get formControl() {
    return this.form.controls;
  }

  ngOnInit(): void {
    const idCliente = this.activateRoute.snapshot.paramMap.get('idCliente');
    this.httpClient
      .get<ClienteJson>(environment.baseUrl + 'api/cliente/' + idCliente)
      .subscribe((data) => {
        const d = {
          ...data,
          dataNascimento: new Date(data.dataNascimento)
            .toISOString()
            .split('T')[0],
        };
        this.form.patchValue(d);
      });
  }

  onSubmit(): void {
    this.showSpinner = true;
    console.log(this.form.value);
    this.httpClient
      .put<ApiResponse>(environment.baseUrl + 'api/cliente', this.form.value)
      .subscribe(
        (data: ApiResponse) => {
          this.mensagem = data.mensagem;
          this.showSpinner = false;
          this.toast.success(data.mensagem, '');
        },
        (err: HttpErrorResponse) => {
          this.mensagem = err.error.mensagem;
          this.toast.error(this.mensagem, `${err.status} - ${err.statusText}`, {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
          this.showSpinner = false;
        }
      );
  }
}
