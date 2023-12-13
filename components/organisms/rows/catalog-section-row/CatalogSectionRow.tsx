import React from 'react';
import {Section} from "@/types/dto/Section";
import Text from "@/components/atoms/text/Text";
import CatalogItemWrapper from "@/components/wrappers/catalog-item-wrapper/CatelogItemWrapper";
import {SortableProps} from "@/types/components/SortableProps";

type CatalogSectionRowProps = {
    section: Section
} & SortableProps

const CatalogSectionRow = ({section , ...props}: CatalogSectionRowProps) => {
    return (
        <CatalogItemWrapper {...props}>
            <Text
                text={section.name}
                className={"text-base text-main-black"}
            />
        </CatalogItemWrapper>
    );
};

export default CatalogSectionRow;
