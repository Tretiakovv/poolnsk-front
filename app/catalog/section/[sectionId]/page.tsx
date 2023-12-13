"use client"

import React from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useCategoriesPage} from "@/app/catalog/section/[sectionId]/page.hooks";
import HelperHintRow from "@/components/moleculas/rows/helper-hint-row/HelperHintRow";
import {categoryItems} from "@/data/catalogSectionHelperData";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import SortableListWrapper from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper";
import CatalogCategoryRow from "@/components/organisms/rows/catalog-category-row/CatalogCategoryRow";
import Button from "@/components/atoms/buttons/button/Button";

const CatalogCategoriesPage = ({params}: {
    params: {
        sectionId: number
    }
}) => {

    const {
        sortableItems, handleAddCategory,
        handleDeleteClick, handleEditClick, handleItemClick
    } = useCategoriesPage(params.sectionId)

    return (
        <>
            <HeaderRow
                backIcon
                header={"Категории для раздела «Бассейны»"}
            />
            <HelperHintRow items={categoryItems}/>
            <SortableListWrapper items={sortableItems}>
                {
                    sortableItems.map((item, index) => (
                        <SortableWrapper
                            onClick={() => handleItemClick(item.id)}
                            id={item.orderId ?? index}
                        >
                            <CatalogCategoryRow
                                onDelete={() => handleDeleteClick(item.id)}
                                onEdit={() => handleEditClick(item.id)}
                                key={item.orderId}
                                category={item}
                            />
                        </SortableWrapper>
                    ))
                }
            </SortableListWrapper>
            <Button
                className={"mt-[30px]"}
                buttonText={"Добавить категорию"}
                onClick={handleAddCategory}
            />
        </>
    );

};

export default CatalogCategoriesPage;
