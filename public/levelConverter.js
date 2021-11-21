/*
    Get levels from http://sokoban.dk/wp-content/uploads/2016/02/DrFogh-Original01.txt
*/

const levelInput = `  ######
  # ..@#
  # $$ #
  ## ###
   # #
   # #
#### #
#    ##
# #   #
#   # #
###   #
  #####`;

let mapping = {
    '#': 'W',
    ' ': 'E',
    '-': 'E',
    '$': 'B',
    '@': 'P',
    '+': 'P',
    '.': 'V',
    '*': 'S'
}

let output = [];
levelInput.split("\n").map(row => {
    output.push(
        row.split('').map(char => mapping[char])
    );
});

console.log(JSON.stringify(output));
