import DeleteButton from "@/components/atoms/buttons/delete-button/DeleteButton";

export type DeleteEditRowProps = {
    onDelete : () => void,
    onEdit ?: () => void
}

const DeleteEditRow = (props : DeleteEditRowProps) => {

    const handleDelete = (event : Event) => {
        event.stopPropagation()
        props.onDelete()
    }

    return (
        <div className={"flex flex-row items-center gap-2"}>
            <DeleteButton onClick={handleDelete}/>
        </div>
    );
};

export default DeleteEditRow;
