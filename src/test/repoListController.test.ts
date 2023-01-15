import request from "supertest";
import server from "../app";
import { NOT_FOUND, OK } from "../utils/globals";
import { INVALID_USER, VALID_USER } from "./jest.setup";

describe("Testing the Repostiory Listing Functionality", () => {
  test("INVALID USER, It should repond with an 404 error.", (done) => {
    request(server)
      .get(`/users/${INVALID_USER}/repos}`)
      .then((response) => {
        console.log(JSON.stringify(JSON.parse(response.text), null, 2));
        expect(response.statusCode).toBe(NOT_FOUND);
        done();
      });
  });

  test("VALID USER, It should repond with an 200 status code.", (done) => {
    request(server)
      .get(`/users/${VALID_USER}/repos`)
      .then((response) => {
        console.log(JSON.stringify(JSON.parse(response.text), null, 2));
        expect(response.statusCode).toBe(OK);
        done();
      });
  });
});
