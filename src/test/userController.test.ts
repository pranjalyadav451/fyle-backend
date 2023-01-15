import server from "../app";
import request from "supertest";
import { NOT_FOUND, OK } from "../utils/globals";
import { INVALID_USER, VALID_USER } from "./jest.setup";

describe("UserController", () => {
  describe("GET /users/:username", () => {
    test("It should respond with a 404 error for an invalid user", (done) => {
      request(server)
        .get(`/users/${INVALID_USER}`)
        .then((response) => {
          console.log(JSON.stringify(JSON.parse(response.text), null, 2));
          expect(response.statusCode).toBe(NOT_FOUND);
          done();
        });
    });

    test("It should respond with a 200 status code for a valid user", (done) => {
      request(server)
        .get(`/users/${VALID_USER}`)
        .then((response) => {
          console.log(JSON.stringify(JSON.parse(response.text), null, 2));
          expect(response.statusCode).toBe(OK);
          done();
        });
    });
  });
});
