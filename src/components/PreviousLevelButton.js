import { VscChevronLeft } from 'react-icons/vsc';

function PreviousLevelButton({levelChange}) {
    return (
        <div className='levelButton previousLevel' onClick={(e) => {levelChange(e, -1)}}>
            <VscChevronLeft/>
        </div>
    );
}

export default PreviousLevelButton;