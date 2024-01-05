import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToExplore = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      navigate('/explore');
    }, [navigate]);
  
    return null; // or any loading indicator you prefer
  };

  export default RedirectToExplore;