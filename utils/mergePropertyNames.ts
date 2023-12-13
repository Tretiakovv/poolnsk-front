import {CategoryProperty} from "@/types/dto/Category";

export const mergePropertyNames = (properties : CategoryProperty[]) => {
    return properties.reduce((acc, property, index) => {
        const mergedString = acc.concat(property.name)
        return index !== properties.length - 1 ? mergedString.concat(", ") : mergedString
    }, "")
}