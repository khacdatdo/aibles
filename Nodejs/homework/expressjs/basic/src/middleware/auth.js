import privateKey from "../config/auth";
import jwt from "jsonwebtoken";
import { ErrorCodes, responseWithError } from "../helpers";


function auth(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
        .json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "No token provided"));

    try {
        const decoded = jwt.verify(token, privateKey);
        req.user = decoded;
        next();
    } catch (ex) {
        // if token expired, use refresh token to create new token
        if (ex.name === "TokenExpiredError") {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) return res.status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
                .json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "No refresh token provided"));

            try {
                const decoded = jwt.verify(refreshToken, privateKey);
                const newToken = createToken(decoded);
                const newRefreshToken = createRefreshToken(decoded);
                res.cookie("token", newToken, { httpOnly: true });
                res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
                req.user = decoded;
                next();
            } catch (ex) {
                return res.status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
                    .json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Invalid refresh token"));
            }
        } else {
            return res.status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
                .json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Invalid token"));
        }
    }
}

// create new token
function createToken(data) {
    return jwt.sign(data, privateKey, { expiresIn: '1h' });
}

// create new refresh token
function createRefreshToken(data) {
    return jwt.sign(data, privateKey, { expiresIn: '7d' });
}

export {
    auth,
    createToken,
    createRefreshToken
};