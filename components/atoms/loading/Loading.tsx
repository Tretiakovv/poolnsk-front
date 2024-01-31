import React from 'react';
import {CircularProgress} from "@mui/joy";
import Text from "@/components/atoms/text/Text";

const Loading = () => {
    return (
        <div className={"w-full h-screen flex flex-col gap-5 justify-center items-center"}>
            <CircularProgress size={"md"} />
            <Text text={"Данные загружаются.."} className={"text-second-gray"}/>
        </div>
    )
}

export default Loading;
