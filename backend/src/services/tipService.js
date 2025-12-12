import { readDb, writeDb } from "../../database/database.js";
import crypto from "node:crypto";

export default {
  async findAll() {
    // TODO: get ahold of the db using readDb();
    const db = await readDb();
    // TODO: return the tips from the db
    return db.tips;
  },

  async create({ title, userId }) {
    // TODO: get ahold of the db using readDb();
    const db = await readDb();
    // TODO: create a tip object containing { id: "some-random-id", title, userId }
    const tip = {
      id: crypto.randomUUID(),
      title: title,
      userId: userId
    }
    // TODO: push the tip object into tips list in the database
    db.tips.push(tip);
    // TODO: write changes to database with await writeDb(db)
    await writeDb(db);
    // TODO: return the id of the created tip
    return tip.id;
  },

  async update({ id, title, userId }) {
    // TODO: get ahold of the db using readDb();
    const db = await readDb();
    // TODO: find a tip in the db whose id & userId matches the incoming id & userId
    let tip = null;
    for (const dbTip of db.tips) {
      if (dbTip.id === id && dbTip.userId === userId) {
        tip = dbTip;
        break;
      }
    }
    // TODO: if there is no matching tip, return false.
    if (tip === null) {
      return false;
    }
    // TODO: otherwise, set the found tip's title to the incoming title
    tip.title = title;
    // TODO: write changes to database with await writeDb(db)
    await writeDb(db);
    // TODO: return true
    return true;
  },

  async remove({ id, userId }) {
    // TODO: get ahold of the db using readDb();
    const db = await readDb();
    // TODO: find the INDEX of the tip in the db whose id & userId match the incoming id & userId
    const index = db.tips.findIndex(dbTip => dbTip.id === id && dbTip.userId === userId );
    // TODO: if there is no index (-1), return false.
    // TODO: otherwise, use splice to delete from db.tips the tip based on the index
    if (index === -1) {
      return false;
    } else {
      db.tips.splice(index, 1);
    }   
    // TODO: write changes to database with await writeDb(db)
    await writeDb(db);
    // TODO: return true
    return true;
  },
};
