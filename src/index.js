import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {
  completeTask,
  titleChanged,
  taskDeleted,
  loadTasks,
  getTasksLoadingStatus,
  getTasks,
  createTask,
} from './store/task';
import { getError } from './store/errors';
import configureStore from './store/store';

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const addNewTask = () => {
    dispatch(
      createTask({ userId: 1, title: 'some new task', complited: false })
    );
  };

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{el.description}</p>
            <p>{`Completed ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              complete
            </button>
            <button onClick={() => changeTitle(el.id)}>ChangeTitle</button>
            <button onClick={() => deleteTask(el.id)}>Delete task</button>
            <button onClick={() => addNewTask()}>Created task</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
