const moveFactory = ([x, y], previous) => {
    return {
        space: [x, y], 
        previous: previous,
        possibleMoves: function() {
            const [startX, startY] = this.space;
            let moves = [];
            if(startX-2 >= 0 && startY-1 >= 0) {
                let move = moveFactory([startX-2, startY-1], this);
                moves.push(move);
            }
            if(startX-2 >= 0 && startY+1 < 8) {
                let move = moveFactory([startX-2, startY+1], this);
                moves.push(move);
            }
            if(startX-1 >= 0 && startY-2 >= 0) {
                let move = moveFactory([startX-1, startY-2], this);
                moves.push(move);
            }
            if(startX-1 >= 0 && startY+2 < 8) {
                let move = moveFactory([startX-1, startY+2], this);
                moves.push(move);
            }
            if(startX+2 < 8 && startY-1 >= 0) {
                let move = moveFactory([startX+2, startY-1], this);
                moves.push(move);
            }
            if(startX+2 < 8 && startY+1 < 8) {
                let move = moveFactory([startX+2, startY+1], this);
                moves.push(move);
            }
            if(startX+1 < 8 && startY-2 >= 0) {
                let move = moveFactory([startX+1, startY-2], this);
                moves.push(move);
            }
            if(startX+1 < 8 && startY+2 < 8) {
                let move = moveFactory([startX+1, startY+2], this);
                moves.push(move);
            }
            return moves;
        },
        toString: function() {
            return `[${space}]`;
        }
    };
}

function knightMoves(start, target) {
    let startingSpace = moveFactory(start);
    let targetSpace = moveFactory(target);
    let path = [];
    let queue = [startingSpace];
    let visited = new Set();
    let count = 0;
    while (path.length === 0){
        queue.forEach(move => {
            visited.add(move.space.toString());
            if(move.space.toString() === targetSpace.space.toString() && path.length === 0) {
                queue = [];
                path.push(move);
                return count;
            }
        })
        if(path.length === 0) {
            queue.forEach(move => {
                move.possibleMoves().forEach(possibleMove => {
                    if(!visited.has(possibleMove.space.toString())) {
                        queue.push(possibleMove);
                    }
                });
            })
            count++;
        }
    }
    // console.log('PREVIOUS');
    let temp = path[0];
    path[0] = path[0].space;
    while(temp.previous) {
        path.push(temp.previous.space);
        temp = temp.previous;
    }
    console.log(path.reverse());
    return count;
}

let start = [2,3];
let end = [6,7];
console.log(start + ' to ' + end + ' in ' + knightMoves(start, end) + ' moves!');