"use client"

import {useSalesPage} from "@/app/sales/page.hooks";
import Button from "@/components/atoms/buttons/button/Button";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/components/atoms/text/Text";
import Table from "@/components/organisms/table/Table";
import {salesPageTableHeaders} from "@/data/salesPageData";

const SalesPage = () => {

    const {
        sortablePromotions, getPromotionsQuery,
        isPublished, handlePublish, handleDragEnd
    } = useSalesPage()

    if (getPromotionsQuery.isLoading) {
        return (
            <div>
                Sales is loading..
            </div>
        )
    }

    if (getPromotionsQuery.isSuccess) {
        return (
            <>
                <HeaderRow
                    header={"Акции"}
                    rightContent={
                        <div className={"flex flex-row items-center gap-[20px]"}>
                            {
                                isPublished && <Text
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
                <Table
                    draggable
                    handleDragEnd={handleDragEnd}
                    tableHeader={salesPageTableHeaders}
                    tableContent={sortablePromotions}
                />
            </>
        );
    }

};

export default SalesPage;
