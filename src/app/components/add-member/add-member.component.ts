import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { IMember } from 'src/app/models/member.model';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() options: IMember[] = [];
  @Input() position: string = '';
  @Output() addMember = new EventEmitter<{ email: string; position: string }>();

  inputControl = new FormControl();
  filteredOptions: Observable<IMember[] | null> | undefined;
  selectedUser: string | undefined;

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
      member.name.toLowerCase().includes(filterValue)
    );
  }

  onSelect(element: MatAutocompleteSelectedEvent): void {
    this.selectedUser = element.option.value;
  }

  onAddUser(): void {
    // this.addMember.emit({ email: this.selectedUser, position: this.position });
  }
}
