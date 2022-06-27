import { accessToken } from "./accessToken.model";

describe("JWTtoken", () => {
  it("should create an instance", () => {
    expect(new accessToken()).toBeTruthy();
  });
});
