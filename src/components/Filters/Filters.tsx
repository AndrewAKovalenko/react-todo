import {useDispatch, useSelector} from 'react-redux';
import {
  removeCompletedTodos,
  selectCompletedItemsCount,
  selectFilterStatus,
  selectUncompletedItemsCount,
  setFilterStatus
} from '../../store/todos/todosSlice';
import {FilterStatus} from '../../enums/filterStatus';
import styles from './Filters.module.scss';

export const Filters = () => {
  const selectedFilter = useSelector(selectFilterStatus);
  const uncompletedItemsCount = useSelector(selectUncompletedItemsCount);
  const completedItemsCount = useSelector(selectCompletedItemsCount);

  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <span>{uncompletedItemsCount} item{uncompletedItemsCount !== 1 ? 's' : ''} left</span>
      <div>
        <button
          onClick={() => dispatch(setFilterStatus(FilterStatus.All))}
          className={`${styles.button} ${selectedFilter === FilterStatus.All ? styles.active : ''}`}>
          All
        </button>
        <button
          onClick={() => dispatch(setFilterStatus(FilterStatus.Active))}
          className={`${styles.button} ${selectedFilter === FilterStatus.Active ? styles.active : ''}`}>
          Active
        </button>
        <button
          onClick={() => dispatch(setFilterStatus(FilterStatus.Completed))}
          className={`${styles.button} ${selectedFilter === FilterStatus.Completed ? styles.active : ''}`}>
          Completed
        </button>
      </div>

      <button
        className={`${styles.button} ${completedItemsCount === 0 ? styles.hidden : ''}`}
        onClick={() => dispatch(removeCompletedTodos())}>
        Clear completed
      </button>
    </div>
  );
};
