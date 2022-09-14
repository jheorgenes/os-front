import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

 id_cli = '';

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(
    private router : Router,
    private service: ClienteService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cli = this.route.snapshot.paramMap.get('id')! //Obtendo o id da rota e passando para a variável
    this.findById(); //Efetuando a busca do técnico no banco com o id que foi obtido.
  }

  findById(): void {
    this.service.findById(this.id_cli).subscribe(resposta => { //A resposta retorna um técnico que será preenchido no objeto técnico
      this.cliente = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.id_cli).subscribe(resposta => {
      this.router.navigate(['clientes']);
      this.service.message('Cliente deletado com sucesso!');
    }, err => {
      if(err.error.error.match('possui Ordens de Serviço')){
        this.service.message(err.error.error);
      }
    })
  }

  cancel(): void {
    this.router.navigate(['clientes']);
  }
}
