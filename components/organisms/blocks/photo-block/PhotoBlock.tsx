import React from 'react';
import {ClassValue} from "clsx";
import Text from "@/components/atoms/text/Text";
import {cn} from "@/utils/cn";
import {DraggableTableItem} from "@/types/TableTypes";
import PhotoRow from "@/components/organisms/rows/photo-row/PhotoRow";
import DeleteButton from "@/components/atoms/buttons/delete-button/DeleteButton";
import AddPhotoBlock from "@/components/organisms/blocks/add-photo-block/AddPhotoBlock";

type PhotoBlockProps = {
    photos: DraggableTableItem[],
    onDelete: (item: DraggableTableItem) => void,
    onAdd : (file : File | undefined) => void
}

const PhotoBlock = (props: PhotoBlockProps) => {

    const headerCV: ClassValue = [
        "text-[24px] pb-10 border-b-2 border-second-light-blue",
        "text-main-black font-semibold"
    ]

    return (
        <div className={"w-full flex flex-col gap-10"}>
            <Text text={"Фотографии товара"} className={cn(headerCV)}/>
            <Text text={"Фотография"} className={"text-base text-second-gray"}/>
            <div className={"flex flex-col gap-5"}>
                {
                    props.photos.map((item) => (
                        <PhotoRow
                            photoItem={item}
                            rightContent={
                                <DeleteButton
                                    onClick={() => props.onDelete(item)}
                                />
                            }
                        />
                    ))
                }
                <AddPhotoBlock
                    handleAddPhoto={props.onAdd}
                />
            </div>
        </div>
    )

};

export default PhotoBlock;
