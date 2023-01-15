import server from "../app";
import request from "supertest";
import { INVALID_USER, VALID_USER } from "./jest.setup";
import { NOT_FOUND, OK } from "../utils/globals";

const VALID_REPO = "Hello-World";
const INVALID_REPO = "asdfasdfasdfasdfasdfasdfasdf";

describe("Testing the Repostiory Listing Functionality", () => {
  test("INVALID USER && INVALID REPO, It should repond with an 404 error.", (done) => {
    request(server)
      .get(`/repos/${INVALID_USER}/${INVALID_REPO}/languages`)
      .then((response) => {
        console.log(JSON.stringify(JSON.parse(response.text), null, 2));
        expect(response.statusCode).toBe(NOT_FOUND);
        done();
      });
  });
  test("INVALID USER && VALID REPO, It should repond with an 404 error.", (done) => {
    request(server)
      .get(`/repos/${INVALID_USER}/${VALID_REPO}/languages`)
      .then((response) => {
        console.log(JSON.stringify(JSON.parse(response.text), null, 2));
        expect(response.statusCode).toBe(NOT_FOUND);
        done();
      });
  });
  test("VALID USER && INVALID REPO, It should repond with an 404 error.", (done) => {
    request(server)
      .get(`/repos/${VALID_USER}/${INVALID_REPO}/languages`)
      .then((response) => {
        console.log(JSON.stringify(JSON.parse(response.text), null, 2));
        expect(response.statusCode).toBe(NOT_FOUND);
        done();
      });
  });
  test("VALID USER && VALID REPO, It should repond with an 200 OK.", (done) => {
    request(server)
      .get(`/repos/${VALID_USER}/${VALID_REPO}/languages`)
      .then((response) => {
        console.log(JSON.stringify(JSON.parse(response.text), null, 2));
        expect(response.statusCode).toBe(OK);
        done();
      });
  });
});
