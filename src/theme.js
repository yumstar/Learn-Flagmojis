import { Spinner } from "theme-ui";


export default {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Ubuntu Mono, monospace',
    info: 'Poiret One, cursive'
  },
  colors: {
    text: '#000',
    background: '#eff7f6',
    primary: '#A2D2FF',
    secondary: '#CDB4DB',
    accent: '#FFC8DD',
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
      color: 'accent',
      fontSize: 4,
      textDecoration: 'underline'
    },
    error: {
      color: 'red',
      fontSize: 1
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