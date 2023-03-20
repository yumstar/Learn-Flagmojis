export const QuizFormOuterStyles = {
    fontFamily: 'body',
    fontSize: 3,
    display: 'flex',
    flexDirection: 'row',
    inlineSize: 'max-content',
    alignItems: 'center',
    margin: 'auto',
    padding: 4,
    backgroundColor: 'background',
    // border: '1px solid black',
    borderRadius: 'normal',
    minHeight: '30vh',
    maxHeight: '60vh',
    height: '65em',
    borderColor: 'muted',
    borderStyle: 'solid',
    borderWidth: 'thin',
    boxShadow: ' 6px 1px 21px -7px rgba(130,130,130,0.81)'
}
export const QuizFormContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
}
export const QuizFormStyles = {
    width: '40em',
    maxWidth: '40em',
    minWidth: '20vw'
}
export const questionBoxStyles = {
    textAlign: 'center',
    py: 3,
    px: 5,
    borderRadius: 'normal'
    
}
export const questionOptionsBoxStyles = {
    mt: 3,
    mb: 3,
    // px: 2,
    py: 1,
    boxShadow: ' 6px 1px 21px -6px rgba(130,130,130,0.21)',
    borderRadius: 'normal',
    borderColor: 'highlight',
    borderStyle: 'solid',
    borderWidth: 'normal',

}

export const questionOptionBoxStyles = {
    my: 1,
    // boxShadow: ' 6px 1px 21px -6px rgba(130,130,130,0.21)',
    // backgroundColor: 'red',
    borderRadius: 'normal',
    // borderColor: 'highlight',
    // borderStyle: 'solid',
    borderWidth: 'normal',
}
export const questionOptionBoxCheckedStyles = {
    ...questionOptionBoxStyles,
    backgroundColor: 'secondaryBackground'
}
export const questionOptionStyles = {
    py: 3,
    // my: 3,
    px: 2,

    // border: '1px solid black', 
    borderRadius: 'thin',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    alignContent: 'center',

}


export const questionOptionFieldStyles = {
    mr: 3,
    width: '1em',
    transform: 'scale(1.5)',
    '&:checked': {
        bg: 'accentBackground',
        borderColor: 'accentBackground',
        boxShadow: t => `0 0 0 2px ${t.colors.accentBackground}`,
        outline: 'none',
    }
}

export const questionEmojiStyles = {
    mr: 3
}

export const questionTextStyles = {
    fontStyle: 'italic'
}


export const questionNavContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 9,
    // border: '1px solid black', 
    justifyContent: 'space-between'
}
export const questionNavButtons = {
    cursor: 'pointer'
}
export const questionNavIndex = {
    fontFamily: 'monospace'
}
export const messageStyles = {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    alignContent: 'center',
    // border: '1px solid black',
    borderRadius: 'small',
    borderWidth: 'normal',
    borderStyle: 'solid',
}

export const quizResultStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 3
}

export const quizResultPageStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
}

export const quizResultBoxStyles = {
    boxShadow: ' 6px 1px 21px -6px rgba(130,130,130,0.21)',
    borderRadius: 'normal',
    borderColor: 'highlight',
    borderStyle: 'solid',
    borderWidth: 'normal',
    p: 4,
    m: 1
}

export const quizResultSubmissionContainerStyles = {
    // margin: 'auto',
    borderRadius: 'normal',
    minHeight: '30vh',
    maxHeight: '40vh',
    height: '25em',
    width: '30em',
    maxWidth: '30em',
    minWidth: '20vw',
    borderColor: 'muted',
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderRadius: 'normal',
    boxShadow: '6px 1px 21px -7px rgba(130,130,130,0.81)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}