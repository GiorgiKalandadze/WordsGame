import WordCard from './WordCard';
import {useState} from 'react';
import useFetch from '../../common/custom-hooks/useFetch';
import Button from '@mui/material/Button';
import config from '../../config';
import styles from './WordView.module.css';

export function WordView() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [targetHidden, setTargetHidden] = useState(true);
    const {response = null, loading = true, error = false} = useFetch(`${config.apiEndpoint}/v1/words`);

    let wordsList;
    if (response) {
        wordsList = response.data.wordsList;
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    function handleNextWordClick() {
        if (currentIndex + 1 < wordsList.length) {
            setCurrentIndex(currentIndex + 1);
            setTargetHidden(true);
        }
    }

    function toggleHidden() {
        setTargetHidden(!targetHidden);
    }

    return wordsList.length ? (
        <div className={styles['container']}>
            <div className={styles['card-items']}>
                <WordCard text={wordsList[currentIndex].source}></WordCard>
                <WordCard hidden={targetHidden} onClick={toggleHidden} text={wordsList[currentIndex].target}></WordCard>
            </div>
            <Button variant="contained" size="large" onClick={handleNextWordClick}>Next Word</Button>
        </div>
    ) : null;
}