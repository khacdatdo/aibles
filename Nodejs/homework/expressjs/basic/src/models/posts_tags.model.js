import { DataTypes } from 'sequelize'
import sequelize from '.'
import Post from './post.model';
import Tag from './tag.model';

const Posts_Tags = sequelize.define('Posts_Tags', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'id'
        }
    },
    tag_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Tag,
            key: 'id'
        }
    }
});

export default Posts_Tags;