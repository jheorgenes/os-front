import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements AfterViewInit {

  lista: OS[] = []; //Lista de técnicos vazia

  displayedColumns: string[] = ['tecnico', 'cliente', 'abertura', 'fechamento', 'prioridade', 'status', 'action']; 
  dataSource = new MatTableDataSource<OS>(this.lista); //Componente de Tabela, recebendo uma lista de Técnicos do tipo Técnico

  @ViewChild(MatPaginator) paginator!: MatPaginator; //Componente de paginação injetado como atributo

  constructor(
    private service: OsService,
    private router : Router ){}

  /* Antes de inicializar a visualização, executa esse método abaixo */
  ngAfterViewInit() {
    this.findAll(); //Executa o método que busca todos
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.lista = resposta; //Recebe a lista de técnicos obtida da API
      this.dataSource = new MatTableDataSource<OS>(this.lista); //Instancia o dataSource no tipo OS
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate(): void {
    this.router.navigate(['os/create'])
  }
}