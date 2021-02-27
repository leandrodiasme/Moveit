import {createContext, useState, ReactNode, useEffect} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    startNewChallenge: ()=> void;
    levelUp: ()=> void;
    activeChallenge: Challenge; 
    resetChallenge: ()=> void;
    completeChallenge: ()=> void;
    experienceToNextLevel: number;
    closeLevelUpModal: ()=> void;
}

interface ChallengesProviderProps{
    children: ReactNode,
    level: number,
    currentExperience: number,
    challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const[currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge]= useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
    const experienceToNextLevel = Math.pow((level+1) * 4, 2);

    useEffect(()=>{
        Notification.requestPermission();
    }, [])

    useEffect(()=>{ // Disparar uma função sempre que alguma coisa [] mudar
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    },[level, currentExperience, challengesCompleted])
  
    function levelUp(){
      setLevel(level+1);
      setIsLevelUpModalOpen(true);
    }

    function startNewChallenge(){
       const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
       const challenge = challenges[randomChallengeIndex];

       setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount} xp! Exercício para o${challenge.type === 'eye' ? 's olhos' : ' corpo'}`,
                icon: '../favicon.png'
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;
        let finalExperience = currentExperience+amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted+1);

    }

    return (
        <ChallengesContext.Provider
        value={{
            level,
            currentExperience,
            challengesCompleted,
            startNewChallenge,
            activeChallenge,
            levelUp,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge,
            closeLevelUpModal
            }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}