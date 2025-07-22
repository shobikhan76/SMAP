const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const User = require("../models/User");
const Store = require("../models/Store");

let token;
let storeId;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Register and login test user
  const userRes = await request(app).post("/api/users/register").send({
    name: "Store Tester",
    email: "store@test.com",
    password: "test1234",
    role: "admin",
  });

  token = userRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Store Routes", () => {
  it("should create a store", async () => {
    const res = await request(app)
      .post("/api/stores")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Demo Store",
        category: "Electronics",
        floor: "Ground",
        manager: "Alice",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Demo Store");
    storeId = res.body._id;
  });

  it("should fetch all stores", async () => {
    const res = await request(app)
      .get("/api/stores")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it("should fetch a single store by ID", async () => {
    const res = await request(app)
      .get(`/api/stores/${storeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", storeId);
  });

  it("should update a store", async () => {
    const res = await request(app)
      .put(`/api/stores/${storeId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Store",
        category: "Tech",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Store");
  });

  it("should delete a store", async () => {
    const res = await request(app)
      .delete(`/api/stores/${storeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});
