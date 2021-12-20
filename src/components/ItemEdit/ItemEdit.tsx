import {ChangeEvent, useRef, useState, KeyboardEvent} from 'react';
import styles from './ItemEdit.module.scss';

import {useOutsideClickListener} from '../../utils/useOutsideClickListener';
import {useEscapeKeyListener} from '../../utils/useEscapeKeyListener';
import {useDispatch} from 'react-redux';
import {updateTodo} from '../../store/todos/todosSlice';
import {Todo} from '../../models/todo';

export const ItemEdit = (props: {todo: Todo, onStopEditing: () => void}) => {
  const [editedValue, setEditedValue] = useState(props.todo.text);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => setEditedValue(event.target.value);
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(updateTodo({...props.todo, text: editedValue}));
      props.onStopEditing();
    }
  }

  useOutsideClickListener(inputRef, props.onStopEditing);
  useEscapeKeyListener(props.onStopEditing);

  return (
    <input
      className={styles.edit}
      ref={inputRef}
      value={editedValue}
      onKeyDown={handleKeyDown}
      onChange={handleValueChange}/>
  );
};
