"use client"

import {useWorkersPage} from "@/app/workers/page.hooks";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Table from "@/components/organisms/table/Table";
import {workerPageTableHeader} from "@/data/workersPageData";
import {FiPlus} from "react-icons/fi";
import Button from "@/components/atoms/buttons/button/Button";

const WorkersPage = () => {

    const {
        tableWorkers, getWorkersQuery,
        ...context
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
                    rightContent={
                        <Button
                            icon={<FiPlus size={"18px"}/>}
                            className={"flex flex-row items-center gap-2"}
                            buttonText={"Добавить работника"}
                            onClick={context.handleAddWorker}
                        />
                    }
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
