import request from 'supertest';
import app from '../config/express';


describe('GET /users', () => {
    describe('get all users with non given filter', () => {

        test('should return an object', async () => {
            const response = await request(app).get('/users');
            expect(response.body).toBeInstanceOf(Object);
        })

        test('should has status code 422', async () => {
            const response = await request(app).get('/users');
            expect(response.statusCode).toBe(422);
        })

        test('should has property errors', async () => {
            const response = await request(app).get('/users');
            expect(response.body).toHaveProperty('errors');
        })
    })

})


describe('GET /users/userId/posts', () => {
    describe('get posts by user id', () => {
        jest.mock('mysql', () => ({
            createConnection: jest.fn().mockReturnValue({
                query: jest.fn(function (query, callback) {
                    callback(null, [{
                        id: 1,
                        title: 'title',
                        body: 'body',
                        userId: 1
                    }]);
                })
            })
        }));

        test('should return an object', async () => {
            const response = await request(app).get('/users/1/posts');
            expect(response.body).toBeInstanceOf(Object);
        })

        test('should has status code 200', async () => {
            const response = await request(app).get('/users/1/posts');
            expect(response.statusCode).toBe(200);
        })

        test('should has property data', async () => {
            const response = await request(app).get('/users/1/posts');
            expect(response.body).toHaveProperty('data');
        })
    })

})


describe('GET /posts/:id', () => {
    describe('get post by id', () => {
        jest.mock('redis', () => ({
            createClient: jest.fn().mockReturnValue({
                get: jest.fn().mockReturnValue(null),
            })
        }));


        jest.mock('mysql', () => ({
            createConnection: jest.fn().mockReturnValue({
                query: jest.fn(function (query, callback) {
                    callback(null, [{
                        id: 1,
                        title: 'title',
                        body: 'body',
                        userId: 1
                    }]);
                })
            })
        }));

        test('should return an object', async () => {
            const response = await request(app).get('/posts/1');
            expect(response.body).toBeInstanceOf(Object);
        })

        test('should has status code 200', async () => {
            const response = await request(app).get('/posts/1');
            expect(response.statusCode).toBe(200);
        })

        test('should has property data', async () => {
            const response = await request(app).get('/posts/1');
            expect(response.body).toHaveProperty('data');
        })
    })

})



