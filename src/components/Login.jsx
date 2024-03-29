import { useEffect, useRef } from 'react';
import {
  LoginContainer,
  FormContainer,
  TInput,
  InputContainer,
  Title,
  RegisterButton,
  RegisterButtonContainer,
  SubmitButton,
  SubmitButtonContainer,
  FormHeader,
} from '../assets/styledComponents/Main';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../app/reducer/auth/authSlice';
import { toast } from 'react-toastify';
import ViteIcon from '../assets/img/vite.svg';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const { isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );
  const emailRef = useRef();
  const pwordRef = useRef();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [isError, isSuccess, user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      login({
        email: emailRef.current.value,
        password: pwordRef.current.value,
      })
    );
  };

  return (
    <LoginContainer>
      <FormHeader>
        <img src={ViteIcon} alt="vite-icon" />
        <Title>Login</Title>
      </FormHeader>
      <FormContainer>
        <form onSubmit={onSubmit}>
          <InputContainer>
            <TInput
              type="email"
              ref={emailRef}
              placeholder="Email"
              maxLength={30}
              required
            />
          </InputContainer>
          <InputContainer>
            <TInput
              type="password"
              ref={pwordRef}
              placeholder="Password"
              maxLength={20}
              required
            />
          </InputContainer>
          <SubmitButtonContainer>
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'loading ...' : 'SUBMIT'}
            </SubmitButton>
          </SubmitButtonContainer>
        </form>
      </FormContainer>
      <RegisterButtonContainer>
        <RegisterButton type="button" onClick={() => navigate('/register')}>
          Don't have an account ? Register here.
        </RegisterButton>
      </RegisterButtonContainer>
    </LoginContainer>
  );
}
