import { HeaderService } from './../../components/header/header.service';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participante-crud',
  templateUrl: './participante-crud.component.html',
  styleUrls: ['./participante-crud.component.css']
})
export class ParticipanteCrudComponent implements OnInit {

  constructor(private router: Router,
              private headerService: HeaderService) { 
    this.headerService.headerData = {
      title: "Cadastro de Participante",
      icon:  "transfer_within_a_station",
      routeUrl: "/participante"
    }
  }

  ngOnInit(): void {
  }

  navigateToParticipanteCreate(): void {
    this.router.navigate(['/participante/create']);
  }
}
