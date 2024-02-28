import {useState} from "react";

export const useToggle = (defaultState : boolean = false) => {

    const [state, setState] = useState<boolean>(defaultState)
    const toggleState = () => setState(!state)

    return {state, toggleState}

}