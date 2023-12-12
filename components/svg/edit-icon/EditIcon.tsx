import React from 'react';
import {SVG} from "@/types/svg";

const EditIcon = (props: SVG) => {
    return (
        <svg {...props} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="34" height="34" rx="4" fill="#F2F2F2"/>
            <path
                d="M16.1641 10.4336H10.3307C9.8887 10.4336 9.46478 10.6092 9.15222 10.9217C8.83966 11.2343 8.66406 11.6582 8.66406 12.1003V23.7669C8.66406 24.209 8.83966 24.6329 9.15222 24.9454C9.46478 25.258 9.8887 25.4336 10.3307 25.4336H21.9974C22.4394 25.4336 22.8633 25.258 23.1759 24.9454C23.4885 24.6329 23.6641 24.209 23.6641 23.7669V17.9336"
                stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M22.4141 9.18378C22.7456 8.85226 23.1952 8.66602 23.6641 8.66602C24.1329 8.66602 24.5825 8.85226 24.9141 9.18378C25.2456 9.5153 25.4318 9.96494 25.4318 10.4338C25.4318 10.9026 25.2456 11.3523 24.9141 11.6838L16.9974 19.6004L13.6641 20.4338L14.4974 17.1004L22.4141 9.18378Z"
                stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
};

export default EditIcon;
