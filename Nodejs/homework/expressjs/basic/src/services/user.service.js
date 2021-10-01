import { users } from './users.db'

function createUser(user) {
    return new Promise(function (success, fail) {
        user.id = users.length + 1;
        users.push(user);
        success(users);
    });
}

function getUsers(ft) {
    return new Promise(function (success, fail) {
        const result = users.filter(function (user) {
            if (!ft.id && !ft.name && !ft.sex && !ft.age) {
                return true;
            }
            return (ft.id && ft.id * 1 == user.id)
                || (ft.name && user.name.toLowerCase().indexOf(ft.name.toLowerCase()) !== -1)
                || (ft.sex && ft.sex.toLowerCase() == user.sex.toLowerCase())
                || (ft.age && ft.age * 1 == user.age);
        });
        if (Math.ceil(result.length / ft.per_page) < ft.page) {
            success([]);
        }
        success(result.slice((ft.page - 1) * ft.per_page, ft.page * ft.per_page));
    })
}

function updateUser(user) {
    return new Promise(function (success) {
        users.forEach(function (u) {
            if (user.id * 1 == u.id) {
                u = Object.assign(u, user);
                return;
            }
        })
        success(users);
    })
}

function deleteUser(id) {
    return new Promise(function (success) {
        const result = users.filter(function (user) {
            return id * 1 !== user.id * 1;
        })
        success(result);
    })
}


export {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}