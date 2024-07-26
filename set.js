const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0o2T2RrVWhFcDlwQWRNTHk0b3I0UnptTXJUN2tpbkM0V1JrN09jeUtsUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGhrMzVEaXNuL3NLeWJRVzh4ckhUTUU0SGM2dWxwb3lYczFZRHBmTk4wVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTRE9FY3JRd1VBempGV3pjRStYUTNLZlFWdTlmY3JXeE56UnhEb21pcFZvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtTmVQZWFkeG5jaHUrZWs0MW13UGFnZkN6WFhtTkNFeWJ3MXZwTHkyUVNrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndIc2VxN20rUzZrcVNUclVWQWtpeDdlT1haRkpRcXhOZ1VIcWljSUx2bTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlUeUd5VU5KQWRsMTlOblgxdWg0WGp3MUNaYkhFNUZIR1hlSlZJNlZEaE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1Bpd2tlUXNIUmxmQzhXMTJaZFdQZkt0b1Z4VkZmSCtCVVNmWnhjV1MyRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU9vSkM0d3MzK0hNeUljYm9OVkozRFVXd0lCNWsyM04wcEJqcmtlV1VUdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlDY3J3UUhwV29YRWVKajNKWTRDMmRuNGdDVHoxZy9veTMwbEg5dTlWODdENFk0QThPN2Z2cVFJOUIrVVJlMXFVMzJ0WTRneGtkK3paa0RVcE5FN0NRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM5LCJhZHZTZWNyZXRLZXkiOiJwQk5sODMxUzZ5MC96Yjc4Zk1NdDJZM0dsV1VUcVd2QWl6d3VTeDR2RHFNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnbktBSldfTVI5dVZ2ZGFuRlVMX1pRIiwicGhvbmVJZCI6ImM0OGNjN2YxLWVkM2MtNGE3MS05NzJkLWRlMDhkMWUzYTJhZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxQUdNVkFVV1doY09MRHkxR0xwVzU5Umk0bHM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWloxMURKekV0WnVGcFJDSmJKZ3RVSFVKRHFNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNYMTFOSlNHIiwibWUiOnsiaWQiOiIyMjg5OTg2OTYwMTo2MUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTDNjdUp3REVKU3hqclVHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoia1hBWTVpWHJjeDN4MjI1NWgreVB3eEgwL2paZXBmQjUycSttcG15ZlBDZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiV3Y5dlNXcGM1WDhGaTlOT1gzRXdiK0tmZmdlc09DUURnWTFBTCtKc1ZTNzdMeCtXNmo1VHlkZW5aQlA2ZTJGQ1Nic1YzU202cDFROTRCNklmTStGRHc9PSIsImRldmljZVNpZ25hdHVyZSI6IlpsdG4ydXFvTk1MRXBlSkZNVnVvc0dXWnpFQ1ZIb1B5bEswek9WUFBoWDZuVGVGZFlyTER6dFlIMlVrRUk1MlV0WE1Wa2ppbDB0cVUzQlZRUUV6N0FRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI4OTk4Njk2MDE6NjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWkZ3R09ZbDYzTWQ4ZHR1ZVlmc2o4TVI5UDQyWHFYd2VkcXZwcVpzbnp3byJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTk5NzQ3M30=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Kurosaki Israfel",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "22896870256", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'on',
    BOT : process.env.BOT_NAME || 'SCP Foundation Bot',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || 'online',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "off",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
