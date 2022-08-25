import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-read',
  templateUrl: './tecnico-read.component.html',
  styleUrls: ['./tecnico-read.component.css']
})
export class TecnicoReadComponent implements AfterViewInit {

  tecnicos: Tecnico[]= []; //Lista de técnicos vazia

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone']; 
  dataSource = new MatTableDataSource<Tecnico>(this.tecnicos); //Componente de Tabela, recebendo uma lista de Técnicos do tipo Técnico

  @ViewChild(MatPaginator) paginator!: MatPaginator; //Componente de paginação injetado como atributo

  constructor(private service: TecnicoService){}

  /* Antes de inicializar a visualização, executa esse método abaixo */
  ngAfterViewInit() {
    this.findAll(); //Executa o método que busca todos
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.tecnicos = resposta; //Recebe a lista de técnicos obtida da API
      this.dataSource = new MatTableDataSource<Tecnico>(this.tecnicos); //Instancia o dataSource no tipo Tecnico
      this.dataSource.paginator = this.paginator;
    })
  }
}