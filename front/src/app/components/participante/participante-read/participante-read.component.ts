import { ParticipanteService } from './../participante.service';
import { Participante } from './../participante.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participante-read',
  templateUrl: './participante-read.component.html',
  styleUrls: ['./participante-read.component.css']
})
export class ParticipanteReadComponent implements OnInit {

  participantes: Participante[]
  displayedColumns = ['id', 'name', 'sorteado', 'action']

  constructor(private participanteService: ParticipanteService) { }

  ngOnInit(): void {
    this.participanteService.read().subscribe(participantes => {
      this.participantes = participantes
      console.log(participantes)
    })
  }

}
