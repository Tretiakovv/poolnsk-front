"use client"

import {useWorkersPage} from "@/app/workers/page.hooks";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {workerPageTableHeader} from "@/data/workersPageData";
import {FiPlus} from "react-icons/fi";
import Button from "@/components/atoms/buttons/button/Button";
import dynamic from "next/dynamic";
import Loading from "@/components/atoms/loading/Loading";

const Table = dynamic(
    () => import("@/components/organisms/table/Table"),
    {loading : () => <Loading/>})

const WorkersPage = () => {

    const {
        tableWorkers, getWorkersQuery,
        ...context
    } = useWorkersPage()

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

export default WorkersPage
