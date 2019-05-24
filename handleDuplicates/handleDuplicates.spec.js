import handleDuplicates from 'handleDuplicates';

const MAX_USERS_AMOUNT = 100;
const MAX_TIME_SPENT = 4000;

const samePersonTwoCompanies = areArraysEqual(
    handleDuplicates([
        ["John Doe", "Doe Industries", "john.doe.88"],
        ["John Doe", "Doe Limited", "john.doe.88"]
    ]), [
        ["John Doe", "Doe Industries"],
        ["John Doe", "Doe Limited"]
    ]);

const differentPersonsSameCompany = areArraysEqual(
    handleDuplicates([
        ["John Doe", "Doe Industries", "john.doe.88"],
        ["John Doe", "Doe Industries", "thejohn"]
    ]), [
        ["John Doe", "john.doe.88"],
        ["John Doe", "thejohn"]
    ]);

const differentPersonsSomeInSameCompany = areArraysEqual(
    handleDuplicates([
        ["John Doe", "Doe Industries", "john.doe.88"],
        ["John Doe", "Doe Industries", "thejohn"],
        ["John Doe", "Doe Limited", "john.doe.88"]
    ]), [
        ["John Doe", "john.doe.88 - Doe Industries"],
        ["John Doe", "john.doe.88 - Doe Limited"],
        ["John Doe", "thejohn - Doe Industries"]
    ]);

const twoDifferentPersons = areArraysEqual(
    handleDuplicates([
        ["John Doe", "Doe Industries", "john.doe.88"],
        ["Jane Doe", "Doe Industries", "jane"]
    ]), [
        ["Jane Doe", ""],
        ["John Doe", ""]
    ]);

const testPerfomanceArray = [];
for (let i = 0; i < MAX_USERS_AMOUNT; i++) {
    testPerfomanceArray.push([`Name${getRandomNumber(10)}`, `Name${getRandomNumber(15)}`, `Name${50}`]);
}
const startTime = new Date().getTime();
handleDuplicates(testPerfomanceArray);
const endTime = new Date().getTime();
const isPerfomanceFit = endTime - startTime < MAX_TIME_SPENT;

const areAllTestsPass =
    samePersonTwoCompanies &&
    differentPersonsSameCompany &&
    differentPersonsSomeInSameCompany &&
    twoDifferentPersons &&
    isPerfomanceFit;

console.log(`TESTS ARE ${areAllTestsPass ? 'PASS' : 'FAILED'}
    samePersonTwoCompanies, should use company names as labels: ${samePersonTwoCompanies}
    differentPersonsSameCompany, should use usernames as labels: ${differentPersonsSameCompany}
    differentPersonsSomeInSameCompany, should use both username and company name: ${differentPersonsSomeInSameCompany}
    twoDifferentPersons, should not use labels: ${twoDifferentPersons}
    isPerfomanceFit, should be executed for the less then ${MAX_TIME_SPENT/1000} seconds, for ${MAX_USERS_AMOUNT} users: ${isPerfomanceFit}
`);

function areArraysEqual(arrA, arrB) {
    if (arrA.length !== arrB.length) {
        return false;
    }

    for (let i = 0; i < arrA.length; i++) {
        if (arrA[i] instanceof Array) {
            if (!areArraysEqual(arrA[i], arrB[i])) {
                return false;
            }
        } else if (arrA[i] !== arrB[i]) {
            return false;
        }
    }

    return true;
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
