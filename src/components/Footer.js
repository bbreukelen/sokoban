import RestartButton from './RestartButton';
import PreviousLevelButton from './PreviousLevelButton';
import NextLevelButton from './NextLevelButton';

function Footer({ restart, levelNum, levelChange }) {

    return (
        <div className='footer noselect'>
            <RestartButton restart={restart} />
            <div class='space'></div>
            <PreviousLevelButton levelChange={levelChange} />
            <div className='levelNum'>level {levelNum + 1}</div>
            <NextLevelButton levelChange={levelChange} />
        </div>
    );
}

export default Footer;