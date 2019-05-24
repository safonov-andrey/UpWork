const FIELD = {
    USER: 0,
    COMPANY: 1,
    ID: 2
};

/**
 * Function that for the given list of users returns how they should be displayed.
 * 
 * @param users - A list of users. Each user given as an array of 3 strings: [name, company, username].
 * @returns - A sorted list of users (first by name, then by label), each user represented as an array [name, label].
 */
export default function handleDuplicates(users) {
    const usersWithLabels = [];

    const duplicatesMap = groupBy(users, FIELD.USER);

    for (let userName in duplicatesMap) {
        if (duplicatesMap[userName].length > 1) {
            usersWithLabels.push(...getDuplicatedUsersWithLabels(duplicatesMap[userName]));
        } else {
            usersWithLabels.push([userName, '']);
        }
    }

    return sortUsers(usersWithLabels);
}

function groupBy(users, field) {
    const duplicatesMap = {};

    users.forEach(user => {
        const userName = user[field];
        if (duplicatesMap[userName]) {
            duplicatesMap[userName].push(user);
        } else {
            duplicatesMap[userName] = [user];
        }
    });
    
    return duplicatesMap;
}

function getDuplicatedUsersWithLabels(duplicates) {
    let usersWithLabels = [];

    const duplicatesCompaniesMap = groupBy(duplicates, FIELD.COMPANY);
    const duplicatesIDsMap = groupBy(duplicates, FIELD.ID);

    const areAllCompaniesEqual = Object.keys(duplicatesCompaniesMap).length == 1;
    const areAllIDsEqual = Object.keys(duplicatesIDsMap).length == 1;

    if (areAllIDsEqual) {
        usersWithLabels = duplicates.map(duplicate => [duplicate[FIELD.USER], duplicate[FIELD.COMPANY]]);
    } else if (areAllCompaniesEqual) {
        usersWithLabels = duplicates.map(duplicate => [duplicate[FIELD.USER], duplicate[FIELD.ID]]);
    } else {
        usersWithLabels = duplicates
            .map(duplicate => [duplicate[FIELD.USER], `${duplicate[FIELD.ID]} - ${duplicate[FIELD.COMPANY]}`]);
    }

    return usersWithLabels;
}

function sortUsers(users) {
    return users.sort((userA, userB) => {
        for (var i = 0; i < userA.length; i++) {
            if (userA[i] < userB[i]) {
                return -1;
            }
            if (userA[i] > userB[i]) {
                return 1;
            }
            if (i == userA.length - 1) {
                return 0;
            }
        }
    });
}
