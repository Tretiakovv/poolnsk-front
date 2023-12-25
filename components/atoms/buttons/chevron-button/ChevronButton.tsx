import React from 'react';
import {FiChevronDown, FiChevronUp} from "react-icons/fi";

const ChevronButton = ({isExpanded, setExpanded} : {
    isExpanded : boolean,
    setExpanded : (isExpanded : boolean) => void
}) => {
    return (
        <>
            {
                isExpanded ? <FiChevronUp
                    size={"22px"}
                    className={"stroke-second-gray hover:cursor-pointer"}
                    onClick={() => setExpanded(!isExpanded)}
                /> : <FiChevronDown
                    size={"22px"}
                    className={"stroke-second-gray hover:cursor-pointer"}
                    onClick={() => setExpanded(!isExpanded)}
                />
            }
        </>
    );
};

export default ChevronButton;
