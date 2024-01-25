import React from 'react';
import {SnackbarProps} from "@/types/components/SnackbarProps";
import Snackbar from "@mui/joy/Snackbar";
import {FiX} from "react-icons/fi";

const ErrorSnackbar = (props : SnackbarProps) => {
    return (
        <Snackbar
            variant={"soft"}
            color={"danger"}
            size={"lg"}
            onClose={props.onClose}
            open={props.isOpen}
            endDecorator={
                <FiX
                    size={"20px"}
                    className={"hoverable stroke-indicator-text-red hover:stroke-red-800"}
                    onClick={props.onClose}
                />
            }
        >
            {props.message}
        </Snackbar>
    );
};

export default ErrorSnackbar;
