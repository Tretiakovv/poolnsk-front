import React from 'react';
import {SortableProps} from "@/types/components/SortableProps";
import {ProductShort} from "@/types/dto/Product";
import CatalogItemWrapper from "@/components/wrappers/catalog-item-wrapper/CatelogItemWrapper";
import {cn} from "@/utils/cn";
import Text from "@/components/atoms/text/Text";
import {ClassValue} from "clsx";

type CatalogProductRowProps = {
    product : ProductShort
} & SortableProps

const CatalogProductRow = ({product, ...props} : CatalogProductRowProps) => {

    const categoryItems: string[] = [
        product.name,
        product.price.toString().concat(" ₽")
    ]

    const textCV: ClassValue = "text-base text-main-black w-[350px]"

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

export default CatalogProductRow;
