import "dotenv/config";

import app from "./app";

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.info(`Application started. Running on port ${port}`);
  if (process && process.send) process.send("ready");
});
