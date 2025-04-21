import { Button } from "flowbite-react";
import { IoMdAdd } from "react-icons/io";

const CreateButton = ({ handleAddClick }) => {
    return (
        <Button
            onClick={handleAddClick}
            color="green"
            // disabled={disabled}
            className="cursor-pointer fixed bottom-8 right-8 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
            aria-label="Agregar nueva transacción"
            title="Agregar nueva transacción"
        >
            <IoMdAdd/>
        </Button>
    );
};

export default CreateButton;