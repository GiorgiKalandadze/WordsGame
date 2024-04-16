import styles from './WordCard.module.css';

export default function WordCard({text, hidden, onClick }) {
    return (
        <div className={`${styles['card']} ${hidden ? styles['clickable'] : ''}`} onClick={onClick}>
            <p className={hidden ? styles['hidden'] : ''}>{text}</p>
        </div>
    );
}