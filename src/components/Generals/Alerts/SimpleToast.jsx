import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import alertColors from '../../../constants/alertColors';

const SimpleToast = ({ type = 'info', message }) => {
  const color = alertColors[type] || 'gray';

  return (
    <Toast>
      <div className={`text-${color}-600 flex items-center`}>
        {type === 'delete' && <HiX className="mr-2" />}
        {type === 'create' && <HiCheck className="mr-2" />}
        {type === 'warning' && <HiExclamation className="mr-2" />}
        {/* Add other icons as needed */}
        <span>{message}</span>
      </div>
      <ToastToggle />
    </Toast>
  );
};

export default SimpleToast;