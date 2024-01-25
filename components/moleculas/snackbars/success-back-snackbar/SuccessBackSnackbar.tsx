import React from 'react';
import {FiArrowRight} from "react-icons/fi";
import Snackbar from "@mui/joy/Snackbar";
import {useRouter} from "next/navigation";
import {SnackbarProps} from "@/types/components/SnackbarProps";

const SuccessBackSnackbar = (props : SnackbarProps) => {

    const router = useRouter()

    return (
        <Snackbar
            variant={"soft"}
            color={"success"}
            size={"lg"}
            onClose={props.onClose}
            open={props.isOpen}
            endDecorator={
                <FiArrowRight
                    size={"20px"}
                    className={"hoverable stroke-indicator-text-green hover:stroke-green-800"}
                    onClick={() => router.back()}
                />
            }
        >
            {props.message}
        </Snackbar>
    );
};

export default SuccessBackSnackbar;
