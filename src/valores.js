currentUser: {
  name: 'Jose Luis',
  lastName: 'Navarrete Del Rosario',
  birthDate: '1995-08-25',
  email: 'josenavarretedr@gmail.com',
  cellphone: '921492993',
  wsp: true,
  adress: 'lorem 20 lorem 20 lorem 20 lorem 20',
  courses: ['LIDES12','TXT2']
}

let course = {
  fullName: '',
  shortName: '',
  edition: 12,
  id: 'fullName+edition'
  banner: '',
  description: '',
  link: '',
}


allCourses: [
  {
    fullName: 'Programa de Liderazgo Estratégico para el Desarrollo',
    id:'LIDES12',
    shortName: 'LIDES',
    edition: 12,
    banner: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, nesciunt!',
    link: 'https://www.google.com/',
    sessions:[
      {
        name:'S1-LIDES',
        description:'description-LIDES-1',
        id:'1',
        link:'https://www.google.com/',
        homework: false
      },
      {
        name:'S2-LIDES',
        description:'description-LIDES-2',
        id:'2',
        link:'https://www.twitter.com/',
        homework: true
      }
    ]
  },
  {
    fullName: 'Programa de Comunicación Estratégica para el Desarrollo',
    id:'PCOM10',
    shortName: 'PCOM',
    edition: 10,
    banner: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, nesciunt!',
    link: 'https://www.google.com/',
    sessions:[
      {
        name:'S1-PCOM',
        description:'description-PCOM-1',
        id:'1',
        link:'https://www.google.com/'
      }
    ]
  },
  {
    fullName: 'Programa de Train the Trainers',
    id:'TXT2',
    shortName: 'TxT',
    edition: 2,
    banner: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, nesciunt!',
    link: 'https://www.google.com/',
    sessions:[
      {
        name:'S1-TXT',
        description:'description-TXT-1',
        id:'1',
        link:'https://www.google.com/'
      },
      {
        name:'S2-TXT',
        description:'description-TXT-2',
        id:'2',
        link:'https://www.google.com/'
      },
      {
        name:'S3-TXT',
        description:'description-TXT-3',
        id:'3',
        link:'https://www.google.com/'
      }
    ]
  },
  {
    fullName: 'Programa de Gestión Pública por Resultados',
    id:'PGP6',
    shortName: 'PGP',
    edition: 6,
    banner: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, nesciunt!',
    link: 'https://www.google.com/'
  }
]

/* 
https://campusvirtual.aulavirtualusmp.pe/mdlchiclayo/course/view.php?id=633
https://campusvirtual.aulavirtualusmp.pe/mdlchiclayo/mod/assign/view.php?id=40791
https://campusvirtual.aulavirtualusmp.pe/mdlchiclayo/mod/assign/view.php?id=40791&action=editsubmission

https://campusvirtual.aulavirtualusmp.pe/mdlchiclayo/grade/report/user/index.php?id=633&nomformat=unidad
*/