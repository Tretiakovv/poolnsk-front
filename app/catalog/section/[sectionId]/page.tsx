"use client"

import React from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import {useCategoriesPage} from "@/app/catalog/section/[sectionId]/page.hooks";
import HelperHintRow from "@/components/moleculas/rows/helper-hint-row/HelperHintRow";
import {categoryItems} from "@/data/catalogSectionHelperData";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import SortableListWrapper from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper";
import CatalogCategoryRow from "@/components/organisms/catalog-category-row/CatalogCategoryRow";

const CatalogCategoriesPage = ({params} : {
    params : {
        sectionId : number
    }
}) => {

    const {
        sortableItems,
        handleClosePage
    } = useCategoriesPage(params.sectionId)

    return (
        <>
            <HeaderRow
                header={"Категории для раздела «Бассейны»"}
                rightContent={
                    <FiX
                        size={"22px"}
                        className={"hover:cursor-pointer stroke-main-black"}
                        onClick={handleClosePage}
                    />
                }
            />
            <HelperHintRow items={categoryItems} />
            <SortableListWrapper items={sortableItems}>
                {
                    sortableItems.map((item, index) => (
                        <SortableWrapper id={item.orderId ?? index}>
                            <CatalogCategoryRow
                                key={item.orderId}
                                category={item}
                            />
                        </SortableWrapper>
                    ))
                }
            </SortableListWrapper>
        </>
    );

};

export default CatalogCategoriesPage;
