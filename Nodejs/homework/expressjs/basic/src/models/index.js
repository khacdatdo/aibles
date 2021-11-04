import sequelize from "./sequelize";
import User from "./user.model";
import Post from "./post.model";
import Tag from "./tag.model";

//  associations
User.hasMany(Post);
Post.belongsTo(User);
Post.belongsToMany(Tag, { through: "post_tag" });
Tag.belongsToMany(Post, { through: "post_tag" });



//  sync to database
(async function () {
    try {
        await sequelize.sync();
    } catch (error) {
        throw error;
    }
})();

export { User, Post, Tag };