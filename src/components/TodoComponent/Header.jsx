import { useState } from 'react';
import {
  DashboardHeader,
  AddTodoInput,
  AddTodoButton,
} from '../../assets/styledComponents/Main';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/reducer/auth/authSlice';
import {
  setTodoItem,
  reset,
  editTodoItem,
  searchTodo,
} from '../../app/reducer/todo/todoSlice';
import { toast } from 'react-toastify';

export default function Header({ isEdit, setIsEdit, currTodo, setCurrTodo }) {
  const [isSearch, setIsSearch] = useState(false);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const { isLoading, isSuccess } = useSelector((state) => state.todo);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      setTodoItem({ todo: todo, uid: user?._id, isCompleted: false })
    );
    if (isSuccess) {
      setTodo('');
      toast.success('Todo added successfully!');
      dispatch(reset());
    }
  };

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    await dispatch(editTodoItem(currTodo));
    if (isSuccess) {
      setTodo('');
      setCurrTodo('');
      setIsEdit(false);
      dispatch(reset());
    }
  };

  const onCancel = () => {
    setIsEdit(false);
    setCurrTodo('');
  };

  const handleBack = () => {
    setIsSearch(false);
    dispatch(searchTodo(''));
    setTodo('');
  };

  return (
    <div>
      {isSearch ? (
        <DashboardHeader>
          <AddTodoInput
            type="text"
            onChange={(e) => dispatch(searchTodo(e.target.value))}
            placeholder="Search Todo"
          />
          <AddTodoButton type="button" onClick={() => handleBack()}>
            Back
          </AddTodoButton>
        </DashboardHeader>
      ) : (
        <>
          <form onSubmit={isEdit ? onSubmitEdit : onSubmit}>
            <DashboardHeader>
              <AddTodoInput
                type="text"
                value={isEdit ? currTodo?.title : todo}
                onChange={(e) =>
                  isEdit
                    ? setCurrTodo({ ...currTodo, title: e.target.value })
                    : setTodo(e.target.value)
                }
                placeholder={isEdit ? 'Edit Todo' : 'Todo'}
                required
              />
              <AddTodoButton type="submit" disabled={isLoading}>
                {isLoading ? 'loading ...' : isEdit ? 'Submit' : 'Save'}
              </AddTodoButton>
              {isEdit ? (
                <AddTodoButton type="button" onClick={() => onCancel()}>
                  Cancel
                </AddTodoButton>
              ) : (
                <>
                  <AddTodoButton
                    type="button"
                    onClick={() => setIsSearch(true)}
                  >
                    Search Todo
                  </AddTodoButton>
                  <AddTodoButton
                    type="button"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </AddTodoButton>
                </>
              )}
            </DashboardHeader>
          </form>
        </>
      )}
    </div>
  );
}
