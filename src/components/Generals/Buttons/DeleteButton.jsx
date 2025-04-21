import { Button } from "flowbite-react";

const DeleteButton = ({ item, removeItem, disabled = false }) => {
    return (
        <Button
            color="red"
            disabled={disabled}
            onClick={() => removeItem(item)} // Pass the entire item object
            className="cursor-pointer"
        >
            Eliminar
        </Button>
    );
};

export default DeleteButton;