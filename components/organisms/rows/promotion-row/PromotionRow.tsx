import React from 'react';
import CatalogItemWrapper from "@/components/wrappers/catalog-item-wrapper/CatelogItemWrapper";
import {SortableProps} from "@/types/components/SortableProps";
import {Promotion} from "@/types/dto/Promotion";
import Text from "@/components/atoms/text/Text";
import {cn} from "@/utils/cn";
import DeleteEditRow from "@/components/moleculas/rows/delete-edit-row/DeleteEditRow";

type EditableProps = {
    onEdit?: (promotionId : number) => void,
    onDelete?: (promotionId : number) => void
}

type PromotionRowProps = {
    promotion: Promotion,
    editableProps?: EditableProps
} & SortableProps

const PromotionRow = ({promotion, ...props}: PromotionRowProps) => {

    const promotionType = promotion.createdByPhoto ? "Акция-картинка" : "Акция-товар"

    const linkCN = promotion.link ? "text-main-blue hoverable hover:text-blue-700" : "text-second-gray"
    const textCN = "text-base text-main-black w-[350px]"

    const handelDeleteItem = () => props.editableProps?.onDelete?.(promotion.id)
    const handleEditItem = () => props.editableProps?.onEdit?.(promotion.id)

    return (
        <CatalogItemWrapper {...props}>
            <div className={"relative w-full flex flex-row items-center justify-between"}>
                <div className={"flex flex-row items-center gap-[20px]"}>
                    <a href={promotion.link} target={"_blank"} rel={"noopener noreferrer"}>
                        <Text text={promotion.link ?? "—"} className={cn(textCN, linkCN)}/>
                    </a>
                    <Text text={promotionType} className={textCN}/>
                </div>
                {
                    props.editableProps && <DeleteEditRow
                        onDelete={handelDeleteItem}
                        onEdit={handleEditItem}
                    />
                }
            </div>
        </CatalogItemWrapper>
    );
};

export default PromotionRow;
