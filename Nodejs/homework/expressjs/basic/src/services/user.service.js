import database from './db';
import { Post, Tag, User } from '../models';
import { createToken, createRefreshToken } from '../middleware/auth';


async function login(user) {
    try {
        const data = await User.findOne({
            where: {
                username: user.username,
                password: user.password
            }
        })
        if (!data) {
            throw {
                message: 'Username or password is incorrect'
            };
        }
        const token = createToken(data.toJSON());
        const refreshToken = createRefreshToken(data.toJSON());
        return { token, refreshToken };
    } catch (error) {
        throw error;
    }
}

async function createUser(user) {
    try {
        const token = createToken(user);
        const refreshToken = createRefreshToken(user);
        const newUser = await User.create(Object.assign(user));
        newUser.save();
        return Object.assign(newUser.toJSON(), { token, refreshToken });
    } catch (error) {
        throw error;
    }
}

async function getUsers(ft) {
    try {
        const filter = {};
        if (ft.id) filter.id = ft.id;
        if (ft.name) filter.name = ft.name;
        if (ft.sex) filter.sex = ft.sex;
        if (ft.age) filter.age = ft.age;
        const users = await User.findAll({
            where: filter,
            limit: ft.per_page * 1,
            offset: ft.per_page * (ft.page - 1),
            attributes: {
                exclude: ['password']
            }
        });
        return users;
    } catch (error) {
        throw error;
    }
}

async function updateUser(user) {
    try {
        const userUpdated = await User.update(user, {
            where: {
                id: user.id
            }
        });
        if (!userUpdated) {
            throw {
                id: 'Not found'
            };
        }
        return userUpdated;
    } catch (error) {
        throw error;
    }
}

async function deleteUser(id) {
    try {
        const user = await User.destroy({
            where: {
                id
            }
        });
        if (!user) {
            throw {
                id: 'Not found'
            };
        }
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUsersWithPosts(limit = 100) {
    try {
        const data = await User.findAll({
            include: [{
                model: Post,
                attributes: ['id', 'context', 'time'],
                include: [
                    {
                        model: Tag,
                        attributes: ['id', 'name']
                    }
                ]
            }],
            limit: limit
        })
        return data;
    } catch (error) {
        throw error;
    }
}

async function getPostsByUserId(id, limit = 2) {
    try {
        const data = await User.findOne({
            include: [{
                model: Post,
                attributes: ['id', 'context', 'time'],
                include: [
                    {
                        model: Tag,
                        attributes: ['id', 'name']
                    }
                ],
                limit: limit
            }],
            where: {
                id: id
            },
        })
        if (!data) {
            throw {
                id: 'Not found'
            };
        }
        return data;
    } catch (error) {
        throw error;
    }
}


export {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    getUsersWithPosts,
    getPostsByUserId,
    login
}