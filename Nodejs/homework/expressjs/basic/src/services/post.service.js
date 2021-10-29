import mysql from 'mysql';
import database from "./db";
import redis from 'redis';
const postCache = redis.createClient();


function getPostById(id) {
    return new Promise(function (success, fail) {
        postCache.get(id, function (err, data) {
            if (err) return fail(err);

            if (data) return success(data);

            // if data is null, get from database
            const sql = 'SELECT * FROM aibles.posts where id = ?;';
            const queryData = {
                sql: sql,
                values: [id]
            };
            database.query(queryData, function (err, res, fields) {
                if (err) return fail(err);
                success(res);
            });
        })
    });
}

function getTags(tagIds = []) {
    // cache for tags in process
    const tags = [
        {
            id: 1,
            name: 'Sports'
        },
        {
            id: 2,
            name: 'Music'
        },
        {
            id: 3,
            name: 'Game'
        }
    ];
    return tags.filter(function (tag) {
        return tagIds.includes(tag.id);
    });
}

function updateTagsOfPost(postId, tags = []) {
    return new Promise(function (success, fail) {
        if (tags.length) {
            const sql = 'DELETE FROM `aibles`.`posts_tags` WHERE `post_id` = ?; '
                + 'INSERT INTO `aibles`.`posts_tags` (`post_id`, `tag_id`) VALUES ?;';
            const data = {
                sql: sql,
                values: [postId, tags.map(function (tag) {
                    return [postId, tag];
                })]
            }
            database.query(data, function (err, res, fields) {
                if (err) return fail(err);
                success(res);
            })
        } else {
            success({});
        }
    })
}

function createPost(post) {
    return new Promise(function (success, fail) {
        const sql = 'INSERT INTO `aibles`.`posts` (`context`, `time`, `user_id`) VALUES (?);';
        const data = {
            sql: sql,
            values: [
                [
                    post.context,
                    mysql.raw('CURRENT_TIMESTAMP()'),
                    post.user_id
                ]
            ]
        };
        database.query(data, function (err, res, fields) {
            if (err) return fail(err);
            updateTagsOfPost(res.insertId, post.tags)
                .then(function (updateRes) {
                    success(res);
                })
                .catch(function (e) {
                    fail(e);
                });
        });
    });
}

function updatePost(post) {
    return new Promise(async function (success, fail) {
        const sql = 'UPDATE `aibles`.`posts` SET ? WHERE `id` = ?;';
        const data = {
            sql: sql,
            values: [
                post.updates,
                post.id
            ]
        };
        database.query(data, function (err, res, fields) {
            if (err) return fail(err);
            if (post.tags) {
                updateTagsOfPost(post.id, post.tags)
                    .then(function (updateRes) {
                        success(res);
                    })
                    .catch(function (e) {
                        fail(e);
                    });
            } else {
                success(res);
            }
        })
    })
}

function deletePost(postId) {
    return new Promise(function (success, fail) {
        const sql = 'DELETE FROM `aibles`.`posts` WHERE `id` = ?;';
        const data = {
            sql: sql,
            values: [
                postId
            ]
        };
        database.query(data, function (err, res, fields) {
            if (err) return fail(err);
            success(res);
        })
    })
}



export {
    getTags,
    getPostById,
    createPost,
    updatePost,
    deletePost
}