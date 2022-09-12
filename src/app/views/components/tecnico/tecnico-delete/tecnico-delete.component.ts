import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  id_tec = '';

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(
    private router : Router,
    private service: TecnicoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')! //Obtendo o id da rota e passando para a variável
    this.findById(); //Efetuando a busca do técnico no banco com o id que foi obtido.
  }

  findById(): void {
    this.service.findById(this.id_tec).subscribe(resposta => { //A resposta retorna um técnico que será preenchido no objeto técnico
      this.tecnico = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.id_tec).subscribe(resposta => {
      this.router.navigate(['tecnicos']);
      this.service.message('Técnico deletado com sucesso!');
    }, err => {
      if(err.error.error.match('possui Ordens de Serviço')){
        this.service.message(err.error.error);
      }
    })
  }

  cancel(): void {
    this.router.navigate(['tecnicos']);
  }
}
