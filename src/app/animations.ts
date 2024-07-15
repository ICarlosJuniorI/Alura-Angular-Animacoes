import {
  animate,
  group,
  keyframes,
  query,
  stagger,
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

export const filterTrigger = trigger('filterAnimation', [
  transition(':enter', [
    style({ opacity: 0, width: 0 }),
    animate(
      '400ms ease-out',
      /*
        Keyframes são conjuntos de estilos
        Offset define quando o estilo deve ser aplicado
      */
      keyframes([
        style({ offset: 0, opacity: 0, width: 0 }),
        style({
          offset: 0.8,
          opacity: 0.5,
          width: '*',
        }),
        style({
          offset: 1,
          opacity: 1,
          width: '*',
        }),
      ])
    ),
  ]),
  transition(':leave', [
    /*
      A função `cubic-bezier` define a forma da curva que será usada na animação,
      permitindo que controle a velocidade da animação em diferentes pontos da trajetória.
    */
    animate(
      '400ms cubic-bezier(.13, .9, .8, .1)',
      style({
        opacity: 0,
        width: 0,
      })
    ),
  ]),
]);

export const formButtonTrigger = trigger('formButton', [
  transition('invalid => valid', [
    /*
      Query consulta os elementos HTML que serão animados,
      neste caso vai alterar apenas o botão de salvar
    */
    query('#botao-salvar', [
      // Dentro do group ficam as animações que serão executadas ao mesmo tempo
      group([
        animate(
          200,
          style({
            backgroundColor: '#63b77c',
          })
        ),
        animate(
          100,
          style({
            transform: 'scale(1.1)',
          })
        ),
      ]),
      animate(
        200,
        style({
          transform: 'scale(1)',
        })
      ),
    ]),
  ]),
  transition('valid => invalid', [
    query('#botao-salvar', [
      group([
        animate(
          200,
          style({
            backgroundColor: '#6c757d',
          })
        ),
        animate(
          100,
          style({
            transform: 'scale(1.1)',
          })
        ),
      ]),
      animate(
        200,
        style({
          transform: 'scale(1)',
        })
      ),
    ]),
  ]),
]);

export const filterMessageTrigger = trigger('filterMessage', [
  transition(':enter', [
    // Estilo inicial
    style({
      width: '100%',
      transform: 'translateX(-100%)',
      opacity: 0,
    }),
    group([
      animate(
        // Duração de 0.3s, atraso de 0.1s, timing 'ease'
        '0.3s 0.1s ease',
        /*
          Move da posição original (-100%) para a posição final (0)
          e ajusta a largura para '*' que significa tamanho automático
        */
        style({
          transform: 'translateX(0)',
          width: '*',
        })
      ),
      animate(
        // Duração de 0.3s, timing 'ease'
        '0.3s ease',
        // Muda a opacidade para 1 fazendo com que o elemento apareça
        style({
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition(':leave', [
    /*
      Move o elemento para a direita em 100% usando a propriedade 'transform',
      e define sua opacidade para 0, fazendo com que ele desapareça
    */
    group([
      animate(
        '0.3s ease',
        style({
          transform: 'translateX(100%)',
          width: '*',
        })
      ),
      animate(
        '0.3s 0.2s ease',
        style({
          opacity: 0,
        })
      ),
    ]),
  ]),
]);

export const shakeTrigger = trigger('shakeAnimation', [
  transition('* => *', [
    query(
      'input.ng-invalid:focus, select.ng-invalid:focus',
      [
        animate(
          '0.5s',
          keyframes([
            style({ border: '2px solid red' }),
            style({ transform: 'translateX(-10px)' }),
            style({ transform: 'translateX(10px)' }),
            style({ transform: 'translateX(-10px)' }),
            style({ transform: 'translateX(10px)' }),
            style({ transform: 'translateX(-10px)' }),
            style({ transform: 'translateX(10px)' }),
            style({ transform: 'translateX(-10px)' }),
            style({ transform: 'translateX(0)' }),
          ])
        ),
      ],
      // A animação será aplicada apenas aos elementos que existam no momento da execução da animação
      { optional: true }
    ),
  ]),
]);

export const listStateTrigger = trigger('listState', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({
          opacity: 0,
          transform: 'translateX(-100%)',
        }),
        stagger(200, [
          animate(
            '500ms ease-out',
            keyframes([
              style({
                opacity: 1,
                transform: 'translateX(15%)',
                offset: 0.4,
              }),
              style({
                opacity: 1,
                transform: 'translateX(0)',
                offset: 1,
              }),
            ])
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
