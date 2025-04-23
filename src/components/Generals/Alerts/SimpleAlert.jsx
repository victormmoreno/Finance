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
    const themeAlert = {
        closeButton: {
            base: 'cursor-pointer'
        }
    }

    const color = alertColors[alertType] || 'gray';

    useFadeIn(ref, 500);
    useFadeOut(ref, 500, visible);

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <>
        <Alert ref={ref} color={color} icon={HiInformationCircle} onDismiss={handleClose} theme={themeAlert}>
            {alert.message}
        </Alert>
        </>
    );
};

export default SimpleAlert;
