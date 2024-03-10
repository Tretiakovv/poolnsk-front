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
            {
                context.categoryToEdit !== 0 && <InfoActionPopup
                    header={"Редактирование категории"}
                    message={"Изменённое название категории увидят все пользователи сайта"}
                    buttonText={"Подтвердить изменения"}
                    onClose={() => context.selectCategoryToEdit(0)}
                    onChangeName={context.handleChangeName}
                />
            }
            <HeaderRow
                backIcon
                header={`Товары категории "${context.categoryName}"`}
                rightContent={
                <div className={"flex flex-row items-center gap-4"}>
                    <Button
                        buttonText={"Изменить порядок"}
                        onClick={context.handleChangeOrder}
                    />
                    <Button
                        className={"bg-second-light-blue text-black hover:text-white"}
                        buttonText={"Изменить название"}
                        onClick={() => context.selectCategoryToEdit(params.categoryId)}
                    />
                </div>
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
