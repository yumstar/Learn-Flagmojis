import { object } from "joi"

export const countryAttributeSplitter = (country) => {
    let attributeEntries = Object.entries(country)
    var attributeList = []
    for (var [key, value] of attributeEntries) {
        var attribute  = {}
        switch(key){
            case 'emoji':
            case 'name':
            case 'native':
            case 'capital':
            case 'currency':
            case 'phone':
                attribute["name"] = key
                attribute["value"] = value
                attributeList.push(attribute)
                break;
            case "continent":
                attribute["name"] = key
                attribute["value"] = value.name
                attributeList.push(attribute)
                break;
            case "states":
            case "languages":
                let valueList = value.map((val) => {return val.name})
                attribute["name"] = key
                attribute["value"] = valueList
                attributeList.push(attribute)
            default:
                break;
        }
    }
    return attributeList
}