import { users } from './users.db'

async function createUser(user) {
    user.id = users.length + 1;
    users.push(user);
    return users;
}

async function getUsers(ft) {
    try {
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
            return [];
        }
        return result.slice((ft.page - 1) * ft.per_page, ft.page * ft.per_page);
    } catch (error) {
        console.log(error);
    }
}

async function updateUser(user) {
    users.forEach(function (u) {
        if (user.id * 1 == u.id) {
            u = Object.assign(u, user);
            return;
        }
    })
    return users;
}

async function deleteUser(id) {
    const result = users.filter(function (user) {
        return id * 1 !== user.id * 1;
    })
    return result;
}


export {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}