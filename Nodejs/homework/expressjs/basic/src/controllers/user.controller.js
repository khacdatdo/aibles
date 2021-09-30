import { respondSuccess } from '../helpers';

import { createUser, deleteUser, getUsers, updateUser } from '../services/user.service';

async function create(req, res) {
    try {
        const user = req.body;
        const users = await createUser(user);
        return res.json(respondSuccess(users));
    } catch (error) {
        return res.json();
    }
}

async function get(req, res) {
    try {
        const default_filter = {
            id: null,
            name: null,
            sex: null,
            age: null,
            per_page: 20,
            page: 1
        }
        const filter = req.query;
        const users = await getUsers(Object.assign(default_filter, filter));
        return res.json(respondSuccess(users));
    } catch (error) {
        return res.json();
    }
}

async function update(req, res) {
    try {
        const user = req.body;
        const users = await updateUser(user);
        return res.json(respondSuccess(users));
    } catch (error) {
        return res.json()
    }
}

async function remove(req, res) {
    try {
        const {
            id
        } = req.body;
        const users = await deleteUser(id);
        return res.json(respondSuccess(users));
    } catch (error) {
        return res.json()
    }
}


export {
    create,
    get,
    update,
    remove
}
