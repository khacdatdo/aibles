import privateKey from "../config/auth";
import jwt from "jsonwebtoken";
import { ErrorCodes, responseWithError } from "../helpers";
import bcrypt from "bcrypt";

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
        .json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "No token provided"));

    try {
        const decoded = jwt.verify(token, privateKey);
        req.user = decoded;
        next();
    } catch (ex) {
        // if token expired, use refresh token to create new token
        if (ex.name === "TokenExpiredError") {
            return res.status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
                    .json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Token expired"));
        } else {
            return res.status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
                .json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Invalid token"));
        }
    }
}

function refreshToken(req, res) {
    const token = req.body.refreshToken;
    if (!token) return res.status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
        .json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "No refresh token provided"));

    try {
        const decoded = jwt.verify(token, privateKey);
        const newToken = createToken({ id: decoded.id });
        const newRefreshToken = createRefreshToken({ id: decoded.id });
        return res.json({
            token: newToken,
            refreshToken: newRefreshToken
        });
    } catch (ex) {
        // if token expired, use refresh token to create new token
        if (ex.name === "TokenExpiredError") {
            return res.status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
                .json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Refresh token expired"));
        } else {
            return res.status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
                .json(responseWithError(ErrorCodes.ERROR_CODE_UNAUTHORIZED, "Invalid refresh token"));
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
    createRefreshToken,
    hashPassword,
    checkPassword,
    refreshToken,
};