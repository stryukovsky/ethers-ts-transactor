import axios from "axios";
import {config} from "dotenv";
import { FundRequest } from "./types";
config();

export const getFundRequests = async (): Promise<Array<FundRequest>> => {
    const url = `${process.env.SERVER_URL}/`;
    const response = await axios.get(url);
    return response.data;
}
