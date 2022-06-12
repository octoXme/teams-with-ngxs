import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { IMember } from 'src/app/models/member.model';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.scss'],
})
export class AddTeamMemberComponent implements OnInit {
  @Input() placeholder: string;
  @Input() options: IMember[] = [];
  @Output() addMember = new EventEmitter<{ email: string }>();

  inputControl = new FormControl();
  filteredOptions: Observable<IMember[] | null> | undefined;
  selectedMember: string;

  ngOnInit(): void {
    this.filteredOptions = this.inputControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterOptions(value))
    );
  }

  private filterOptions(value: string): IMember[] | null {
    if (!value) return this.options;
    const filterValue = value.toLowerCase().trim();

    if (!this.options) return null;

    return this.options.filter((member) =>
      member?.name?.toLowerCase().includes(filterValue)
    );
  }

  onSelect(element: MatAutocompleteSelectedEvent): void {
    this.selectedMember = element.option.value;
  }

  onAddMember(): void {
    this.addMember.emit({ email: this.selectedMember });
  }
}
