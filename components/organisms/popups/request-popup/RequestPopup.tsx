import React from 'react';
import PopupWrapper from "@/components/organisms/popups/PopupWrapper";
import Text from "@/components/atoms/text/Text";
import {FiX} from "react-icons/fi";
import Button from "@/components/atoms/buttons/button/Button";
import {cn} from "@/utils/cn";
import {useStore} from "@/store/store";
import {ClassValue} from "clsx";
import {useTableRow} from "@/components/organisms/table/talbe-item/TableRow.hooks";

const RequestPopup = ({type, reqId, onClose}: {
    type ?: "call" | "question" | "service",
    onClose: () => void,
    reqId: number
}) => {

    const context = useTableRow(type, reqId)

    const notProcessButtonCV: ClassValue[] = [
        "bg-indicator-green-light hover:bg-indicator-text-green",
        "hover:text-main-white transition hover:duration-200 text-indicator-text-green"
    ]

    const processButtonCV: ClassValue[] = [
        "bg-second-light-blue text-main-black hover:bg-main-black",
        "hover:text-main-white transition hover:duration-200"
    ]

    const requests = useStore(state => state.requests)
    const curReq = requests.find(req => req.id === reqId)!!

    const headerData = [curReq.name, curReq.phoneNumber, curReq.creationDate]

    return (
        <PopupWrapper>
            <section className={"w-[60vw] flex flex-col p-7 gap-7 bg-main-white rounded-xl"}>

                <section
                    className={"w-full flex flex-row items-center justify-between border-b-2 border-second-border-gray pb-7"}>
                    <div className={"flex flex-row items-center gap-3"}>
                        {headerData.map((headerItem, key, items) =>
                            <React.Fragment>
                                {headerItem && <Text text={headerItem} className={"text-second-gray"}/>}
                                {key !== items.length - 1 && headerItem &&
                                    <div className={"w-1 h-1 rounded-full bg-second-gray"}/>}
                            </React.Fragment>
                        )}
                    </div>
                    <FiX size={"22px"} onClick={onClose} className={"cursor-pointer"}/>
                </section>

                <Text
                    text={curReq.message}
                    className={"border-b-2 border-second-border-gray pb-7"}
                />

                {
                    curReq.isProcessed ?
                        <Button
                            className={cn(processButtonCV)}
                            buttonText={"Вернуть в обработку"}
                            onClick={context.handleNotProcessClick}
                        /> :
                        <Button
                            className={cn(notProcessButtonCV)}
                            buttonText={"Обработать"}
                            onClick={context.handleProcessClick}
                        />
                }

            </section>
        </PopupWrapper>
    );


};

export default RequestPopup;
