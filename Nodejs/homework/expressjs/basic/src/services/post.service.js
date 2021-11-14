import { Post, Tag } from '../models';

async function getAllPosts() {
    try {
        const posts = await Post.findAll();
        return posts;
    } catch (error) {
        throw error;
    }
}

async function getPostById(id) {
    try {
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
        return post;
    } catch (error) {
        throw error;
    }
}

async function createPost(post) {
    try {
        const newPost = await Post.create(post);
        newPost.setUser(post.user_id);
        if (post.tags) {
            // post.tags = {
            //     id: [1, 2, 3]
            // }
            const tags = await Tag.findAll({
                where: post.tags
            });
            newPost.setTags(tags);
        }
        newPost.save();
        return newPost;
    } catch (error) {
        throw error;
    }
}

async function updatePost(postData) {
    try {
        const updatedPost = await Post.findOne({
            where: {
                id: postData.id
            }
        });
        if (!updatedPost) {
            throw {
                message: 'Post not found'
            };
        }
        if (postData.tags) {
            const tags = await Tag.findAll({
                where: postData.tags
            });
            updatedPost.setTags(tags);
        }
        updatedPost.update(postData);
        return updatedPost;
    } catch (error) {
        throw error;
    }
}

async function deletePost(postId) {
    try {
        const deletedPost = await Post.findOne({
            where: {
                id: postId
            }
        });
        if (!deletedPost) {
            throw {
                message: 'Post not found'
            };
        }
        await deletedPost.destroy();
        return deletedPost;
    } catch (error) {
        throw error;
    }
}



export {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}