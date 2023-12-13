"use client"

import {useOurProjectsPage} from "@/app/our-projects/page.hooks";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import Table from "@/components/organisms/table/Table";
import {ourProjectsTableHeaders} from "@/data/ourProjectsPageData";
import Text from "@/components/atoms/text/Text";

const OutProjectsPage = () => {

    const {
        sortableProjects, getProjectsQuery,
        isPublished, handlePublish,
    } = useOurProjectsPage()

    if (getProjectsQuery.isLoading) {
        return (
            <div>
                Our projects is loading..
            </div>
        )
    }

    if (getProjectsQuery.isSuccess) {
        return (
            <>
                <HeaderRow
                    header={"Наши работы"}
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
                    tableHeader={ourProjectsTableHeaders}
                    tableContent={sortableProjects}
                />
            </>
        );
    }

};

export default OutProjectsPage;
