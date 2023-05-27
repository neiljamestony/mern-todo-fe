import {
  DashboardBody,
  DashboardBodyWrapper,
} from '../../assets/styledComponents/Main';
import NoDataFound from '../NoDataFound';
import Todo from '../Todo';
import { useSelector } from 'react-redux';

export default function Body({ isEdit, setIsEdit, setCurrTodo }) {
  const { todos, isFetching, search } = useSelector((state) => state.todo);
  const user = JSON.parse(localStorage.getItem('user'));
  let newTodos = todos.filter((todo) => todo.user === user._id);
  return (
    <DashboardBodyWrapper>
      <DashboardBody>
        {isFetching ? (
          <>fetching ...</>
        ) : (
          <>
            {!todos.length ? (
              <NoDataFound />
            ) : (
              <>
                {newTodos
                  .filter((todo) =>
                    todo.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((v, i) => (
                    <Todo
                      key={i}
                      {...v}
                      setIsEdit={setIsEdit}
                      isEdit={isEdit}
                      setCurrTodo={setCurrTodo}
                    />
                  ))}
              </>
            )}
          </>
        )}
      </DashboardBody>
    </DashboardBodyWrapper>
  );
}
