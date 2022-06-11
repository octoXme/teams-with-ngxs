import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamsComponent } from './teams.component';
import { teamsRoutes } from './teams.routes';

@NgModule({
  declarations: [TeamsComponent],
  imports: [CommonModule, RouterModule.forChild(teamsRoutes)],
})
export class TeamsModule {}
