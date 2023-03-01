const createQuestionStatement = (type, flag) => {
    switch(type) {
        case "NAME": case 0: 
            return `What is the name in English for ${flag}?`
            break;
        case "NATIVE": case 1:
            return `What is the native name of ${flag}?`
             break;
        case "CONTIENT": case 0:
            return `Which continent does ${flag} lie on?`
             break;
        case "STATES": case 3:
        return `Which of the following are states or provinces of ${flag}? Select all that apply.`
        break;
        case "CAPITAL": case 4:
        return `What's the name of the capital of ${flag}?`
            break;
        case "LANGUAGES": case 5:
            return `Which of the following are languages primarly spoken in ${flag}? Select all that apply.`
            break;
        case "CURRENCY": case 6:
            return `What currency is used in ${flag}?`
            break;
        case "PHONE_CODE": case 7:
            return `What phone code do phone numbers from ${flag} use?`
            break;
        default:
            return ""
    }
}