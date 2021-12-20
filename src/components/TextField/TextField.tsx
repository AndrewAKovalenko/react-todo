import styles from './TextField.module.scss';
import {useState, KeyboardEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, selectAllItemsAreCompleted, setCompleteStatusForAll} from '../../store/todos/todosSlice';

const DEFAULT_INPUT_VALUE = '';

export const TextField = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(DEFAULT_INPUT_VALUE);
  const isAllItemsCompleted = useSelector(selectAllItemsAreCompleted);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(addTodo({text: value}));
      setValue(DEFAULT_INPUT_VALUE);
    }
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.selectAll} ${isAllItemsCompleted ? styles.selectAllActive : ''}`}
        onClick={() => dispatch(setCompleteStatusForAll({completed: !isAllItemsCompleted}))}>
        {'❯'}
      </button>

      <input
        value={value}
        onChange={event => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        className={styles.input}
      />
    </div>
  )
}
