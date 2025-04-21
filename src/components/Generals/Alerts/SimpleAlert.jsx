import { useRef, useState } from "react";
import { useFadeIn } from '../../../hooks/useFadeIn';
import { useFadeOut } from '../../../hooks/useFadeOut';
import useStore from '../../../store/useStore';
import alertColors from '../../../constants/alertColors';

const SimpleAlert = ({ alertType = 'delete' }) => {
    const ref = useRef();
    const { alert } = useStore();
    const [visible, setVisible] = useState(alert.visible);
    // const [visible, setVisible] = useState(alert.visible);

    const color = alertColors[alertType] || 'gray';
    // const alertColor = colorMap[alertType] || 'gray';
    // console.log(alertColor);
    

    useFadeIn(ref, 500); // Fade in on mount
    useFadeOut(ref, 500, visible); // Fade out on visible change

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <div
            ref={ref}
            id="alert-2"
            className={`flex items-center p-4 mb-4 text-${color}-800 rounded-lg bg-${color}-50 dark:bg-gray-800 dark:text-${color}-400`}
            role="alert"
        >
            <svg
                className="shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className="ms-3 text-sm font-medium">{alert.message}</div>
            <button
                type="button"
                onClick={handleClose}
                className={`ms-auto -mx-1.5 -my-1.5 bg-${color}-50 text-${color}-500 rounded-lg focus:ring-2 focus:ring-${color}-400 p-1.5 hover:bg-${color}-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-${color}-400 dark:hover:bg-gray-700`}
                aria-label="Close"
            >
                <span className="sr-only">Cerrar</span>
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SimpleAlert;
