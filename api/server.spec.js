const supertest = require("supertest");

const server = require("./server");
const db = require("../database/db-config");

const user = {
    username: "lol123",
    password: 123
}

afterEach(async () => {
    await db("users").truncate();
}) // Runs a function after each one of the tests in this file completes. If the function returns a promise, Jest waits for that promise to resolve before continuing

describe("server", () => {
    describe("it can run tests", () => {
        it("can run the tests", () => {
            expect(true).toBeTruthy();
        });
    });

    describe("GET / ", () => {
        it("should return http status code 200 OK", () => {
            return supertest(server)
            .get("/")
            .then(response => {
                expect(response.status).toBe(200);
            });
        });

        it("should return {message: 'Server is up! }", () => {
            return supertest(server)
            .get("/")
            .then(response => {
                expect(response.body).toEqual({message: "Server is up!" });
                expect(response.body).toBeDefined();
                expect(response.body.message).toBe("Server is up!");
            })
        })
    })

    describe("GET /:id", () => {
        it("should return an array", () => {
            return supertest(server)
            .get("/api/users")
            .then(response => {
                // console.log("this is response/bdy", response.body);
                expect(Array.isArray(response.body)).toBe(true);
            })
        })
        it("should return an array of 4 elements", () => {
            return supertest(server)
            .get("/api/users")
            .then(response => {
                expect(response.body).toHaveLength(0);
            })
        });
    })

    describe("POST /", () => {
        it("should add a user", () => {
            return supertest(server)
            .post("/api/users")
            .send(user)
            .then(response => {
                // console.log("this is response/bdy", response.body[0]);
                expect(response.body[0]).toStrictEqual({ id: 1, username: 'lol123', password: '123' });
            })
        })
        it("should return status code 201", () => {
            return supertest(server)
            .post("/api/users")
            .send(user)
            .then(response => {
                expect(response.status).toBe(201);
            })
        })

        it("should have a length of one ", () => {
            return supertest(server)
            .post("/api/users")
            .send(user)
            .then(response => {
                expect(response.body).toHaveLength(1);
            })
        })
    })

    describe("DELETE /", () => {
        it("should delete a user", async () => {
            try {
                await supertest(server)
                .post("/api/users")
                .send(user)
                .then(response => {
                    expect(response.body).toHaveLength(1);
                    return supertest(server)
                    .delete("/api/users/1")
                    .then(response => {
                        expect(response.body).toMatchObject([{"id": 1, "password": "123", "username": "lol123"}]);
                    })
                })
            } catch (error){
                throw error;
            }
        })
        it("should return 200 code status", () => {
            try {
                return supertest(server)
                .post("/api/users")
                .send(user)
                .then(() => {
                    return supertest(server)
                    .delete("/api/users/1")
                    .then(response => {
                        expect(response.status).toBe(200);
                    })
                })
            } catch(error) {
                throw error;
            }
        })
    })
});