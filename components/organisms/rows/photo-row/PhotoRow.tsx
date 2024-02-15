import React from 'react';
import {SortableProps} from "@/types/components/SortableProps";
import {TableItem} from "@/types/TableTypes";
import CatalogItemWrapper from "@/components/wrappers/catalog-item-wrapper/CatelogItemWrapper";
import Text from "@/components/atoms/text/Text";

type PhotoRowProps = {
    photoItem : TableItem,
    rightContent?: React.ReactNode
} & SortableProps

const PhotoRow = (props : PhotoRowProps) => {
    return (
        <CatalogItemWrapper {...props}>
            <div className={"w-full flex flex-row items-center gap-[20px]"}>
                <Text
                    text={props.photoItem.items[0] as string}
                    className={"w-full text-base text-main-black"}
                />
            </div>
        </CatalogItemWrapper>
    );
};

export default PhotoRow;
