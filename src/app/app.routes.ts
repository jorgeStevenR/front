import { Routes } from '@angular/router';
import { ListarPersonasComponent } from './components/listar-personas/listar-personas.component';
import { CrearPersonaComponent } from './components/crear-persona/crear-persona.component';

export const routes: Routes = [
  { path: '', component: ListarPersonasComponent },
  { path: 'crear', component: CrearPersonaComponent }
];