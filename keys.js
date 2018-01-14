const keyNames = [
    '', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '][',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '][',
    '`~', '-_', '=+', '[{', ']}', '\\|', ';:', '\\', ',<', '.>', '/?', '][',
    'Esc', 'Tab', 'Caps', 'Space', 'Enter', 'Bkspc', 'LSHIFT', 'RSHIFT', 'LCTRL', 'RCTRL', 'LWIN', 'RWIN', 'LALT', 'RALT', '][',
    'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', '][',
    'PrtSc', 'ScrLk', 'Pause', 'Ins', 'Del', 'Home', 'End', 'PgDn', 'PgUp', 'Left', 'Up', 'Down', 'Right', '][',
    'FN', 'Anne', 'VolUp', 'VolDn', 'Mute',
];
const keyCodes = [
    0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 0, // A-Z
    39, 30, 31, 32, 33, 34, 35, 36, 37, 38, 0, // 0-9
    53, 45, 46, 47, 48, 49, 51, 52, 54, 55, 56, 0, // punctuation
    41, 43, 57, 44, 40, 42, 225, 229, 224, 228, 227, 231, 226, 230, 0, // modifiers
    58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 0, // f-keys
    70, 71, 72, 73, 76, 74, 77, 78, 75, 80, 82, 81, 79, 0, // special keys
    254, 250, 128, 129, 127, // fn+anne+media
];

module.exports = {
  getName: (code) => keyNames[keyCodes.indexOf(code)],
};
