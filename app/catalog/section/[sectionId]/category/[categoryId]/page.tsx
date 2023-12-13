"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import HelperHintRow from "@/components/moleculas/rows/helper-hint-row/HelperHintRow";
import {categoryItems} from "@/data/catalogSectionHelperData";
import SortableListWrapper from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import Button from "@/components/atoms/buttons/button/Button";
import {useCatalogProductsPage} from "@/app/catalog/section/[sectionId]/category/[categoryId]/page.hooks";
import CatalogProductRow from "@/components/organisms/rows/catalog-product-row/CatalogProductRow";

const CatalogProductsPage = ({params}: {
    params: {
        sectionId: number,
        categoryId: number
    }
}) => {

    const {
        sortableItems, handleDeleteClick,
        handleEditClick, handleAddProduct
    } = useCatalogProductsPage(params.sectionId, params.categoryId)

    return (
        <div>
            <HeaderRow
                backIcon
                header={"Товары категории «Композитные бассейны»"}
            />
            <HelperHintRow items={categoryItems}/>
            <SortableListWrapper items={sortableItems}>
                {
                    sortableItems.map((item, index) => (
                        <SortableWrapper id={item.orderId ?? index}>
                            <CatalogProductRow
                                onDelete={() => handleDeleteClick(item.id)}
                                onEdit={() => handleEditClick(item.id)}
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
