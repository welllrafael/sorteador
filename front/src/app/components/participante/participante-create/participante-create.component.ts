import { ParticipanteService } from './../participante.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Participante } from '../participante.model';

@Component({
  selector: 'app-participante-create',
  templateUrl: './participante-create.component.html',
  styleUrls: ['./participante-create.component.css']
})
export class ParticipanteCreateComponent implements OnInit {

  participante : Participante = {
    name: '',
    sorteado: false 
  }

  constructor(private participanteService: ParticipanteService,
              private router: Router) { }

  ngOnInit(): void {
  }
  
  createParticipante(): void {
    this.participanteService.create(this.participante).subscribe(()=>{
      this.participanteService.showMessage('Participante cadastrado');
      this.router.navigate(['/participante']);
    })
  }

  cancel(): void {
    this.router.navigate(['/participante']);
  }
}
