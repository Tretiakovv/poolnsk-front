import React, {useState} from 'react';
import {ClassValue} from "clsx";
import CatalogItemWrapper from "@/components/wrappers/catalog-item-wrapper/CatelogItemWrapper";
import Text from "@/components/atoms/text/Text";
import {cn} from "@/utils/cn";
import {TableItemProps} from "@/types/TableTypes";
import {useTableRow} from "@/components/organisms/table/talbe-item/TableRow.hooks";
import Button from "@/components/atoms/buttons/button/Button";
import DeleteEditRow from "@/components/moleculas/rows/delete-edit-row/DeleteEditRow";
import RequestPopup from "@/components/organisms/popups/request-popup/RequestPopup";

const TableRow = (props: TableItemProps) => {

    const textCV: ClassValue[] = [
        "text-base text-main-black w-[350px]",
        props.classNames?.text
    ]

    const notProcessButtonCV: ClassValue[] = [
        "bg-indicator-green-light hover:bg-indicator-text-green",
        "hover:text-main-white transition hover:duration-200 text-indicator-text-green"
    ]

    const processButtonCV: ClassValue[] = [
        "bg-second-light-blue text-main-black hover:bg-main-black",
        "hover:text-main-white transition hover:duration-200"
    ]

    const context = useTableRow(props.reqType, props.tableItem.id)

    const handleItemClick = () => props.onItemClick?.(props.tableItem.id)

    const handleDeleteClick = () => {
        if (props.editableProps?.onDelete) props.editableProps.onDelete(props.tableItem)
    }

    const [popupOpen, setPopupOpen] = useState<boolean>(false)
    const handleToggleState = () => setPopupOpen(!popupOpen)

    return (
        <>

            {
                popupOpen && <RequestPopup
                    type={props.reqType}
                    reqId={props.tableItem.id}
                    onClose={handleToggleState}
                />
            }

            <CatalogItemWrapper onClick={handleItemClick} {...props}>
                <div className={"relative w-full flex flex-row items-center justify-between"}>
                    <div className={"flex flex-row items-center gap-[20px]"}>
                        {
                            props.tableItem?.items?.map((item) => {
                                if (item && typeof item !== "string") {
                                    return (
                                        <div onClick={handleToggleState}>
                                            <Text
                                                text={"Открыть комментарий"}
                                                className={cn(textCV, "text-main-blue")}
                                            />
                                        </div>
                                    )
                                } else return <Text
                                    text={item as string ?? "—"}
                                    className={cn(textCV)}
                                />
                            })
                        }
                    </div>
                    {
                        props.item && props.item.isProcessed !== undefined && (
                            <>
                                {
                                    props.item.isProcessed ?
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
                            </>
                        )
                    }
                </div>
                {
                    props.editableProps && <DeleteEditRow
                        onDelete={handleDeleteClick}
                    />
                }
            </CatalogItemWrapper>

        </>
    );

};

export default TableRow;
