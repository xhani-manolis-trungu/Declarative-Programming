const getEvenNumbers = limit => includeIfConditionIsMet(limit,    number => number % 2 === 0);

const getOddNumbers = limit => includeIfConditionIsMet(limit, number => number % 2 !== 0);

const getPrimeNumbers = limit => console.log(`Prime numbers and limit is ${limit}`);

const includeIfConditionIsMet = (limit = 10, predicate) => {
    return (function inner(array, number) {
        if (number === limit) {
            return array;
        }
        return inner(predicate(number) ? [...array, number] : array, number + 1);
    })([], 1);
};

const getSequenceIfElse = type => {
  if (type === 'even') {
    return getEvenNumbers(20)
  } else if (type === 'odd') {
    return getOddNumbers(43)
  } else if (type === 'prime') {
    return getPrimeNumbers(1234)
  } else {
    throw Error(`Invalid argument value ${type}`)
  }
}

getSequenceIfElse('odd')

// we could rewrite the getSequence method with a switch

const getSequenceSwitch = type => {
  switch(type) {
    case 'even':
      return getEvenNumbers(20);
    case 'odd':
      return getOddNumbers(43);
    case 'prime':
      return getPrimeNumbers(1234);
    default: 
      throw Error(`Invalid arguments value ${type}`);
  }
}

// we can also create a function which will create enumeration-like objects based on a passed parameter.

const asEnumeration = dictionary => {
  return Object.freeze({
    fromValue: value => {
      if (dictionary[value]) {
        return dictionary[value];
      }
      throw Error(`Invalid enumeration value ${value}`);
    }
  })
}

// This hides all the implementation details also , by providing a simplified API.

const numbersEnumeration = asEnumeration({
  'even': {
    getSequence: getEvenNumbers
  },
  'odd': {
    getSequence: getOddNumbers
  },
  'prime': {
    getSequence: getPrimeNumbers
  }
})

// if we need to just add a new object to the mapping dictionary (the changes are done in only one place now : numbersEnumeration method)

// console.log(numbersEnumeration.fromValue('even')) // consoles : {getSequence: [Function: getEvenNumbers]}

const getSequence = (type, wanted) => numbersEnumeration.fromValue(type).getSequence(wanted);
console.log(getSequence('even', 10))