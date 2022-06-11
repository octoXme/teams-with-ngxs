import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Team } from '../store/teams/teams.actions';
import { ISprintTeam, TeamState } from '../store/teams/teams.state';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  @Select(TeamState.selectLoadingSprintTeams)
  loading$: Observable<boolean>;
  @Select(TeamState.selectSprintTeams)
  sprints$: Observable<ISprintTeam>;
  @Select(TeamState.selectCurrentSprintIndex)
  currentIndex$: Observable<number>;
  @Select(TeamState.selectSprintsTotal)
  total$: Observable<number>;

  teamSubscription: Subscription = new Subscription();
  index: number;
  isFirst: boolean;
  isLast: boolean;
  currentSprintDate: string;
  sprintPosition: number;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Team.GetSprintTeams());

    this.teamSubscription = combineLatest([
      this.currentIndex$,
      this.total$,
      this.sprints$,
    ]).subscribe(([index, total, sprints]) => {
      this.index = index;
      this.isFirst = index === 0;
      this.isLast = index + 1 === total;
      this.sprintPosition = (100 * (index + 1)) / total;
      this.currentSprintDate = Object.keys(sprints)[index];
    });
  }

  updateCurrentSprint(index: number): void {
    this.store.dispatch(new Team.SetCurrentSprint(index));
  }

  nextSprint() {
    // this.index = this.index + 1;
    this.updateCurrentSprint(this.index + 1);
  }

  prevSprint() {
    this.updateCurrentSprint(this.index - 1);
  }

  trackByFn(index: number) {
    return index;
  }

  ngOnDestroy(): void {
    this.teamSubscription?.unsubscribe();
  }
}
