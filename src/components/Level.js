import React from 'react';

import Row from './Row';
import ThumbsUp from './ThumbsUp';

const EMPY = 'E';
const WALL = 'W';
const BLCK = 'B';
const VOID = 'V';
const SUCC = 'S';
const PLYR = 'P';

class Level extends React.Component {

    state = {
        level: [],
        gameDone: false
    }

    voidPoints = [];
    numOfVoids = 0;
    blockSize = 0;

    constructor(props) {
        super(props);

        // Load the level
        this.state.level = JSON.parse(JSON.stringify(props.level));
        this.voidPoints = JSON.parse(JSON.stringify(props.level));
        this.numOfVoids = this.getNumberOfVoids();
        this.blockSize = this.calcBlockSize();
    }

    // Listen to keyboard inputs
    componentDidMount() {
        window.addEventListener("keydown", this.keyHandler.bind(this));
        window.addEventListener("click", this.tapHandler.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keyHandler.bind(this));
        window.removeEventListener("click", this.tapHandler.bind(this));
    }

    keyHandler({key}) {
        if (key === 'ArrowUp') this.move(0, -1);
        if (key === 'ArrowDown') this.move(0, 1);
        if (key === 'ArrowLeft') this.move(-1, 0);
        if (key === 'ArrowRight') this.move(1, 0);
    }

    tapHandler(e) {
        e.stopPropagation();

        // Get player coordinates
        const playerCoords = document.getElementById('player').getBoundingClientRect();
        playerCoords.midX = playerCoords.left + playerCoords.width / 2;
        playerCoords.midY = playerCoords.top + playerCoords.height / 2;

        const yMove = e.pageY - playerCoords.midY,
            xMove = e.pageX - playerCoords.midX;
        if (Math.abs(xMove) > Math.abs(yMove))
            this.move(xMove > 0 ? 1 : -1, 0)
        else
            this.move(0, yMove > 0 ? 1 : -1);
    }

    calcBlockSize() {
        // Calculate the block size so it fits on all screens
        const maxBlockSize = 50,
            heightCorrection = 100,
            windowDims = document.body.getBoundingClientRect(),
            blocksX = this.voidPoints.map(row => row.length).reduce((a, b) => a > b ? a : b),
            blocksY = this.voidPoints.length,
            blockSizeX = (windowDims.height - heightCorrection) / blocksY,
            blockSizeY = windowDims.width / blocksX;

        let blockSize = Math.min(5 * Math.floor(blockSizeX/5), 5 * Math.floor(blockSizeY/5), maxBlockSize);
        return blockSize;
    }

    move(moveX, moveY) {
        if (this.state.gameDone) return; // Game is done

        // Find the player
        let [playerX, playerY] = this.findPlayer();

        //// Validate the move
        const targetSpot = this.state.level[playerY + moveY][playerX + moveX];
        if (targetSpot === WALL) return;
        const movingBlock = targetSpot === BLCK || targetSpot === SUCC;
        if (movingBlock) {
            const blockTargetSpot = this.state.level[playerY + 2 * moveY][playerX + 2 * moveX];
            if (blockTargetSpot === WALL) return;
            if (blockTargetSpot === BLCK) return;
            if (blockTargetSpot === SUCC) return;
        }

        let newLevel = [...this.state.level];

        // Move the player
        newLevel[playerY + moveY][playerX + moveX] = PLYR; // Move the player
        newLevel[playerY][playerX] = this.whatToShowWherePlayerWas(playerX, playerY); // Reset the current player position

        // Move the block if needed
        if (movingBlock) {
            const newBlockX = playerX + 2 * moveX,
                newBlockY = playerY + 2 * moveY;
            newLevel[newBlockY][newBlockX] = this.getNewBlockType(newBlockX, newBlockY);
        }
        this.setState({level: newLevel});

        // Check if game is won
        if (this.numOfVoids === this.checkNumberOfSuccess()) this.setState({gameDone: true});
    }


    whatToShowWherePlayerWas(playerX, playerY) {
        let oldPosition = this.voidPoints[playerY][playerX];
        if (oldPosition === VOID || oldPosition === SUCC) return VOID;
        return EMPY;
    }

    getNewBlockType(blockX, blockY) {
        let newPosition = this.voidPoints[blockY][blockX];
        return newPosition === VOID || newPosition === SUCC ? SUCC : BLCK;
    }

    findPlayer() {
        const y = this.state.level.findIndex(row => row.includes(PLYR));
        const x = this.state.level[y].indexOf(PLYR);
        return [x, y];
    }

    getNumberOfVoids() {
        return this.voidPoints.map(row => row.filter(i => i === VOID || i === SUCC).length).reduce((a, b) => a + b, 0);
    }

    checkNumberOfSuccess() {
        return this.state.level.map(row => row.filter(i => i === SUCC).length).reduce((a, b) => a + b, 0);
    }

    render() {
        return (
            <div className='level' style={{fontSize: this.blockSize / 10}}>
                {this.state.level.map(row => (<Row items={row}/>))}
                {this.state.gameDone ? <ThumbsUp/> : ''}
            </div>
        );
    }
}


export default Level;