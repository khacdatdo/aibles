import database from './db';

function createUser(user) {
    return new Promise(function (success, fail) {
        const data = {
            sql: `INSERT INTO aibles.users (name, age) VALUES (?);`,
            values: [[user.name, user.age]]
        };
        database.query(data, function (err, res, fields) {
            if (err) {
                fail(err);
            }
            success(res);
        });
    })
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

function getUsersWithPosts(limit = 100) {
    return new Promise(function (success, fail) {
        const sql = `select id as uid, name, json_arrayagg(json_object('id', pid, 'context', context, 'time', time, 'tags', tags)) as posts from users
                    left join (
                        select posts.id as pid, context, time, user_id as uid, json_arrayagg(json_object('id', tid, 'name', tname)) as tags from posts
                        left join (
                            select post_id, tags.id as tid, tags.name as tname from posts_tags, tags where posts_tags.tag_id = tags.id
                        ) as t on posts.id = post_id
                        group by id 
                    ) as p on users.id = p.uid
                    group by id;`;
        database.query(sql, [limit], function (err, res, fields) {
            if (err) return fail(err);
            res.forEach(function (u) {
                u.posts = JSON.parse(u.posts);
            })
            success(res);
        })
    })
}

function getUserWithPostsById(id, limit = 2) {
    return new Promise(function (success, fail) {
        const sql = `select id, context, time, json_arrayagg(json_object('id', tid, 'name', tname)) as tags from posts
                    left join (
                        select tags.id as tid, tags.name as tname, post_id from tags, posts_tags where tags.id = tag_id
                    ) as t on id = t.post_id
                    where user_id = ?
                    group by id
                    order by time desc
                    limit ?;`;
        const data = {
            sql: sql,
            values: [id, limit * 1]
        };
        database.query(data, function (err, res, fields) {
            if (err) return fail(err);
            res.forEach(function (p) {
                p.tags = JSON.parse(p.tags);
            })
            success(res);
        })
    })
}


export {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    getUsersWithPosts,
    getUserWithPostsById
}