
import AuthController from '../controller/auth_controller.js'
import { app } from '../index.js';
import supertest from 'supertest'
import request from 'supertest'
import userRoute from '../route/user_route'


describe("GET / ", () => {
    test("It should respond with a object message", async () => {
      const response = await request(app).get("/");
      expect(response.body).toEqual({message: "We are Live!"});
      expect(response.statusCode).toBe(200);
    });
});


describe("GET /users ", () => {
    test("It should respond with a users lastname", async () => {
      const response = await request(app).get("/api/users");
      expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({lastname: 'Omoloja'}),
      expect.objectContaining({lastname: 'Ogbe'})
    ])
  );
      expect(response.statusCode).toBe(200);
    });
});

describe("GET /users", () => {
    test("It should respond with properties id, firstname,lastname", async () => {
      const response = await request(app).get("/api/users");
      expect(response.body[0]).toHaveProperty("user_id");
      expect(response.body[0]).toHaveProperty("email");
      expect(response.body[0]).toHaveProperty("firstname");
      expect(response.body[0]).toHaveProperty("lastname");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("POST /users", () => {
    test("It responds with the newly created user", async () => {
      const newUser = await request(app)
        .post("/api/register")
        .send({
          email: 'newuser@gmail.com',
          firstname: "New",
          lastname: 'User',
          password: 'newuser1'
        });
      // make sure we add it correctly
      expect(newUser.statusCode).toBe(200);
    });
  });