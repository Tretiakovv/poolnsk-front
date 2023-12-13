"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import Text from "@/components/atoms/text/Text";
import HelperHintRow from "@/components/moleculas/rows/helper-hint-row/HelperHintRow";
import {sectionItems} from "@/data/catalogSectionHelperData";
import SortableListWrapper from "@/components/wrappers/sortable-list-wrapper/SortableListWrapper";
import CatalogSectionRow from "@/components/organisms/catalog-section-row/CatalogSectionRow";
import SortableWrapper from "@/components/wrappers/sortable-wrapper/SortableWrapper";
import {useCatalogSectionsPage} from "@/app/catalog/page.hooks";

const CatalogSectionsPage = () => {

    const {
        published, sortableItems,
        handlePublish, handleItemClick
    } = useCatalogSectionsPage()

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
                            onClick={handlePublish}
                        />
                    </div>
                }
            />
            <HelperHintRow items={sectionItems}/>
            <SortableListWrapper items={sortableItems}>
                {
                    sortableItems.map((item, index) => (
                        <SortableWrapper
                            onClick={() => handleItemClick(item)}
                            id={item.orderId ?? index}
                        >
                            <CatalogSectionRow
                                key={item.orderId}
                                section={item}
                            />
                        </SortableWrapper>
                    ))
                }
            </SortableListWrapper>
        </>
    );

};

export default CatalogSectionsPage;
