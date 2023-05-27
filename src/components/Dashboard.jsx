import { useEffect } from 'react';
import { DashboardContainer } from '../assets/styledComponents/Main';
import { useNavigate } from 'react-router-dom';
import TodoComponent from './TodoComponent/Index';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <DashboardContainer>
      <TodoComponent />
    </DashboardContainer>
  );
}
