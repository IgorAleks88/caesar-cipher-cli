const alph_low = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const alph_upp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

cipher = function (inputArr, shift)  {
    // console.log(typeof shift);
    if (shift < 0) {
        shift = 25 + shift;
    }
    const result = [];
    for (let i = 0; i < inputArr.length; i += 1) {
        if (alph_low.indexOf(inputArr[i]) > -1) {
            let newIndex = alph_low.indexOf(inputArr[i]) + shift;
            if (newIndex > 25) {
                newIndex -= 26;
            }
            result.push(alph_low[newIndex]);
        } else if (alph_upp.indexOf(inputArr[i]) > -1) {
            let newIndex = alph_upp.indexOf(inputArr[i]) + shift;
            if (newIndex > 25) {
                newIndex -= 26;
            }
            result.push(alph_upp[newIndex]);
        } else {
            result.push(inputArr[i]);
        }
    }
    // console.log(result);
    return result
}

module.exports.cipher = cipher;