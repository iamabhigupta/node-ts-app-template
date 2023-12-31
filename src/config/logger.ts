import winston from "winston";
import { Config } from ".";

const logger = winston.createLogger({
   level: "info",
   format: winston.format.json(),
   defaultMeta: { service: "auth-service" },
   transports: [
      new winston.transports.File({
         dirname: "logs",
         filename: "combined.log",
         level: "info",
         silent: Config.NODE_ENV === "test",
      }),
      new winston.transports.File({
         dirname: "logs",
         filename: "error.log",
         level: "error",
         silent: Config.NODE_ENV === "test",
      }),
      new winston.transports.Console({
         level: "info",
         format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
         ),
      }),
   ],
   silent: Config.NODE_ENV === "test",
});

// if (process.env.NODE_ENV !== "production") {
//    logger.add(
//       new winston.transports.Console({
//          format: winston.format.simple(),
//       }),
//    );
// }

export default logger;
