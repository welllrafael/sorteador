import { ParticipanteDeleteComponent } from './components/participante/participante-delete/participante-delete.component';
import { ParticipanteUpdateComponent } from './components/participante/participante-update/participante-update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ParticipanteCrudComponent } from './views/participante-crud/participante-crud.component';
import { ParticipanteCreateComponent } from './components/participante/participante-create/participante-create.component';
import { SorteadorComponent } from './views/sorteador/sorteador.component';

const routes: Routes = [
  {
  path: "",
  component: HomeComponent
  },
  {
  path: "participante",
  component: ParticipanteCrudComponent
  },
  {
    path: "participante/create",
    component: ParticipanteCreateComponent
  },
  {
    path: "participante/update/:id",
    component: ParticipanteUpdateComponent
  },
  {
    path: "participante/delete/:id",
    component: ParticipanteDeleteComponent
  },
  {
    path: "sorteador",
    component: SorteadorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
