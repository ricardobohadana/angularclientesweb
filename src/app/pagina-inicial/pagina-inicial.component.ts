import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css'],
})
export class PaginaInicialComponent implements OnInit {
  svgHeight: number = window.innerHeight / 2.5;
  svgWidth: number = window.innerWidth / 2.5;

  constructor() {}

  ngOnInit(): void {}
}
