import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const highlightedStateTrigger = trigger('highlightedState', [
  state(
    'default', // Estado inicial
    style({ border: '2px solid #b2b6ff' })
  ),
  state(
    'highlighted', // Estado final
    style({ border: '4px solid #b2b6ff' })
  ),
  // Transição do estado 'default' para o 'highlighted'
  transition('default => highlighted', [
    animate(
      '200ms ease-out',
      style({
        transform: 'scale(1.02)',
      })
    ),
    animate(200), // Duração da animação
  ]),
]);

export const shownStateTrigger = trigger('shownState', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(300, style({ opacity: 1 })),
  ]),
  transition(':leave', [animate(300, style({ opacity: 0 }))]),
]);

export const checkButtonTrigger = trigger('checkButton', [
  transition('* => checked', [
    animate(
      '400ms ease-in',
      style({
        transform: 'scale(0.4)',
      })
    ),
  ]),
]);
