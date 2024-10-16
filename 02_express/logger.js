import { createLogger,format,transports } from "winston";
const {combine,timestamp,json,colorize} = format;

const consoleLogFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.json()
)

const logger = createLogger({
    level:'info',
    format:combine(
        colorize(),
        timestamp(),
        json()
    ),
    transports:[
        new transports.Console({
            format:consoleLogFormat
        }),
        new transports.File({
            filename:'logs/error.log',
            level:'error',
            format:consoleLogFormat
        }),
        new transports.File({
            filename:'logs/info.log',
            level:'info',
            format:consoleLogFormat
        })
  ]
}
);

export default logger

