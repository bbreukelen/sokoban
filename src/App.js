import './App.css';
import Header from './components/Header';
import Level from './components/Level';
import Footer from './components/Footer';
import LevelsData from './assets/levels';


import { useState } from 'react';

function App() {
    const [ levelNum, setLevelNum ] = useState(0);
    const [ levelTries, setLevelTries ] = useState(0);

    function restartLevel(e) {
        e.stopPropagation();
        setLevelTries(levelTries + 1);
    }

    function levelChange(e, byHowMuch) {
        e.stopPropagation();
        let newLevel = levelNum + byHowMuch;
        if (newLevel < 0 || newLevel >= LevelsData.length) return;

        setLevelNum(newLevel);
    }

    return (
        <>
            <Header />
            <Level key={levelNum.toString() + levelTries.toString()} levelNum={levelNum} level={LevelsData[levelNum]} />
            <Footer restart={restartLevel} levelNum={levelNum} levelChange={levelChange} />
        </>
    );
}

export default App;
