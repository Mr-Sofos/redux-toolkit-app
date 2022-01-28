import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  completeTask,
  titleChanged,
  taskDeleted,
  getTasks,
} from './store/task';
import configureStore from './store/store';

const store = configureStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.dispatch(getTasks());
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId));
  };

  return (
    <div>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{el.description}</p>
            <p>{`Completed ${el.completed}`}</p>
            <button onClick={() => store.dispatch(completeTask(el.id))}>
              complete
            </button>
            <button onClick={() => changeTitle(el.id)}>ChangeTitle</button>
            <button onClick={() => deleteTask(el.id)}>Delete task</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
