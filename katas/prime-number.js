// Prompt: 
//    Function to:  Check if a given number is a prime number
    
/** `range` - local func to create Array of _`start`# _ to: _`stop`# _ with incremental `step`
 * * _example:_ 
 * ```javascript
 *   range(2, 5, 1) // returns [2, 3, 4, 5]
 * ```
 * 
 * @param {number|undefined} start 
 * @param {number|undefined} stop 
 * @param {number|undefined} step 
 * @returns 
 */
const range = (start=2, stop=5, step=1) => {
    return Array.from(
        {length: (stop - start) / step + 1}, 
        (_, i) => start + (i * step)
    )
}

const isPrimeNumber = (num) => {
    /* Invalid input check => throw Error */
    if (!num || typeof num !== "number" || !isFinite(num)) {
        throw new Error("The input was invalid! ==> " + `${num}`)
    }

    let isPrime = false;

    /* Even num check */
    if (num % 2 === 0) { return isPrime }

    /* Divisible by 3 - 
        - add up individual digits and % by 3 
        - unnecessary for a computer, but a cool trick regardless
    */
    const isDivisByThree = num
        .toString()
        .split('')
        .map(x=>Number(x))
        .reduce((x,y)=>x+y,0) % 3 === 0
    if (isDivisByThree) { return isPrime }

    /* The real check - 
        if => any # (up to ~half of 'num') is divisible to num */
    isPrime = true;

    for (let x of range(2, Math.ceil(num / 2))) {
        let isNotPrime = num % x === 0
        if (isNotPrime) {
            isPrime = false;
            break;
        }
    }

    return isPrime;

}

const checkIfPrimeWithRegex = (num) => {
    const regEx = /^1?$|^(11+?)\1+$/
    return !(Array(num + 1).join(1).match(regEx))
}

const lazyCheckIfPrimeNumber = (num) => {
    
    const validNumRange = ([
        2, 3, 5, 7, 11, 13, 17, 
        19, 23, 29, 31, 37, 41, 
        43, 47, 53, 59, 61, 67, 
        71, 73, 83, 89, 97, 101, 
        103, 107
    ]);

    if (num > validNumRange[validNumRange.length - 1]) {
        return "'meh'"
    }
    
    return validNumRange.includes(num)
}

    
module.exports = {
    isPrimeNumber,
    checkIfPrimeWithRegex,
    lazyCheckIfPrimeNumber
}

if (require.main === module) {
    const logMsg = (num, bool) => `${num} is ${!bool ? 'NOT' : ''} a prime number`;
    // Array of test cases
    const testVals = [5, 121, 137, 329, 11]
    // Test each value
    testVals.forEach(val => {
        const isPrimeLazyCheck = lazyCheckIfPrimeNumber(val);
        const isPrimeRegex = checkIfPrimeWithRegex(val);
        const isPrimeRealCheck = isPrimeNumber(val);
        console.log("---------------------------------------------");
        console.log(`${val}:  `)
        console.log(`  lazy check - ${isPrimeLazyCheck}`);
        console.log(`  regex check - ${isPrimeRegex}`);
        console.log(`  real check - ${isPrimeRealCheck}`);
        console.log("---------------------------------------------");
        return isPrimeRealCheck;
        
    })
}