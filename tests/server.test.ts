import { agent } from "supertest";
import app from "../src/app";

describe("Test the root path", () => {
  test("It should respond GET / method", async () => {
    const response = await agent(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: "OK",
    });
  });
});
