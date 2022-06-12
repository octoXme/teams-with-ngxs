import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
  StateOperator,
} from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { catchError, of, tap } from 'rxjs';
import { IMember } from 'src/app/models/member.model';
import { ILoadable, LoadableStatus } from 'src/app/models/meta';
import { MemberService } from 'src/app/services/member.services';
import { Member } from './members.actions';

const defaultMemberValue: IMember = {
  id: undefined,
  name: undefined,
  email: '',
  position: undefined,
  skills: undefined,
  avatar: undefined,
};
export interface ILoadableMember {
  [email: string]: ILoadable<IMember>;
}

export interface MemberStateModel {
  entities: ILoadableMember;
}

@State<MemberStateModel>({
  name: 'memberState',
  defaults: {
    entities: {},
  },
})
@Injectable()
export class MemberState {
  constructor(private memberService: MemberService) {}

  @Selector()
  static selectMembers(state: MemberStateModel): ILoadable<IMember>[] {
    return Object.values(state.entities);
  }

  @Selector()
  static selectMemberByEmail(email: string) {
    return createSelector([MemberState], (state): ILoadable<IMember> => {
      return state.memberState.entities?.[email];
    });
  }

  @Action(Member.getMemberByEmail)
  getDataFromState(
    ctx: StateContext<MemberStateModel>,
    action: { email: string }
  ) {
    const state = ctx.getState();

    // check if user has been loaded
    const userStatus = state.entities[action.email]?.status;

    if (
      !action.email &&
      (userStatus === LoadableStatus.Loaded ||
        userStatus === LoadableStatus.Loading)
    ) {
      return state;
    }

    ctx.setState(
      updateEntity({
        status: LoadableStatus.Loading,
        message: '',
        value: {
          ...defaultMemberValue,
          email: action.email,
        },
      })
    );
    return this.memberService.getUserByEmail(action.email).pipe(
      tap((member) => {
        ctx.setState(
          updateEntity({
            status: LoadableStatus.Loaded,
            message: '',
            value: member,
          })
        );
      }),
      catchError(() => {
        return of(
          ctx.setState(
            updateEntity({
              status: LoadableStatus.Error,
              message: `Error occurred while loading ${action.email}`,
              value: null,
            })
          )
        );
      })
    );
  }
}

function updateEntity(
  entity: ILoadable<IMember>
): StateOperator<MemberStateModel> {
  return patch<MemberStateModel>({
    entities: patch({ [entity.value?.email!]: entity }),
  });
}
