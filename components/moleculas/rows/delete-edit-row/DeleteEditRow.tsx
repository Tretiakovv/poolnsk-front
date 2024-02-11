import ActionButton from "@/components/atoms/buttons/delete-button/ActionButton";
import {FiEdit} from "react-icons/fi";

export type DeleteEditRowProps = {
    onDelete: () => void,
    onEdit?: () => void
}

const DeleteEditRow = (props: DeleteEditRowProps) => {
    return (
        <div className={"flex flex-row items-center gap-2"}>
            {
                props.onEdit && <ActionButton
                    className={"hover:bg-main-blue text-main-black"}
                    icon={<FiEdit size={"18px"}/>}
                    onClick={props.onEdit}
                />
            }
            <ActionButton onClick={props.onDelete}/>
        </div>
    );
};

export default DeleteEditRow;
