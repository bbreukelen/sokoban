import Wall from './Wall';
import Empty from './Empty';
import Player from './Player';
import Block from './Block';
import Void from './Void';
import Success from './Success';

const EMPY = 'E';
const WALL = 'W';
const BLCK = 'B';
const VOID = 'V';
const SUCC = 'S';
const PLYR = 'P';

function Row({ items }) {
    return (
        <div className='row'>
            {items.map(item => (getComponentByName(item)))}
        </div>
    );
}

function getComponentByName(name) {
    if (name === EMPY) return Empty();
    if (name === WALL) return Wall();
    if (name === BLCK) return Block();
    if (name === VOID) return Void();
    if (name === SUCC) return Success();
    if (name === PLYR) return Player();
}

export default Row;