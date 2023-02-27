import { Spinner } from "theme-ui";


export default {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Ubuntu Mono, monospace',
    info: 'Poiret One, cursive',
    emoji: 'Noto Color Emoji, sans-serif'
  },
  colors: {
    text: '#000',
    background: '#eff7f6',
    primary: '#A2D2FF',
    primaryBackground: '#a2d2ff7a',
    secondary: '#CDB4DB',
    secondaryText: '#cdb4dbbd',
    // secondaryText: '#cdb4db96',
    accent: '#FFC8DD',
    accentText: "#ffc8ddd9",
    highlight: '#BDE0FE',
    muted: '#D3D3D3',
    red: '#FF595E',
    yellow: '#FFCA3A',
    green: '#8AC926',
    blue: '#1982C4',
    purple: '#6A4C93'
  },
  text:{
    default: {
      color: 'text',
      fontSize: 3
    },
    heading: {
      fontFamily: 'heading',
      display: 'block',
      color: 'accent',
      fontSize: 4,
      textDecoration: 'underline'
    },
    cardHeading: {
      fontFamily: 'heading',
      color: 'background',
      fontSize: 4,
      display: 'block',
      textDecoration: 'underline',
      textAlign: 'center',
      my: 3
    },
    validationError: {
      color: 'red',
      fontSize: 1
    },
    messageError: {
      color: 'red',
      fontSize: 2,
      m:2
    },
    link: {
      color: 'secondary'
    },
    emoji: {
      fontFamily: 'emoji'
    } 
  },
  borderWidths: {
    thin: '0.0625em',
    normal: '0.125em',
    thick: '0.1875em'
  },
  radii: {
    small: '0.25em',
    normal: '0.5em',
    large: '0.75em'
  },
  forms: {
    label: {
      fontSize: 3,
      fontWeight: 'bold',
      my: 1,
      textDecoration: 'underline',
    },
  },
  buttons: {
    primary: {
      color: 'background',
      bg: 'secondary',
      my: 3,
      p: 2,
      '&:hover' : {
        bg: 'accent'
      }
    },
    submit: {
      color: 'background',
      bg: 'secondary',
      my: 3,
      p: 2,
      '&:hover' : {
        bg: 'accent'
      }
    },
    
  },
  sizes: ['10%', '20%','30%','40%','50%','60%','70%','80%','90%','100%'],
  fontSizes: ['0.5em', '0.75em', '1em', '1.125em', '2em', '4em', '8em'],
}