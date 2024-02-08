"use client"

import {useSalesPage} from "@/app/sales/page.hooks";
import Button from "@/components/atoms/buttons/button/Button";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {salesPageTableHeaders} from "@/data/salesPageData";
import dynamic from "next/dynamic";
import Loading from "@/components/atoms/loading/Loading";
import HelperHintRow from "@/components/moleculas/rows/helper-hint-row/HelperHintRow";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import React from "react";
import PromotionRow from "@/components/organisms/rows/promotion-row/PromotionRow";
import InfoActionPopup from "@/components/organisms/popups/info-action-popup/InfoActionPopup";
import ErrorSnackbar from "@/components/moleculas/snackbars/error-snackbar/ErrorSnackbar";
import {defaultSnackbarState} from "@/types/dto/APIResponseState";
import SuccessSnackbar from "@/components/moleculas/snackbars/success-back-snackbar/SuccessSnackbar";

const SortableListWrapper = dynamic(
    () => import("@/components/wrappers/sortable-list-wrapper/SortableListWrapper"),
    {loading: () => <Loading/>})

const SalesPage = () => {

    const {
        sortablePromotions, getPromotionsQuery,
        handleDragEnd, ...context
    } = useSalesPage()

    if (getPromotionsQuery.isSuccess) {
        return (
            <>
                <ErrorSnackbar
                    message={context.snackbar.snackbarState.message}
                    isOpen={context.snackbar.snackbarState.state === "error"}
                    onClose={() => context.snackbar.onChange(defaultSnackbarState)}
                />
                <SuccessSnackbar
                    hasBackIcon={false}
                    message={context.snackbar.snackbarState.message}
                    isOpen={context.snackbar.snackbarState.state === "success"}
                    onClose={() => context.snackbar.onChange(defaultSnackbarState)}
                />
                {
                    context.indexToDelete > 0 && <InfoActionPopup
                        header={"Удаление акции"}
                        message={"Вы уверены, что хотите удалить акцию? Это действие нельзя отменить."}
                        buttonText={"Удалить акцию"}
                        onClose={() => context.setIndexToDelete(-1)}
                        action={context.handleDeleteItem}
                        snackbarProps={{
                            isOpen: context.deleteToggle.state,
                            onClose: context.deleteToggle.toggleState,
                            message: "Возникла ошибка при удалении акции. Попробуйте еще раз"
                        }}
                    />
                }
                <HeaderRow
                    header={"Акции"}
                    rightContent={
                        <Button
                            buttonText={"Изменить порядок"}
                            onClick={context.handleChangeOrder}
                        />
                    }
                />
                <HelperHintRow draggable items={salesPageTableHeaders}/>
                <SortableListWrapper onDragEnd={handleDragEnd} items={sortablePromotions}>
                    {
                        sortablePromotions.map((sortablePromotion, index) => (
                            <SortableWrapper
                                id={sortablePromotion.orderId ?? index}
                                key={sortablePromotion.orderId}
                            >
                                <PromotionRow
                                    promotion={sortablePromotion.item}
                                    key={sortablePromotion.orderId}
                                    editableProps={{
                                        onDelete : context.setIndexToDelete,
                                        onEdit : (promotionId : number) => console.log(promotionId)
                                    }}
                                />
                            </SortableWrapper>
                        ))
                    }
                </SortableListWrapper>
                <Button
                    buttonText={"Добавить"}
                    onClick={context.handleAddPromotion}
                    className={"my-7"}
                />
            </>
        );
    }

};

export default SalesPage;
