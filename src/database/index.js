import mongoose from "mongoose";

import databaseConfig from "../config/database";
class Database {
  constructor() {
    this.mongo();
  }
  mongo() {
    mongoose.connect(databaseConfig.mongo.hosts, databaseConfig.mongo.config);
    mongoose.connection.on("connected", () => {
      console.log("[MONGODB] Connection sucessfuly stablished");
    });
  }
}
export default new Database();
