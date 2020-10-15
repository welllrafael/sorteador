import { ParticipanteService } from './../participante.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Participante } from '../participante.model';

@Component({
  selector: 'app-participante-update',
  templateUrl: './participante-update.component.html',
  styleUrls: ['./participante-update.component.css']
})
export class ParticipanteUpdateComponent implements OnInit {

  participante: Participante
  constructor(private participanteService: ParticipanteService,
              private router: Router,
              private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.routeActive.snapshot.paramMap.get('id')
    this.participanteService.readById(id).subscribe(participante => {
      this.participante = participante
      console.log(participante)
    });
  }

  updateParticipante(): void{
    this.participanteService.update(this.participante).subscribe(()=>{
      this.participanteService.showMessage("Participante atualizado com sucesso!")
      this.router.navigate(['/participante'])
    })
  }

  cancel(): void {
    this.router.navigate(['/participante'])
  }

}
