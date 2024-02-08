"use client"

import {useNewSalePage} from "@/app/sales/new/page.hooks";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import ImagePromotionContent from "@/components/organisms/promotion-page/image-promotion-content/ImagePromotionContent";
import ProductPromotionContent
    from "@/components/organisms/promotion-page/product-promotion-content/ProductPromotionContent";

const NewSalePage = () => {

    const {...context} = useNewSalePage()

    return (
        <>
            <HeaderRow
                backIcon
                header={"Новая акция"}
                leftContent={
                    <MultiselectButton
                        setActiveItem={context.multiselectButton.setActiveItem}
                        activeItem={context.multiselectButton.activeItem}
                        items={context.multiselectButton.items}
                    />
                }
            />
            {
                context.multiselectButton.activeItem.buttonText === "Акция-товар"
                    ? <ProductPromotionContent/>
                    : <ImagePromotionContent/>
            }
        </>
    );

};

export default NewSalePage;
