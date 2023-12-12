"use client"

import React, {useState} from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import Text from "@/components/atoms/text/Text";
import HelperHintRow from "@/components/moleculas/rows/helper-hint-row/HelperHintRow";
import {items} from "@/data/catalogSectionHelperData";
import SortableListWrapper from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper";
import {sectionData} from "@/mock/sectionData";
import {SortableItem} from "@/types/Sortable";
import CatalogSectionRow from "@/components/organisms/catalog-section-row/CatalogSectionRow";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";

const CatalogPage = () => {

    const [
        published,
        setPublished
    ] = useState<boolean>(true)

    const prepareSortableData = (data : Array<any>) : SortableItem<any>[] => {
        return data.map((item, index) => {
            return {orderId : index, item : item}
        })
    }

    const sortableItems = prepareSortableData(sectionData)

    return (
        <>
            <HeaderRow
                header={"Каталог"}
                rightContent={
                    <div className={"flex flex-row items-center gap-[20px]"}>
                        {
                            published && <Text
                                className={"text-right text-indicator-new text-[14px]"}
                                text={"Все изменения опубликованы"}
                            />
                        }
                        <Button
                            buttonText={"Опубликовать"}
                            onClick={() => setPublished(!published)}
                        />
                    </div>
                }
            />
            <HelperHintRow items={items} />
            <SortableListWrapper items={sortableItems}>
                {
                    sortableItems.map((item) => (
                        <SortableWrapper id={item.orderId}>
                            <CatalogSectionRow
                                key={item.orderId}
                                sortableSection={item}
                            />
                        </SortableWrapper>
                    ))
                }
            </SortableListWrapper>
        </>
    );
    
};

export default CatalogPage;
