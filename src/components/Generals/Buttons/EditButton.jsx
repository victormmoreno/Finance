import { Button } from "flowbite-react";
import { TiEdit } from "react-icons/ti";

const EditButton = ({ item, editItem, disabled = false }) => {
    return (
        <Button
            color="yellow"
            disabled={disabled}
            onClick={() => editItem(item)}
            className="cursor-pointer"
        >
            <TiEdit className="h-5 w-5" />
            
        </Button>
    );
};

export default EditButton;