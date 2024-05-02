'use strict';

const BLOCK_SIZE = 30;
const LINES_PER_LEVEL = 10;
const NO_OF_HIGH_SCORES = 10;

// Colors of the shapes
const COLORS = [
    'none',   // 0
    'cyan',   // 1
    'blue',   // 2
    'orange', // 3
    'yellow', // 4
    'green',  // 5
    'purple', // 6
    'red'     // 7
];

const SHAPES = [
    [],
    [ [0, 0, 0, 0], 
        [1, 1, 1, 1], 
        [0, 0, 0, 0], 
        [0, 0, 0, 0] ], // Long cyan
    [ [2, 0, 0], 
        [2, 2, 2], 
        [0, 0, 0] ],    // L shaped blue
    [ [0, 0, 3], 
        [3, 3, 3], 
        [0, 0, 0] ],    // L shaped orange
    [ [4, 4], 
        [4, 4] ],       // Square yellow
    [ [0, 5, 5], 
        [5, 5, 0], 
        [0, 0, 0] ],    // S shape green
    [ [0, 6, 0], 
        [6, 6, 6], 
        [0, 0, 0] ],    // T shape purple
    [ [7, 7, 0], 
        [0, 7, 7], 
        [0, 0, 0] ]     // Z shape red
];

// Values for when a key is pressed
const KEY = {
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    P: 80,
    Q: 81
};

// Points from # of lines cleared
const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2,
};

// Level determines falling speed
const LEVEL = {
    0: 800,
    1: 720,
    2: 630,
    3: 550,
    4: 470,
    5: 380,
    6: 300,
    7: 220,
    8: 130,
    9: 100,
    10: 80,
    11: 80,
    12: 80,
    13: 70,
    14: 70,
    15: 70,
    16: 50,
    17: 50,
    18: 50,
    19: 30,
    20: 30,
};

const ROTATION = {
    LEFT: 'left',
    RIGHT: 'right'
};

[COLORS, SHAPES, KEY, POINTS, LEVEL, ROTATION].forEach(item => Object.freeze(item));