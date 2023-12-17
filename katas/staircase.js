// There's a staircase with N steps, and you can climb 1 or 2 steps at a time. 
//   Given N, write a function that returns the number of unique ways you can climb the staircase. 
//   The order of the steps matters.
//
// For example, if N is 4, then there are 5 unique ways:
//     1, 1, 1, 1
//     2, 1, 1
//     1, 2, 1
//     1, 1, 2
//     2, 2
//
// What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? 
//      For example, if X = {1, 3, 5}, 
//      you could climb 1, 3, or 5 steps at a time. Generalize your function to take in X. 

const DEFAULT_STEP_OPTIONS = [1, 2]

class StairCase {
    static getSteps(steps, stepOptions = DEFAULT_STEP_OPTIONS) {
        for (let i; i < steps.length; i++) {
            
        }
    }

    static getStepsArray (steps, stepOptions = DEFAULT_STEP_OPTIONS) {
        const solutions = [];
        const solutionKeys = [];
        
        // Change steps to number if string
        const numberOfSteps = (typeof steps === 'string') ? Number.parseInt(steps) : steps;
        
        // Check if even or odd
        const isEven = (steps % 2 === 0 && steps >= 0) ? true : false;
        
        // Find Minimal Steps first and calculate steps
        const largestStep = this.findLargestNumInArr(stepOptions);
        const minSolution = [];
        if (largestStep <= steps) {
            if (largestStep % steps === 0) {
                for (let i; i < largestStep / steps; i++) {
                    minSolution.push(largestStep);
                }
                solutions.push(minSolution);
                solutionKeys.push(minSolution.join(''));
            } else {
                let stepsLeft = steps;
                while (largestStep <= stepsLeft) {
                    minSolution.push(largestStep);
                    stepsLeft = stepsLeft - largestStep;
                }
                if (stepsLeft > 0) {
                    let foundLastStep = (stepOptions.includes(stepsLeft)) ? stepOptions[stepOptions.indexOf(stepsLeft)] : false;
                    if (foundLastStep) {
                        minSolution.push(foundLastStep);
                        solutions.push(minSolution);
                        solutionKeys.push(minSolution.join(''));
                    }
                }
            }
        }

        return solutions;
        
    }

    static getMinimalSteps (steps, stepOptions = DEFAULT_STEP_OPTIONS) {
        
    }

    static findLargestNumInArr(arr = []) {
        // Sort array
        const sortedArr = arr.sort((x, y) => x - y);
        // Return last element
        return sortedArr.pop();
    }
}

module.exports = StairCase;