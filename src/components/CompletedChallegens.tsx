import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/CompletedChallenges.module.css';
import {useContext} from 'react';

export function CompletedChallegens(){

    const{challengesCompleted} = useContext(ChallengesContext);

    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}