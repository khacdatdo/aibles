import database from './db';
import { Post, Tag, User } from '../models';
import { createToken, createRefreshToken, hashPassword, checkPassword } from '../middleware/auth';


async function login(user) {
    try {
        const data = await User.findOne({
            where: {
                username: user.username
            }
        })
        const hash = checkPassword(user.password, data.password);
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
        user.password = hashPassword(user.password);
        const newUser = await User.create(user);
        newUser.save();
        return Object.assign(newUser.toJSON());
    } catch (error) {
        if (error.name = 'SequelizeUniqueConstraintError') {
            throw {
                message: 'Username already exists'
            }
        }
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
        if (user.password) {
            user.password = hashPassword(user.password);
        }
        const userUpdated = await User.findOne({
            where: {
                id: user.id
            }
        });
        if (!userUpdated) {
            throw {
                message: 'User not found'
            };
        }
        userUpdated.update(user);
        return userUpdated;
    } catch (error) {
        throw error;
    }
}

async function deleteUser(id) {
    try {
        const user = await User.findOne({
            where: {
                id
            }
        });
        if (!user) {
            throw {
                message: 'User not found'
            };
        }
        user.destroy();
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
            limit: limit,
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
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
                message: 'User not found'
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