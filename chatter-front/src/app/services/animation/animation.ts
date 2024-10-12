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
  transition('open => closed', [animate('1s ease-in')]),
  transition('closed => open', [animate('1s ease-in')]),
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
  transition('open => closed', [animate('1s ease-in')]),
  transition('closed => open', [animate('1s ease-in')]),
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
  transition('open => closed', [animate('1s ease-in')]),
  transition('closed => open', [animate('1s ease-in')]),
]);

export const transitionBetweenUsersAnimation = trigger(
  'transitionBetweenUsers',
  [
    state(
      'changeStart',
      style({
        opacity: 1,
        filter: 'blur(0px)',
      }),
    ),
    state(
      'changeTransition',
      style({
        opacity: 1,
        filter: 'blur(3px)',
      }),
    ),
    state(
      'changeFinal',
      style({
        opacity: 1,
        filter: 'blur(0px)',
      }),
    ),
    transition('changeStart => changeTransition', [animate('0.1s ease-in')]),
    transition('changeTransition => changeFinal', [animate('0.1s ease-in')]),
  ],
);
/*
*
*  animations: [
    trigger('transitionBetweenUsers', [
      state(
        'changeStart',
        style({
          filter: 'blur(0px)',
          opacity: 1,
        }),
      ),
      state(
        'changeFinal',
        style({
          filter: 'blur(0px)',
          opacity: 1,
        }),
      ),
      transition('changeStart => changeTransition', [
        animate(
          '0.5s',
          style({
            filter: 'blur(10px)',
            opacity: 0.5,
          }),
        ),
      ]),
      transition('changeTransition => changeFinal', [
        animate(
          '0.5s',
          style({
            filter: 'blur(0px)',
            opacity: 1,
          }),
        ),
      ]),
    ]),
  ],
  * */
