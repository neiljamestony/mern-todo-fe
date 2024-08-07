import { useState, useEffect } from "react";
import {
  DashboardBody,
  DashboardBodyWrapper,
} from "../../assets/styledComponents/Main";
import NoDataFound from "../NoDataFound";
import Todo from "../Todo";
import { useSelector } from "react-redux";

export default function Body({ isEdit, setIsEdit, setCurrTodo }) {
  const { todos, isFetching, search } = useSelector((state) => state.todo);
  const [newTodos, setNewTodos] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    let isDone = true;

    if (Array.isArray(todos)) {
      const filteredTodos = todos.filter((todo) => todo?.user === user?._id);
      isDone && setNewTodos(filteredTodos);
    }

    return () => {
      isDone = false;
    };
  }, [todos]);

  return (
    <DashboardBodyWrapper>
      <DashboardBody>
        {isFetching ? (
          <>fetching ...</>
        ) : (
          <>
            {!newTodos.length ? (
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
