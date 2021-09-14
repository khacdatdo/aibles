//  High order function

//  Ex1:
function isIncludedIn(words = []) {
    return bigram => words.some(word => {
        return word.includes(bigram);
    })
}

function canFind(bigrams = [], words = []) {
    const hasBigram = isIncludedIn(words);
    return bigrams.every(hasBigram);
}

console.log(canFind(["at", "be", "th", "au"], ["beautiful", "the", "hat"]));
console.log(canFind(["ay", "be", "ta", "cu"], ["maybe", "beta", "abet", "course"]));


//  Ex2:
function warOfNumbers(numbers = []) {
    let evenSum = 0;
    let oddSum = 0;
    numbers.forEach(number => {
        if (number % 2 == 0) {
            evenSum += number;
        } else {
            oddSum += number;
        }
    })
    return Math.abs(evenSum - oddSum);
}

console.log(warOfNumbers([12, 90, 75]));
console.log(warOfNumbers([5, 9, 45, 6, 2, 7, 34, 8, 6, 90, 5, 243]));


//  Ex3:
function orderAsc(number = 0) {
    return number.toString().split("").sort((a, b) => a - b).join('') * 1;
}

function orderDes(number = 0) {
    return number.toString().split("").sort((a, b) => b - a).join('') * 1;
}

function reorderDigits(array = [], order) {
    if (order === "asc") {
        return array.map(orderAsc);
    }
    else if (order === "desc") {
        return array.map(orderDes);
    }
}

console.log(reorderDigits([515, 341, 98, 44, 211], "asc"));
console.log(reorderDigits([63251, 78221], "desc"));
console.log(reorderDigits([1, 2, 3, 4], "asc"));
console.log(reorderDigits([1, 2, 3, 4], "desc"));


//  Ex4:
function maxPossible(a = 0, b = 0) {
    a = a.toString().split("");
    b = b.toString().split("").sort((x, y) => x - y);
    while (b.length > 0) {
        const temp = b.pop();
        const index = a.findIndex(e => e < temp);
        if (index !== -1) {
            a[index] = temp;
        }
    }
    return a.join("") * 1;
}

console.log(maxPossible(9328, 456));