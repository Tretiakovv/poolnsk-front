import React from 'react';
import CatalogItemWrapper from "@/components/wrappers/catalog-item-wrapper/CatelogItemWrapper";
import {DraggableTableItem} from "@/types/TableTypes";
import {SortableProps} from "@/types/components/SortableProps";
import Text from "@/components/atoms/text/Text";

type CategoryCharacteristicRowProps = {
    characteristic : DraggableTableItem,
    rightContent?: React.ReactNode
} & SortableProps

const CategoryCharacteristicRow = (props : CategoryCharacteristicRowProps) => {

    return (
        <CatalogItemWrapper draggable {...props}>
            <div className={"w-full flex flex-row items-center gap-[20px]"}>
                {
                    props.characteristic.items.map((item) => (
                        <Text text={item as string} className={"w-full text-base text-main-black"}/>
                    ))
                }
            </div>
        </CatalogItemWrapper>
    );

};

export default CategoryCharacteristicRow;
