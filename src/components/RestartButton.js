import { VscDebugRestart } from 'react-icons/vsc';

function RestartButton({restart}) {
    return (
        <div className='restartButton' onClick={restart}>
            <VscDebugRestart/>
        </div>
    );
}

export default RestartButton;