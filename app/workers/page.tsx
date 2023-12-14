"use client"

import {useWorkersPage} from "@/app/workers/page.hooks";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Table from "@/components/organisms/table/Table";
import {workerPageTableHeader} from "@/data/workersPageData";

const WorkersPage = () => {

    const {
        tableWorkers, getWorkersQuery
    } = useWorkersPage()

    if (getWorkersQuery.isLoading) {
        return (
            <div>
                Sales is loading..
            </div>
        )
    }

    if (getWorkersQuery.isSuccess) {
        return (
            <>
                <HeaderRow
                    header={"Сотрудники"}
                />
                <Table
                    tableHeader={workerPageTableHeader}
                    tableContent={tableWorkers}
                />
            </>
        );
    }

};

export default WorkersPage;
