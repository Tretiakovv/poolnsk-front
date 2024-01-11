"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import HelperHintRow from "@/components/moleculas/rows/helper-hint-row/HelperHintRow";
import {categoryItems, productItems} from "@/data/catalogSectionHelperData";
import SortableListWrapper from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import Button from "@/components/atoms/buttons/button/Button";
import {useCatalogProductsPage} from "@/app/catalog/section/[sectionId]/category/[categoryId]/page.hooks";
import CatalogProductRow from "@/components/organisms/rows/catalog-product-row/CatalogProductRow";
import {DraggableTableItem} from "@/types/TableTypes";
import React from "react";

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

    if (getProductsQuery.isLoading || context.getCategoriesQuery.isLoading) {
        return (
            <div>
                Page is loading..
            </div>
        )
    }

    if (getProductsQuery.isSuccess && context.getCategoriesQuery.isSuccess) return (
        <div>
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
        </div>
    );

};

export default CatalogProductsPage;
