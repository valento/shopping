import React from 'react'

const MannHelp = ({lan}) => {
  const state = {
    lan: {
      es: ['Toque el Mannequin en pantalla o Seleccione del Menu Principal la parte del cuerpo para vestir \
         El Mannequin esta dividido en cinco(5), patres',
         'Seleccione filtro! Un vestuario biene en capas: ej. PIEL = piecas pegadas a la piel del cuerpo',
         'Cambia piezas con las flechas - despues de acabar las opciones el programa comienza con \
         la primera pieza',
         'Toque la Casita para selecccionar otra parte parte',
         'Repite!',
         'Al canzarse - "Guarda" el resultado o...',
         'O simple descanse',
         'Como manejar el Mannequin?:'
       ],
      en: ['Just Tap over the body ...or Choose body part from Main Mannequin Menu: head, corp, \
        waist, legs or feet',
        'Choose a layer to dress up from submenu - dressing comes in layers. e.g. SKIN-layer represents \
        clothing just over the skin',
        'Switch clothing by pressing the arrows. After the last piece it starts again',
        'Tap "Home" to select another part of the body',
        'Repeat!',
        'Rest! You can save your result by tapping "Save". Your Mannequins will be \
        stored on our data base if you like to',
        'How it works?:'
      ]
    }
  }
    return (
      <div className='helper'>
        <h1>{state.lan[lan][6]}</h1>
        <ul>
          <li>{state.lan[lan][0]}</li>
          <li>{state.lan[lan][1]}</li>
          <li>{state.lan[lan][2]}</li>
          <li>{state.lan[lan][3]}</li>
          <li>{state.lan[lan][4]}</li>
          <li>{state.lan[lan][5]}</li>
        </ul>
      </div>
    )
}

export default MannHelp
