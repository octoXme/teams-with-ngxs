import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserItemModule } from 'src/app/components/user-item/user-item.module';
import { AddTeamMemberComponent } from './add-team-member.component';

@NgModule({
  declarations: [AddTeamMemberComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    UserItemModule,
  ],
  exports: [AddTeamMemberComponent],
})
export class AddTeamMemberModule {}
