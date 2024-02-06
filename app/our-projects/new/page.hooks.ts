import {ChangeEvent, useState} from "react";
import {OurProjectChar, OurProjectCharView} from "@/types/dto/OurProjectChar";
import {DraggableTableItem} from "@/types/TableTypes";
import {useStore} from "@/store/store";
import {useMutation} from "react-query";
import {OurProject} from "@/types/dto/OurProject";

export const useNewProjectPage = () => {

    const [projectName, setProjectName] = useState<string>("")
    const [projectType, setProjectType] = useState<string>("")
    const [projectDuration, setProjectDuration] = useState<string>("")

    const [photo, setPhoto] = useState<File>()
    const handleChangePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        event.target?.files && setPhoto(event.target?.files[0])
    }
    const handleClearPhoto = () => setPhoto(undefined)

    const [
        ourProjectChars,
        setOurProjectChars
    ] = useState<OurProjectCharView[]>([])

    const [
        ourProjectCharTableItems,
        setOurProjectCharTableItems
    ] = useState<DraggableTableItem[]>([])

    const handleAddOurProjectChar = (ourProjectChar: OurProjectCharView) => {
        setOurProjectChars(state => [...state, ourProjectChar])
        setOurProjectCharTableItems(state => {
            const newItem: DraggableTableItem = {
                id: ourProjectCharTableItems.length,
                orderId: ourProjectCharTableItems.length + 1,
                items: [ourProjectChar.name, ourProjectChar.info, ourProjectChar.icon.value]
            }
            return [...state, newItem]
        })
    }

    const handleDeleteOurProjectChar = (itemToDelete: DraggableTableItem) => {
        const preparedTableItems = ourProjectCharTableItems.map((item) => {
            if (item.id !== itemToDelete.id) {
                return {...item, orderId: item.orderId - 1}
            } else return item
        })
        const filteredTableItems = preparedTableItems.filter((item) => {
            return item.id !== itemToDelete.id
        })
        setOurProjectCharTableItems(filteredTableItems)
        setOurProjectChars(state => state.filter((item) => item.name !== itemToDelete.items[0]))
    }

    const createOurProject = () => {
        const ourProjectCharsDTO: OurProjectChar[] = ourProjectChars.map(char => {
            return {name : char.name, fileName : char.icon.name, info : char.info}
        })
        return {
            name: projectName,
            workType: projectType,
            terms: projectDuration,
            imageFilenameList: [],
            projectPropertyDtoList : ourProjectCharsDTO
        } as OurProject
    }

    const addOurProject = useStore(state => state.addOurProject)
    const addOurProjectMutation = useMutation({
        mutationKey: ["add", "ourProject"],
        mutationFn: () => {
            const ourProject = createOurProject()
            console.log("PROJECT", ourProject)
            addOurProject(ourProject)
        },
        onSuccess : () => console.log("SUCCESS")
    })

    const handleAddOurProject = () => addOurProjectMutation.mutate()

    return {
        nameInput: {projectName, setProjectName},
        typeInput: {projectType, setProjectType},
        durationInput: {projectDuration, setProjectDuration},
        photoInput: {photo, handleChangePhoto, handleClearPhoto},
        handleAddOurProjectChar, handleDeleteOurProjectChar, ourProjectCharTableItems,
        handleAddOurProject
    }

}