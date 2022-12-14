import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements AfterViewInit {

  clientes: Cliente[] = []; //Lista de Clientes vazia

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'action']; 
  dataSource = new MatTableDataSource<Cliente>(this.clientes); //Componente de Tabela, recebendo uma lista de Clientes do tipo Cliente

  @ViewChild(MatPaginator) paginator!: MatPaginator; //Componente de paginação injetado como atributo

  constructor(
    private service: ClienteService,
    private router : Router ){}

  /* Antes de inicializar a visualização, executa esse método abaixo */
  ngAfterViewInit() {
    this.findAll(); //Executa o método que busca todos
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.clientes = resposta; //Recebe a lista de Clientes obtida da API
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes); //Instancia o dataSource no tipo Cliente
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate(): void {
    this.router.navigate(['clientes/create'])
  }
}