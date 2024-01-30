"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {useState} from "react";
import {useStore} from "@/store/store";
import {useMutation, useQueryClient} from "react-query";
import {useRouter} from "next/navigation";

import {Worker} from "@/types/dto/Worker"

const AddWorkerForm = ({inputData}: {
    inputData: any[]
}) => {
    return (
        <div className={"w-full flex flex-col gap-[30px]"}>
            {
                Array.from({length: 2}, (_, i) => i)
                    .map((index) => (
                        <div className={"w-full flex flex-row gap-5"}>
                            {
                                inputData.slice(2 * index, 2 * index + 2).map((input) => (
                                    <TextInput
                                        value={input.value}
                                        labelText={input.labelText}
                                        hintText={"Не больше 60 символов, включая пробелы и знаки препинания"}
                                        maxLength={60}
                                        placeholder={"Введите здесь.."}
                                        onChange={input.action}
                                    />
                                ))
                            }
                        </div>
                    ))
            }
        </div>
    )
}

const NewWorkerPage = () => {

    const router = useRouter()

    const [name, setName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const inputData = [
        {labelText: "Имя", value: name, action: (name: string) => setName(name)},
        {labelText: "Фамилия", value: surname, action: (surname: string) => setSurname(surname)},
        {labelText: "Email", value: email, action: (email: string) => setEmail(email)},
        {labelText: "Пароль", value: password, action: (password: string) => setPassword(password)},
    ]

    const queryClient = useQueryClient()
    const addWorker = useStore(state => state.addWorker)

    const addWorkerMutation = useMutation({
        mutationKey : ["add", "worker"],
        mutationFn : (worker : Worker) => addWorker(worker),
        onSuccess : () => {
            queryClient.invalidateQueries(["get", "workerList"])
            router.push("/workers")
        }
    })

    const handleSaveChanges = () => {
        const newWorker : Worker = {
            name : name, surname : surname,
            email : email, password : password
        }
        addWorkerMutation.mutate(newWorker)
    }

    return (
        <>
            <HeaderRow header={"Добавить работника"} backIcon/>
            <div className={"w-full py-[30px] flex flex-col gap-[30px]"}>
                <AddWorkerForm inputData={inputData}/>
                <Button
                    buttonText={"Сохранить"}
                    onClick={handleSaveChanges}
                />
            </div>
        </>
    );

};

export default NewWorkerPage;
