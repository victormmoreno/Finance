import { useRef, useState } from "react";
import { useFadeIn } from '../../../hooks/useFadeIn';
import { useFadeOut } from '../../../hooks/useFadeOut';
import useStore from '../../../store/useStore';
import alertColors from '../../../constants/alertColors';
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const SimpleAlert = ({ alertType = 'delete' }) => {
    const ref = useRef();
    const { alert } = useStore();
    const [visible, setVisible] = useState(alert.visible);
    // const [visible, setVisible] = useState(alert.visible);

    const color = alertColors[alertType] || 'gray';
    // const alertColor = colorMap[alertType] || 'gray';
    

    useFadeIn(ref, 500); // Fade in on mount
    useFadeOut(ref, 500, visible); // Fade out on visible change

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <>
        <Alert ref={ref} color={color} icon={HiInformationCircle} onDismiss={handleClose}>
            {alert.message}
        </Alert>
        </>
    );
};

export default SimpleAlert;
