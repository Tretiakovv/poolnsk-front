"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import HelperHintRow from "@/components/moleculas/rows/helper-hint-row/HelperHintRow";
import {productItems} from "@/data/catalogSectionHelperData";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import Button from "@/components/atoms/buttons/button/Button";
import {useCatalogProductsPage} from "@/app/catalog/section/[sectionId]/category/[categoryId]/page.hooks";
import CatalogProductRow from "@/components/organisms/rows/catalog-product-row/CatalogProductRow";
import React from "react";
import InfoActionPopup from "@/components/organisms/popups/info-action-popup/InfoActionPopup";
import dynamic from "next/dynamic";
import Loading from "@/components/atoms/loading/Loading";

const SortableListWrapper = dynamic(
    () => import("@/components/wrappers/sortable-list-wrapper/SortableListWrapper"),
    {loading: () => <Loading/>}
)

const CatalogProductsPage = ({params}: {
    params: {
        sectionId: number,
        categoryId: number
    }
}) => {

    const {
        sortableItems, handleDeleteClick,
        handleEditClick, handleAddProduct, getProductsQuery, ...context
    } = useCatalogProductsPage(params.sectionId, params.categoryId)

    if (getProductsQuery.isSuccess && context.getCategoriesQuery.isSuccess) return (
        <>
            {
                context.itemToDelete && <InfoActionPopup
                    header={"Удаление продукта"}
                    message={"Вы уверены, что хотите удалить продукт? Это действие нельзя отменить."}
                    buttonText={"Удалить продукт"}
                    onClose={() => context.setItemToDelete(undefined)}
                    action={handleDeleteClick}
                />
            }
            <HeaderRow
                backIcon
                header={`Товары категории "${context.categoryName}"`}
                rightContent={
                    <Button
                        buttonText={"Изменить порядок"}
                        onClick={context.handleChangeOrder}
                    />
                }
            />
            <HelperHintRow items={productItems}/>
            <SortableListWrapper onDragEnd={context.handleDragEnd} items={sortableItems}>
                {
                    sortableItems.map((item, index) => (
                        <SortableWrapper key={item.orderId} id={item.orderId ?? index}>
                            <CatalogProductRow
                                onEdit={context.handleEditItem}
                                onDelete={context.setItemToDelete}
                                key={item.orderId}
                                product={item}
                            />
                        </SortableWrapper>
                    ))
                }
            </SortableListWrapper>
            <Button
                className={"mt-[30px]"}
                buttonText={"Добавить продукт"}
                onClick={handleAddProduct}
            />
        </>
    );

};

export default CatalogProductsPage;
