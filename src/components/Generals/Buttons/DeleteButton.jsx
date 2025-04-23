import { Button } from "flowbite-react";
import { MdDeleteForever } from "react-icons/md";


const DeleteButton = ({ item, removeItem, disabled = false }) => {
    return (
        <Button
            color="red"
            disabled={disabled}
            onClick={() => removeItem(item)} // Pass the entire item object
            className="cursor-pointer"
        >
            <MdDeleteForever className="h-5 w-5" />
            {/* Eliminar */}
        </Button>
    );
};

export default DeleteButton;