import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConsultarClientesComponent } from './consultar-clientes/consultar-clientes.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { CriarClienteComponent } from './criar-cliente/criar-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'consultar', component: ConsultarClientesComponent },
  { path: 'criar', component: CriarClienteComponent },
  { path: 'editar/:idCliente', component: EditarClienteComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ConsultarClientesComponent,
    PaginaInicialComponent,
    CriarClienteComponent,
    EditarClienteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({
      preventDuplicates: false,
      closeButton: true,
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
