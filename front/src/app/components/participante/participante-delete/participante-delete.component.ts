import { ParticipanteService } from './../participante.service';
import { Component, OnInit } from '@angular/core';
import { Participante } from '../participante.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-participante-delete',
  templateUrl: './participante-delete.component.html',
  styleUrls: ['./participante-delete.component.css']
})
export class ParticipanteDeleteComponent implements OnInit {

  participante: Participante

  constructor(private participanteService: ParticipanteService,
              private router: Router,
              private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.routeActive.snapshot.paramMap.get('id')
    this.participanteService.readById(id).subscribe(participante=>{
      this.participante = participante
    })
  }

  deleteParticipante(): void {
    this.participanteService.delete(this.participante.id).subscribe(()=>{
      this.participanteService.showMessage("Participante excluido com sucesso");
      this.router.navigate(['/participante']);
    })
  }

  cancel(): void {
    this.router.navigate(['/participante'])
  }

}
