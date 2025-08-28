import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5050;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on Port ${PORT}`)
})

