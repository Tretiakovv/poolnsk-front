"use client"

import {useControlPanelRequestsPage} from "@/app/control-panel/requests/page.hooks";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import Table from "@/components/organisms/table/Table";
import {requestsTableHeader} from "@/data/controlPanelRequestsPageData";

const ControlPanelRequestsPage = () => {

    const {
        requestTableItems, getRequestsQuery,
        requestTypeData, requestFilterData,
        activeTypeItem, setActiveTypeItem,
        activeFilterItem, setActiveFilterItem
    } = useControlPanelRequestsPage()

    if (getRequestsQuery.isLoading) {
        return (
            <div>
                Requests page is loading..
            </div>
        )
    }

    if (getRequestsQuery.isSuccess) {
        return (
            <>
                <div className={"w-full py-8 border-b-2 border-second-border-gray flex flex-row justify-between"}>
                    <MultiselectButton
                        items={requestTypeData}
                        activeItem={activeTypeItem}
                        setActiveItem={setActiveTypeItem}
                    />
                    <MultiselectButton
                        items={requestFilterData}
                        activeItem={activeFilterItem}
                        setActiveItem={setActiveFilterItem}
                    />
                </div>
                <Table
                    tableHeader={requestsTableHeader}
                    tableContent={requestTableItems}
                />
            </>
        )
    }

};

export default ControlPanelRequestsPage;