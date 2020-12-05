import { map } from 'rxjs/operators';
import { ParticipanteService } from './../../components/participante/participante.service';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/components/header/header.service';
import { Participante } from 'src/app/components/participante/participante.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sorteador',
  templateUrl: './sorteador.component.html',
  styleUrls: ['./sorteador.component.css']
})
export class SorteadorComponent implements OnInit {
  imagens: string[] //= ['foca.png', 'macaco.png', 'papagaio.png', 'urso.png'];
  participantes: Participante[]
  participanteFacilitador: Participante
  participanteEscriba: Participante
  facilitador: string = 'assets/img/usuario_natal.png'
  escriba: string = 'assets/img/usuario_natal.png'
  nomeFacilitador: string = this.facilitador.substring(11).replace('.png','') 
  nomeEscriba: string = this.escriba.substring(11).replace('.png','')
  constructor(private headerService: HeaderService,
              private participanteService: ParticipanteService,
              private router: Router) { 
    this.headerService.headerData = {
      title: "Sorteador",
      icon:  "camera",
      routeUrl: "/"
    }    
    console.log(this.nomeFacilitador)
  }

  ngOnInit(): void {
    this.participanteService.read()
      .pipe(map(participante => participante.filter(p => !p.sorteado)))
      .subscribe(participantes => {
      this.participantes = participantes
      console.log(participantes)
    })
  }

  getRandomParticipante(nomeJaSorteado: Participante = null) : Participante {
    let participante: Participante 
    while (participante == null || participante === nomeJaSorteado) {
      let num = Math.floor( Math.random() * this.participantes.length );
      participante = this.participantes[ num ];
      console.log(participante);
    }
    return participante
  }

  sortear(): void {
    console.log('sorteou')
    this.participanteFacilitador = this.getRandomParticipante()
    this.participanteEscriba = this.getRandomParticipante(this.participanteFacilitador)
    this.facilitador = this.formatarTag(this.participanteFacilitador.name) 
    this.escriba = this.formatarTag(this.participanteEscriba.name) 
    this.nomeFacilitador = this.obterNome(this.facilitador)
    this.nomeEscriba = this.obterNome(this.escriba)
  }

  obterNome(nomeImg: string): string {
    return nomeImg.substring(31).replace('.png','')
  }

  formatarTag(img: string): string{
    return 'assets/participantes/Dev/'+ img + '.png' ;
  }

  confirmarSorteio(): void{
    this.participanteFacilitador.sorteado = true
    this.participanteEscriba.sorteado = true
    this.facilitador = 'assets/img/semfoto.png'
    this.escriba = 'assets/img/semfoto.png'
    this.nomeFacilitador = this.facilitador.substring(11).replace('.png','') 
    this.nomeEscriba= this.escriba.substring(11).replace('.png','')
    this.persistirConfirmacao(this.participanteFacilitador)
    this.persistirConfirmacao(this.participanteEscriba)
  }

  persistirConfirmacao(participante: Participante): void{
    this.participanteService.update(participante).subscribe(()=>{
      this.participanteService.showMessage("Confirmado com sucesso!")
      this.router.navigate(['/sorteador'])
    })
  }

}
