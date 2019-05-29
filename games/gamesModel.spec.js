const db = require("../data/dbConfig.js");
const gamesDb = require("./gamesModel.js");
const server = require("../api/server.js");
const req = require("supertest");

describe("gamesModel", () => {
  describe("/POST insert()", () => {
    afterEach(async () => {
      await db("games").truncate();
    });

    it("should post both games and give a status of 201", async () => {
      await gamesDb.insert({
        title: "Mario Bros",
        genre: "Fun",
        releaseYear: "1990"
      });
      await gamesDb.insert({
        title: "Mario Cart",
        genre: "Fun",
        releaseYear: "1990"
      });
      const games = await db("games");
      expect(games[0].title).toBe("Mario Bros");
      expect(games).toHaveLength(2);
      expect(201);
    });

    it("should post single game", async () => {
      await gamesDb.insert({
        title: "Zelda",
        genre: "Fun",
        releaseYear: "1995"
      });
      const games = await db("games");
      expect(games[0].title).toBe("Zelda");
    });

    it("should return 422 when posting a game incorrectly", () => {
      return req(server)
        .post("/games")
        .send({ title: "fake" })
        .expect(422);
    });
  });
});
