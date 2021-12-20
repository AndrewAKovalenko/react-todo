import styles from './TodoItem.module.scss';
import {Todo} from '../../models/todo';
import {ChangeEvent, useState} from 'react';
import {ItemEdit} from '../ItemEdit/ItemEdit';
import {useDispatch} from 'react-redux';
import {removeTodo, updateTodo} from '../../store/todos/todosSlice';

export const TodoItem = (props: { item: Todo }) => {
  const [isEditMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const handleDoubleClick = () => {
    setEditMode(true);
    // setTimeout(() => inputRef.current?.focus()); // TODO: fix focus error
  }

  const handleDelete = () => dispatch(removeTodo({ id: props.item.id }));

  const handleCheckedChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTodo({ id: props.item.id, completed: event.target.checked}));
    setEditMode(false);
  }

  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={props.item.completed}
        onChange={handleCheckedChange}
      />

      {
        isEditMode
          ? <ItemEdit
              todo={props.item}
              onStopEditing={() => setEditMode(false)}
            />
          : (
            <>
              <span
                className={`${styles.text} ${props.item.completed ? styles.itemCompleted : ''}`}
                onDoubleClick={handleDoubleClick}>
                {props.item.text}
              </span>
              <button className={styles.delete} onClick={handleDelete}>X</button>
            </>
          )
      }

    </li>
  );
};
