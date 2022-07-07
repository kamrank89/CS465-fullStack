/* Requiring Packages */
const mongoose = require("mongoose");
const host = process.env.DB_HOST || "127.0.0.1";
const dbURI = `mongodb://${host}/travlr`;
const readLine = require("readline");

mongoose.set("useUnifiedTopology", true);

const connect = () => {
  setTimeout(
    () =>
      mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
      }),
    1000
  );
};

mongoose.connection.on("connected", () => {
  "Mongoose is connected";
});
mongoose.connection.on("error", (err) => {
  `Mongoose is not connected: ${err}`;
});
mongoose.connection.on("disconnected", () => {
  "Mongoose is disconnected";
});

if (process.platform === "win32") {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on("SIGUSR2", () => {
    process.emit("SIGUSR2");
  });
}

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});
process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  gracefulShutdown("Heroku app shutdown", () => {
    process.exit(0);
  });
});

connect();

require("./travel");
