export const AuthFormOuterStyles = {
    fontFamily: 'body',
    fontSize: 3,
    display: 'flex',
    justifyContent: 'center',
    // border: '1px solid black'
}
export const AuthFormContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
}
export const AuthFormStyles = {
    width: '20em'
}
export const fieldStyles = {
    padding: 2,
    bg: 'muted',
    display: 'block',
    width: '20em',
    '&:focus': {
        bg: 'primary',
        borderColor: 'highlight',
        boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
        outline: 'none',
    }
}

export const errorStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxWidth: '',
}

export const messageStyles = {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    alignContent: 'center',
    border: '1px solid black',
    borderRadius: 'small',
    borderWidth: 'normal',
    borderStyle: 'solid',
}