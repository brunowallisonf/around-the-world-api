export default {
  mongo: {
    hosts: process.env.MONGO_CONNECTION,
    config: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      poolSize: 5,
    },
  },
};
