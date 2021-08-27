const { TestWatcher } = require("jest");
const request = require("supertest");
const app = require("../..//app");
const newTodo = require("../mock-data/new-todo.json");


const endpointUrl = "/todos/";

let firstTodo;


describe(endpointUrl, () => {
    test("Get" + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
        firstTodo = response.body[0];
    });
    test("GET by ID" + endpointUrl + ":todoId", async () => {
        const response = await request(app).get(endpointUrl + firstTodo._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.done).toBe(firstTodo.done);
    });
    test("GET todoby Id doesn't exist"+ endpointUrl + ":todoId", async()=>{
        const response = await request(app).get(endpointUrl + "612386df9aaa05f4be42b5da")
        expect(response.statusCode).toBe(404);
    } )
    it("POST" + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    });

    it("should return error 500 on malformed data with POST" + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send({ title: "Missing done property" })
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({
            message: "Todo validation failed: done: Path `done` is required."
        });
    });
})