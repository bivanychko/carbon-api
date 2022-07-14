import {expect} from 'expect';
import request from 'supertest';
import {Express} from 'express';
import {Server} from 'http';

import {start} from '../bootstrap';

describe('AuthController', () => {
    let server: Server;
    let app: Express;

    beforeAll(() => {
        ({app, server} = start());
    });

    afterAll(() => {
        server.close();
    });

    describe('POST /login', () => {
        test('should return 400 BadRequest when user id is missed', async () => {
            const response = await request(app)
                .post('/login')
                .expect(400)

            expect(response.body.message).toBe('"id" is required');
        });

        test('should return 404 NotFound when user does not exist', async () => {
            const response = await request(app)
                .post('/login')
                .send({id: '4f4ec980-99c9-4ffc-af76-e4f33d582065'})
                .expect(404)

            expect(response.body.message).toBe('User with id 4f4ec980-99c9-4ffc-af76-e4f33d582065 does not exist. Use one of following: e3e897ff-8376-4bcd-bede-51e4c1b10762,cc027733-9323-4cba-abad-c46d02e1c5f3');
        });

        test('should return 200', async () => {
            await request(app)
                .post('/login')
                .send({id: 'e3e897ff-8376-4bcd-bede-51e4c1b10762'})
                .expect(200);
        });
    });

    describe('Auth middleware', () => {
        test('should return 401 Unauthorized when auth header is missed', async () => {
            const response = await request(app)
                .get('/carbons')
                .expect(401);

            expect(response.body.message).toBe('Authorization header not found.');
        });

        test('should return 401 Unauthorized when Bearer is missed in auth header', async () => {
            const response = await request(app)
                .get('/carbons')
                .set({'Authorization': 'test'})
                .expect(401);

            expect(response.body.message).toBe("Authorization header is not of type 'Bearer'.");
        });

        test('should return 401 Unauthorized when auth header does not match jwt pattern', async () => {
            const response = await request(app)
                .get('/carbons')
                .set({'Authorization': 'Bearer test'})
                .expect(401);

            expect(response.body.message).toBe("Authorization header value must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.");
        });

        test('should return 401 Unauthorized when signature is different', async () => {
            const response = await request(app)
                .get('/carbons')
                .set({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI'})
                .expect(401);

            expect(response.body.message).toBe('Invalid Jwt signature');
        })
    });
});
