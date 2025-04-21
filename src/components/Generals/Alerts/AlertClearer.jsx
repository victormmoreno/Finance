import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useStore from '../../../store/useStore';

const AlertClearer = () => {
  const location = useLocation();
  const hideAlert = useStore((state) => state.hideAlert);

  useEffect(() => {
    hideAlert();
  }, [location, hideAlert]);

  return null;
};

export default AlertClearer;
