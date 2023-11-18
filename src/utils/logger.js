import winston, { transports } from "winston";

const customLevelOptions = {
    level: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'cyan',
        http: 'blue',
        debug: 'white'
    }
}

const developmentLogger = winston.createLogger({
    levels: customLevelOptions.level,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        }),

        new winston.transports.File({
            filename: './errors.log',
            level: "warning",
            format: winston.format.simple()
        })
    ]
})

const productionLogger = winston.createLogger({
    levels: customLevelOptions.level,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            )
        })
    ]
})

export const addLogger = (req, res, next) => {
    if (process.env.STAGE == 'development') {
        req.logger = developmentLogger
        req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`)
    }else{
        req.logger = productionLogger 
        req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`)
    }
    next()
}