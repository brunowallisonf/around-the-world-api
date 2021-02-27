require("dotenv/config");

export default {
  mongo: {
    hosts: process.env.MONGODB_CONNECTION,
    config: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      poolSize: 5,
    },
  },
};
