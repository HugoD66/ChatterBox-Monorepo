import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const openCloseFriendProfilAnimation = trigger('openCloseFriendProfil', [
  state(
    'open',
    style({
      height: '25vh',
      opacity: 1,
    }),
  ),
  state(
    'closed',
    style({
      height: '0px',
      opacity: 0,
      //filter: 'blur(50px)',
    }),
  ),
  transition('open => closed', [animate('0.3s ease-in')]),
  transition('closed => open', [animate('0.3s ease-in')]),
]);

export const openCloseFriendSearchAnimation = trigger('openCloseFriendSearch', [
  state(
    'open',
    style({
      height: '90vh',
      opacity: 1,
    }),
  ),
  state(
    'closed',
    style({
      height: '66vh',
      opacity: 1,
    }),
  ),
  transition('open => closed', [animate('0.3s ease-in')]),
  transition('closed => open', [animate('0.3s ease-in')]),
]);

export const openCloseFriendPrivateRoomAnimation = trigger('openCloseFriend', [
  state(
    'open',
    style({
      height: '90vh',
      opacity: 1,
    }),
  ),
  state(
    'closed',
    style({
      height: '100vh',
      opacity: 1,
    }),
  ),
  transition('open => closed', [animate('0.3s ease-in')]),
  transition('closed => open', [animate('0.3s ease-in')]),
]);

export enum TransitionSwitchUserEnum {
  CHANGESTART = 'changeStart',
  CHANGETRANSITION = 'changeTransition',
  CHANGEFINAL = 'changeFinal',
}
export const transitionBetweenUsersAnimation = trigger(
  'transitionBetweenUsers',
  [
    state(
      'changeStart',
      style({
        opacity: 0.8,
        filter: 'blur(2px)',
      }),
    ),
    state(
      'changeFinal',
      style({
        opacity: 1,
        filter: 'blur(0px)',
      }),
    ),
    transition('changeStart => changeFinal', [animate('0.1s ease-in')]),
    //Test 3 states
    /* state(
    'changeTransition',
    style({
      opacity: 0.9,
      filter: 'blur(1px)',
    }),
    ),*/
    //transition('changeStart => changeTransition', [animate('0.05s ease-in')]),
    //transition('changeTransition => changeFinal', [animate('0.1s ease-in')]),
  ],
);
