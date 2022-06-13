import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  insertItem,
  patch,
  removeItem,
  updateItem,
} from '@ngxs/store/operators';
import { catchError, of, tap } from 'rxjs';
import { LoadableStatus } from 'src/app/models/meta';
import { ITeam } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.services';
import { isCurrentDateRange } from 'src/app/utils/date-helper';
import { Team } from './teams.actions';

const SPRINTS: string[] = [
  '07/06/2022 - 20/06/2022',
  '21/06/2022 - 04/07/2022',
  '05/07/2022 - 18/07/2022',
  '19/07/2022 - 01/08/2022',
];

export interface ISprintTeam {
  [sprintDate: string]: ITeam[];
}

export class TeamStateModel {
  entities: ISprintTeam;
  currentSprint: number;
  total: number;
  status: LoadableStatus | null;
  message: string;
}

@State<TeamStateModel>({
  name: 'teamState',
  defaults: {
    entities: {},
    currentSprint: 0,
    total: 0,
    status: null,
    message: '',
  },
})
@Injectable()
export class TeamState {
  constructor(private teamService: TeamService) {}

  @Selector()
  static selectLoadingSprintTeams(state: TeamStateModel): boolean {
    return state.status === LoadableStatus.Loading;
  }

  @Selector()
  static selectSprintTeams(state: TeamStateModel): ISprintTeam {
    return state.entities;
  }

  @Selector()
  static selectCurrentSprintIndex(state: TeamStateModel): number {
    return state.currentSprint;
  }

  @Selector()
  static selectSprintsTotal(state: TeamStateModel): number {
    return state.total;
  }

  @Selector()
  static selectCurrentSprint(state: TeamStateModel): string {
    return Object.keys(state.entities)[state.currentSprint] ?? '';
  }

  @Selector()
  static selectCurrentSprintTeams(state: TeamStateModel): ITeam[] {
    const currentSprintKey = Object.keys(state.entities)[state.currentSprint];
    return state.entities[currentSprintKey] ?? null;
  }

  @Selector()
  static selectCurrentSprintUnallocated(
    state: TeamStateModel
  ): string[] | undefined {
    const currentSprint = this.selectCurrentSprintTeams(state);
    const members = currentSprint.find(
      (project) => project.name === 'Unallocated'
    )?.members;
    return members;
  }

  @Action(Team.SetCurrentSprint)
  setDataInState(
    ctx: StateContext<TeamStateModel>,
    action: { sprintKey: number }
  ) {
    return ctx.patchState({ currentSprint: action.sprintKey });
  }

  @Action(Team.GetSprintTeams)
  getDataFromServer(ctx: StateContext<TeamStateModel>) {
    ctx.patchState({ status: LoadableStatus.Loading });

    return this.teamService.getTeams().pipe(
      tap((teams) => {
        const sprintTeams = SPRINTS.reduce((acc, current) => {
          return {
            ...acc,
            [current]: teams,
          };
        }, {});

        ctx.patchState({
          status: LoadableStatus.Loaded,
          entities: sprintTeams,
          currentSprint: defaultCurrentSprint(sprintTeams),
          total: Object.keys(sprintTeams).length,
        });
      }),
      catchError(() => {
        return of(
          ctx.patchState({
            status: LoadableStatus.Error,
            message: 'Error occurred while loading projects',
          })
        );
      })
    );
  }

  @Action(Team.RemoveMemberFromTeam)
  removeDataFromState(
    ctx: StateContext<TeamStateModel>,
    action: { email: string; team: string }
  ) {
    const state = ctx.getState();
    const currentSprintKey = Object.keys(state.entities)[state.currentSprint];

    // move member to unallocated
    ctx.setState(
      patch<TeamStateModel>({
        entities: patch({
          [currentSprintKey]: updateItem<ITeam>(
            (team) => team?.name === 'Unallocated',
            patch<ITeam>({
              members: insertItem<string>(action.email),
            })
          ),
        }),
      })
    );
    // remove it from the sprint team
    return ctx.setState(
      patch<TeamStateModel>({
        entities: patch({
          [currentSprintKey]: updateItem<ITeam>(
            (team) => team?.name === action.team,
            patch<ITeam>({
              members: removeItem<string>((member) => member === action.email),
            })
          ),
        }),
      })
    );
  }

  @Action(Team.AddMemberToTeam)
  addDataToState(
    ctx: StateContext<TeamStateModel>,
    action: { email: string; team: string }
  ) {
    const state = ctx.getState();
    const currentSprintKey = Object.keys(state.entities)[state.currentSprint];

    // remove from unallocated
    ctx.setState(
      patch<TeamStateModel>({
        entities: patch({
          [currentSprintKey]: updateItem<ITeam>(
            (project) => project?.name === 'Unallocated',
            patch<ITeam>({
              members: removeItem<string>((member) => member === action.email),
            })
          ),
        }),
      })
    );

    return ctx.setState(
      patch<TeamStateModel>({
        entities: patch({
          [currentSprintKey]: updateItem<ITeam>(
            (team) => team?.name === action.team,
            patch<ITeam>({
              members: insertItem<string>(action.email),
            })
          ),
        }),
      })
    );
  }
}

// function to find the default current sprint
const defaultCurrentSprint = (sprints: ISprintTeam): number => {
  const sprintKeys = Object.keys(sprints);
  let currentIndex = 0;
  sprintKeys.find((key) => {
    const dates = key.split('-');
    const startDate = dates[0].trim();
    const endDate = dates[1].trim();

    if (isCurrentDateRange(startDate, endDate)) {
      currentIndex = sprintKeys.indexOf(key);
    }
  });
  return currentIndex;
};
