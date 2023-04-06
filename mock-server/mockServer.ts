import * as express from "express";
import {config} from "dotenv";
config();

const app = express();

app.get("/", (request, response) => {
    response.json([{
        to: "0x9f0b1ff9296FCA5865fCA1ECD1AAd80867205942",
        amount: 1000,
    },
    {
        to: "0xB3B09FF83c4708af12570200393EF014C76Bc925",
        amount: 6000,
    },
    {
        to: "0xb23e8C101A3C9D9337152aA9d9B992Cd9894075E",
        amount: 9000,
    }]);
});

app.listen(8075, () => {
    console.log(`Listening to server`);
});
