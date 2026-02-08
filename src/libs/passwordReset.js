import crypto from "crypto";

export function generateRawToken() {
    return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}
