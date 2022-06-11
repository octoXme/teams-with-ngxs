import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'teams',
    loadChildren: () =>
      import('./teams/teams.module').then(
        (module) => module.TeamsModule
      ),
  },
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}