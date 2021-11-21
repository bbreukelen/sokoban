import Penguin from '../assets/penguin.svg';

function Player() {
    return (
        <div className='item player noselect' id='player'>
            <img src={Penguin} alt='Penguin' />
        </div>
    );
}

export default Player;