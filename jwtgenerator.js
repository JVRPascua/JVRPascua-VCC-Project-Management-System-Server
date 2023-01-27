import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; 

dotenv.config();

function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 60*60})
}

export default jwtGenerator;