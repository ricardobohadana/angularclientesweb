import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/models/ApiResponse';

@Component({
  selector: 'app-criar-cliente',
  templateUrl: './criar-cliente.component.html',
  styleUrls: ['./criar-cliente.component.css'],
})
export class CriarClienteComponent implements OnInit {
  mensagem: string = '';
  showSpinner: boolean = false;

  form = new FormGroup({
    Nome: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
    Cpf: new FormControl('', [Validators.required]),
    DataNascimento: new FormControl('', [Validators.required]),
  });

  get formControl() {
    return this.form.controls;
  }

  constructor(private httpClient: HttpClient, private toast: ToastrService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.showSpinner = true;

    this.httpClient
      .post<ApiResponse>(environment.baseUrl + 'api/cliente', this.form.value)
      .subscribe(
        (data: ApiResponse) => {
          console.log(data);
          this.mensagem = data.mensagem;
          this.toast.success('', this.mensagem, {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
          this.showSpinner = false;
          this.form.reset();
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
