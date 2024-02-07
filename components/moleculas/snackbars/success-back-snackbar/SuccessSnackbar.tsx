import React from 'react';
import {FiArrowRight} from "react-icons/fi";
import Snackbar from "@mui/joy/Snackbar";
import {useRouter} from "next/navigation";
import {SnackbarProps} from "@/types/components/SnackbarProps";

type SuccessSnackbarProps = {hasBackIcon ?: boolean} & SnackbarProps

const SuccessSnackbar = ({hasBackIcon = true, ...props} : SuccessSnackbarProps) => {

    const router = useRouter()

    return (
        <Snackbar
            variant={"soft"}
            color={"success"}
            size={"lg"}
            onClose={props.onClose}
            open={props.isOpen}
            endDecorator={ hasBackIcon &&
                <FiArrowRight
                    className={"hoverable stroke-indicator-text-green hover:stroke-green-800"}
                    onClick={() => router.back()}
                    size={"20px"}
                />
            }
        >
            {props.message}
        </Snackbar>
    );
};

export default SuccessSnackbar;
