const request = require('supertest');
const server = require('../api/server');

// /register endpoint
describe('POST /register', () => {
	it('should return 201', () => {
		return request(server)
			.post('/api/auth/register')
			.send({
				// must set username to new username for every test to run successfully
				username: "jaytee3",
				password: "yuh"
			})
			.then(res => {
				// check if the status code is 201
				expect(res.status).toBe(201);
			})
	});

	it('should return 500', () => {
		return request(server)
			.post('/api/auth/register')
			.send({
				username: "jaytee",
				password: "yuh"
			})
			.then(res => {
				expect(res.status).toBe(500);
			})
	})
});


// login endpoint
describe('POST /login', () => {
	it('should return 200 OK', () => {
		return request(server)
			.post('/api/auth/login')
			.send({
				username: "jaytee",
				password: "yuh"
			})
			.then(res => {
				expect(res.status).toBe(200);
			})
	});

	it('should return 401 Unauthorized', () => {
		return request(server)
			.post('/api/auth/login')
			.send({
				username: "jaytee",
				password: "yuhh"
			})
			.then(res => {
				expect(res.status).toBe(401);
			})
	});
});