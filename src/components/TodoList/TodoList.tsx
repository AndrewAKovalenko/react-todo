import styles from './TodoList.module.scss';
import {TodoItem} from '../TodoItem/TodoItem';
import {useSelector} from 'react-redux';
import {selectFilteredTodos} from '../../store/todos/todosSlice';
import {useEffect} from 'react';

export const TodoList = () => {
  const items = useSelector(selectFilteredTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(items));
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <ul className={styles.list}>
      { items.map(item => <TodoItem item={item} key={item.id}/>) }
    </ul>
  );
};
