import { getPostsByUserId } from '../services/user.service';
import { getPostById } from '../services/post.service';

// mock redis
jest.mock('redis', () => ({
    RedisClient: { prototype: {} },
    createClient: jest.fn().mockReturnValue({
        get: jest.fn(function (id, callback) {
            callback(null, {
                id: id,
                context: 'title',
                user_id: 1,
                tags: [1]
            });
        }),
    })
}));

describe('Module User', () => {
    describe('get posts with given user id', () => {
        const user_id = 1;

        test('should return an object', async () => {
            const res = await getPostsByUserId(user_id);
            expect(res).toBeInstanceOf(Object);
        })

        test('should has context property', async () => {
            const res = await getPostsByUserId(user_id);
            expect(res[0]).toHaveProperty('context');
        })

        test('should has tags property', async () => {
            const res = await getPostsByUserId(user_id);
            expect(res[0]).toHaveProperty('tags');
        })
    })
})
describe('Module Post', () => {
    describe('get post by post id', () => {
        test('should return an object', async () => {
            const res = await getPostById(1);
            expect(res).toBeInstanceOf(Object);
        })

        test('should has context property', async () => {
            const res = await getPostById(1);
            expect(res).toHaveProperty('context');
        })

        test('should has tags property', async () => {
            const res = await getPostById(1);
            expect(res).toHaveProperty('tags');
        })
        
    })
    
})





