import React from 'react';
import {SVG} from "@/types/svg";

const DeleteIcon = (props : SVG) => {
    return (
        <svg {...props} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="34" height="34" rx="4" fill="#FFF2F2"/>
            <path d="M9.5 12H11.1667H24.5" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path
                d="M22.8307 11.9993V23.666C22.8307 24.108 22.6551 24.532 22.3426 24.8445C22.03 25.1571 21.6061 25.3327 21.1641 25.3327H12.8307C12.3887 25.3327 11.9648 25.1571 11.6522 24.8445C11.3397 24.532 11.1641 24.108 11.1641 23.666V11.9993M13.6641 11.9993V10.3327C13.6641 9.89065 13.8397 9.46673 14.1522 9.15417C14.4648 8.84161 14.8887 8.66602 15.3307 8.66602H18.6641C19.1061 8.66602 19.53 8.84161 19.8426 9.15417C20.1551 9.46673 20.3307 9.89065 20.3307 10.3327V11.9993"
                stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.3359 16.166V21.166" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M18.6641 16.166V21.166" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};

export default DeleteIcon;
