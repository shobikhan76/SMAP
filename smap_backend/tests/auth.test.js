const request = require("supertest");
const app = require("../app"); // adjust path to your app.js or server.js
const mongoose = require("mongoose");
const User = require("../models/User");

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  const testUser = {
    name: "Test Admin",
    email: "admin@test.com",
    password: "admin123",
    role: "admin",
  };

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.email).toBe(testUser.email);
  });

  it("should not register duplicate email", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send(testUser);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User already exists/i);
  });

  it("should login an existing user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.email).toBe(testUser.email);
  });

  it("should fail login with wrong password", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: testUser.email,
        password: "wrongpassword",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Invalid credentials/i);
  });
});
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const User = require("../models/User");
const Store = require("../models/Store");
const Recommendation = require("../models/Recommendation");

let token;
let userId;
let storeId;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create test user and login
  const userRes = await request(app).post("/api/users/register").send({
    name: "Test User",
    email: "recommend@test.com",
    password: "pass1234",
    role: "user",
  });

  token = userRes.body.token;
  userId = userRes.body._id;

  // Create store
  const storeRes = await request(app)
    .post("/api/stores")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test Store",
      category: "Tech",
      floor: "1",
      manager: "John Doe",
    });

  storeId = storeRes.body._id;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Recommendation Routes", () => {
  let recommendationId;

  it("should create a recommendation", async () => {
    const res = await request(app)
      .post("/api/recommendations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user: userId,
        store: storeId,
        recommendationScore: 4.5,
        feedback: "Great experience!",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.feedback).toBe("Great experience!");
    recommendationId = res.body._id;
  });

  it("should fetch all recommendations", async () => {
    const res = await request(app)
      .get("/api/recommendations")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it("should fetch a specific recommendation by ID", async () => {
    const res = await request(app)
      .get(`/api/recommendations/${recommendationId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(recommendationId);
  });

  it("should update a recommendation", async () => {
    const res = await request(app)
      .put(`/api/recommendations/${recommendationId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ feedback: "Updated feedback", recommendationScore: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.feedback).toBe("Updated feedback");
  });

  it("should delete a recommendation", async () => {
    const res = await request(app)
      .delete(`/api/recommendations/${recommendationId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});
