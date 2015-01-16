/* Usage:

var converter = require('./GeoConverter');
converter.latConverter.encode(23.123);
converter.latConverter.decide('ASD%f');
converter.longConverter.encode(123.123);
*/


var alphabet = [
// 33 - 126 (94 chars)
    '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '[', '\\', ']', '^', '_', '`',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '{', '|', '}', '~',
// Extended Chars (4)
    'ü', 'é', 'â', 'ä'
];

GeoConverter = function (maxNeg, decimalValue) {
    this.maxNeg = maxNeg;
    this.decimalValue = decimalValue;
};

GeoConverter.prototype.encode = function (geoCoord) {
    var base = alphabet.length;
    var fullCoordinate = Math.round((geoCoord + this.maxNeg) * this.decimalValue);
    var result = "";
    var remainder = fullCoordinate;
    var i;
    for (i = this.numChars - 1; i >= 0; i--) {
        var x = Math.pow(base, i);
        result += alphabet[Math.floor(remainder / x)];
        remainder = remainder % x;
    }

    return result;
};

GeoConverter.prototype.decode = function (codeString) {
    var result = 0;
    var l = codeString.length;
    var base = alphabet.length;

    var i;
    for (i = l - 1; i >= 0; i--) {
        var power = l - i - 1;
        var baseValue = Math.pow(base, power);
        var c = codeString.charAt(i);
        result += baseValue * valueOfChar(c);
    }
    return result / this.decimalValue - this.maxNeg;
};

GeoConverter.prototype.numChars = 4;

// Helper function
var valueOfChar = function (c) {
    var i;
    for (i = 0; i < alphabet.length; i++) {
        if (alphabet[i] == c) return i;
    }
    return 0;
};

// Export
var converters = {
    latConverter: new GeoConverter(90, 500000),
    longConverter: new GeoConverter(180, 200000)
};

module.exports = converters;
