import React from 'react';
import {FiChevronDown, FiChevronUp} from "react-icons/fi";

type ChevronButtonProps = {
    isExpanded: boolean,
    setExpanded: (isExpanded: boolean) => void
}

const ChevronButton = ({isExpanded, setExpanded}: ChevronButtonProps) => {
    return (
        <div onClick={() => setExpanded(!isExpanded)}>
            {
                isExpanded ? <FiChevronUp size={"20px"} className={"stroke-main-black"}/>
                    : <FiChevronDown size={"20px"} className={"stroke-main-black"}/>
            }
        </div>
    );
};

export default ChevronButton;
