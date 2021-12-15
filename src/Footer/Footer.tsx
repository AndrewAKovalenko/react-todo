import styles from './Footer.module.scss';

export const Footer = () => {
  const githubAccountLink = 'https://github.com/AndrewAKovalenko';
  const reactLink = 'https://reactjs.org/';

  return (
    <>
      <p className={styles.info}>Double-click to edit an item</p>
      <p className={styles.info}>
        Created by <a href={githubAccountLink} className={styles.link}>Andrii Kovalenko</a>&nbsp;
        using <a href={reactLink} className={styles.link}>React</a>
      </p>
    </>
  );
}
