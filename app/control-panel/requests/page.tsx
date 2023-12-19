"use client"

import {useControlPanelRequestsPage} from "@/app/control-panel/requests/page.hooks";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import Table from "@/components/organisms/table/Table";
import {
    callTableHeaders,
    questionTableHeader,
    serviceTableHeader
} from "@/data/controlPanelRequestsPageData";
import Button from "@/components/atoms/buttons/button/Button";

const ControlPanelRequestsPage = () => {

    const context = useControlPanelRequestsPage()

    const tableHeaders = context.activeRequestType === "call"
        ? callTableHeaders : context.activeRequestType === "question"
        ? questionTableHeader : serviceTableHeader

    if (context.getRequestsQuery.isLoading) {
        return (
            <div>
                Requests page is loading..
            </div>
        )
    }

    if (context.getRequestsQuery.isSuccess) {
        return (
            <>
                <div className={"w-full py-8 border-b-2 border-second-border-gray flex flex-row justify-between"}>
                    <MultiselectButton
                        items={context.requestTypeData}
                        activeItem={context.activeTypeItem}
                        setActiveItem={context.setActiveTypeItem}
                    />
                    <MultiselectButton
                        items={context.requestFilterData}
                        activeItem={context.activeFilterItem}
                        setActiveItem={context.setActiveFilterItem}
                    />
                </div>
                <Table
                    items={context.requests}
                    classNames={{text : `${context.itemWidth}`}}
                    tableHeader={tableHeaders}
                    tableContent={context.requestTableItems}
                />
            </>
        )
    }

};

export default ControlPanelRequestsPage;