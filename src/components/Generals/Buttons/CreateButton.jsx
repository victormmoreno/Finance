import { Button } from "flowbite-react";
import { IoMdAdd } from "react-icons/io";

const CreateButton = ({ handleAddClick }) => {
    return (
        <Button
            onClick={handleAddClick}
            color="green"
            // disabled={disabled}
            className="cursor-pointer text-white rounded-full w-17 h-17 flex items-center justify-center shadow-lg"
            aria-label="Agregar nueva transacción"
            title="Agregar nueva transacción"
        >
            <IoMdAdd className="h-7 w-7"/>
        </Button>
    );
};

export default CreateButton;