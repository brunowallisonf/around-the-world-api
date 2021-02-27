import mongoose from "mongoose";

import { mongo } from "../config/database";
class Database {
  mongo() {
    mongoose.connect(mongo.hosts, mongo.config);
  }
}
