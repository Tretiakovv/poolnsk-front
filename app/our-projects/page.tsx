"use client"

import {useOurProjectsPage} from "@/app/our-projects/page.hooks";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import {ourProjectsTableHeaders} from "@/data/ourProjectsPageData";
import dynamic from "next/dynamic";
import Loading from "@/components/atoms/loading/Loading";
import InfoActionPopup from "@/components/organisms/popups/info-action-popup/InfoActionPopup";
import React from "react";
import {useToggle} from "@/utils/hooks/useToggle";
import ErrorSnackbar from "@/components/moleculas/snackbars/error-snackbar/ErrorSnackbar";
import SuccessSnackbar from "@/components/moleculas/snackbars/success-back-snackbar/SuccessSnackbar";

const Table = dynamic(
    () => import("@/components/organisms/table/Table"),
    {loading: () => <Loading/>})

const OutProjectsPage = () => {

    const {...context} = useOurProjectsPage()
    const {...snackbarToggle} = useToggle(false)

    if (context.getProjectsQuery.isSuccess) {
        return (
            <>
                <SuccessSnackbar
                    message={"Порядок элементов успешно изменен"}
                    isOpen={context.orderState === "success"}
                    onClose={() => context.changeOrderState("idle")}
                    hasBackIcon={false}
                />
                <ErrorSnackbar
                    message={"Возникла ошибка при изменении порядка элементов. Попробуйте снова."}
                    isOpen={context.orderState === "error"}
                    onClose={() => context.changeOrderState("idle")}
                />
                {
                    context.itemToDelete && <InfoActionPopup
                        header={"Удаление работы"}
                        message={"Вы уверены, что хотите удалить работу? Это действие нельзя отменить."}
                        buttonText={"Удалить работу"}
                        onClose={() => context.setItemToDelete(undefined)}
                        action={context.handleDeleteItem}
                        snackbarProps={{
                            isOpen: snackbarToggle.state,
                            onClose: snackbarToggle.toggleState,
                            message: "Возникла ошибка при создании работы. Попробуйте снова."
                        }}
                    />
                }
                <HeaderRow
                    header={"Наши работы"}
                    rightContent={
                        <Button
                            buttonText={"Изменить порядок"}
                            onClick={context.handleChangeOrder}
                        />
                    }
                />
                <div className={"flex flex-col gap-5"}>
                    <Table
                        draggable
                        handleDragEnd={context.handleDragEnd}
                        tableHeader={ourProjectsTableHeaders}
                        tableContent={context.sortableProjects}
                        editableProps={{
                            onDelete: context.setItemToDelete,
                            onEdit: () => console.log("IN PROCESS..")
                        }}
                        classNames={{text: "w-[330px]"}}
                    />
                    <Button
                        buttonText={"Добавить"}
                        onClick={context.handleAddProject}
                    />
                </div>
            </>
        );
    }

};

export default OutProjectsPage;
