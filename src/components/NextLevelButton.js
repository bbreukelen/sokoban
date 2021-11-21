import { VscChevronRight } from 'react-icons/vsc';

function NextLevelButton({levelChange}) {
    return (
        <div className='levelButton nextLevel' onClick={(e) => {levelChange(e, 1)}}>
            <VscChevronRight/>
        </div>
    );
}

export default NextLevelButton;