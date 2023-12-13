import React from 'react';
import {Category} from "@/types/dto/Category";
import {SortableProps} from "@/types/components/SortableProps";
import CatalogItemWrapper from "@/components/wrappers/catalog-item-wrapper/CatelogItemWrapper";
import Text from "@/components/atoms/text/Text";
import {mergePropertyNames} from "@/utils/mergePropertyNames";
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";

type CatalogCategoryRowProps = {
    category: Category
} & SortableProps

const CatalogCategoryRow = ({category, ...props}: CatalogCategoryRowProps) => {

    const mergedPropertyNames = mergePropertyNames(category.properties)
    const textCV: ClassValue = "text-base text-main-black w-[350px]"

    const categoryItems: string[] = [category.name, mergedPropertyNames !== "" ? mergedPropertyNames : "—"]

    return (
        <CatalogItemWrapper {...props}>
            <div className={"w-full flex flex-row items-center gap-[20px]"}>
                {
                    categoryItems.map((item) => (
                        <Text text={item} className={cn(textCV)}/>
                    ))
                }
            </div>
        </CatalogItemWrapper>
    );

};

export default CatalogCategoryRow;
