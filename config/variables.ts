import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT,
    base_url: process.env.BASE_URL,
}