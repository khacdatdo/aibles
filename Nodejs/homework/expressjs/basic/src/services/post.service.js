import database from './db';
import { Post, Tag } from '../models';


async function getPostById(id) {
    try {
        // get post by id
        const post = await Post.findOne({
            where: {
                id: id
            },
            include: [{
                model: Tag,
                attributes: ['id', 'name']
            }],
        });
        if (!post) {
            throw {
                id: 'Not found'
            }
        }
        // return the post
        return post;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createPost(post) {
    try {
        //  create a new post
        const newPost = await Post.create(post);
        newPost.setUser(post.user_id);
        if (post.tags) {
            const tags = await Tag.findAll({
                where: {
                    id: post.tags
                }
            });
            newPost.setTags(tags);
        }
        //  return the new post
        return newPost;
    } catch (error) {
        throw error;
    }
}

async function updatePost(postData) {
    try {
        // update post
        const updatedPost = await Post.update(postData, {
            where: {
                id: postData.id
            },
            fields: ['context']
        });
        if (!updatedPost[0]) {
            throw {
                id: 'Not found'
            };
        }
        if (postData.tags) {
            const tags = await Tag.findAll({
                where: {
                    id: postData.tags
                }
            });
            const post = await Post.findOne({
                where: {
                    id: postData.id
                }
            });
            post.setTags(tags);
        }
        // return the updated post
        return postData;
    } catch (error) {
        throw error;
    }
}

async function deletePost(postId) {
    try {
        // delete post
        const deletedPost = await Post.destroy({
            where: {
                id: postId
            }
        });
        if (!deletedPost) {
            throw {
                id: 'Not found'
            };
        }
        // return the deleted post
        return postId;
    } catch (error) {
        throw error;
    }
}



export {
    getPostById,
    createPost,
    updatePost,
    deletePost
}