import jwt from "jsonwebtoken";
import crypto from "crypto";


const {privateKey, publicKey} = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: "spki",
        format: "pem"
    },
    privateKeyEncoding: {
        type: "pkcs8",
        format: "pem"
    }
});

// sign in with private key 

export const signToken = (payload,options={})=>{
     const jti = crypto.randomUUID();
    const token = jwt.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        issuer: process.env.JWT_ISS || "smart-note-api",
        jwtid: jti,
        ...options,
    });
    return {token, jti}
}


// verify jasonwebtoken with public key


export const verifyToken = (token) => {
   return jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
    issuer: process.env.JWT_ISS || "smart-note-api",
  });
};