
/** 
 * Check if two given strings are an anagram of eachother
 * 
 * @param {string} wordOne 
 * @param {string} wordTwo 
 * @returns 
 */
function checkAnagram (wordOne ="", wordTwo = "") {
    // Split string into sorted array and rejoin elements into sorted String
    let sortedWordOne = wordOne.split('').sort().join('');
    let sortedWordTwo = wordTwo.split('').sort().join('');

    const isAnagram = (sortedWordOne === sortedWordTwo) ? true : false;

    return isAnagram;
}

module.exports = checkAnagram;

// Execute function from the file (i.e. './angram.js')
if (typeof require !== 'undefined' && require.main === module) {
    const word1 = process.argv[2]
    const word2 = process.argv[3]
    if (word1 && word2) {
        console.log(`Is '${word1}' an anagram of '${word2}' ... `)
        const isAnagram = checkAnagram(word1, word2)
        console.log(`${isAnagram ? '  yes!' : '  nope.'}`)
        return isAnagram
    }
    else {
        console.log(
            `Error:  the function requires 2 string`, 
            `  Your args:  '${word1}', '${word2}'`
        )
        return;
    }
}