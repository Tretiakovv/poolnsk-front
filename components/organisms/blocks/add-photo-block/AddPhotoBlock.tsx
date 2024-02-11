import React, {ChangeEvent, useState} from 'react';
import PhotoInput from "@/components/atoms/inputs/photo-input/PhotoInput";
import {FiPlus} from "react-icons/fi";
import Button from "@/components/atoms/buttons/button/Button";
import {useStore} from "@/store/store";

const AddPhotoBlock = ({handleAddPhoto}: {
    handleAddPhoto: (photo: File) => void
}) => {

    const [
        photo,
        setPhoto
    ] = useState<File | undefined>(undefined)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0]
            setPhoto(file)
        }
    }

    const addPhoto = useStore(state => state.addPhoto)

    const handleClear = () => setPhoto(undefined)

    return (
        <div className={"w-full flex flex-row items-start gap-[20px]"}>

            <PhotoInput
                value={photo}
                onChange={handleChange}
                onClear={handleClear}
                hintText={"Фото должно быть не больше 5 МБ"}
            />

            <Button
                className={"h-[60px]"}
                icon={<FiPlus size={"20px"} className={"stroke-main-white"}/>}
                onClick={() => {
                    if (photo) {
                        addPhoto(photo)
                        handleAddPhoto(photo)
                    }
                }}
            />

        </div>
    )

};

export default AddPhotoBlock;
