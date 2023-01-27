import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(' ')[1];
        let decodedData;

        decodedData = jwt.verify(token, 'test');
        req.users_id = decodedData?.id;
        req.username = decodedData?.username;

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;