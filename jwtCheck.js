import expressjwt from "express-jwt";
import { request, response } from "express";
const jwtCheck = expressjwt(
    {
        secret     : "secretKey",
        algorithms : [ "HS256" ]
    },
    (request, response) => response.send(request.user)
);

export default jwtCheck;
