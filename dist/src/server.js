"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const api_1 = require("./routes/api");
const cloudinary_1 = __importDefault(require("cloudinary"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// Security headers
app.use((0, helmet_1.default)({
    referrerPolicy: { policy: "no-referrer" },
}));
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// function house(triangle: {m: number, n: number}, roof: { m: number, n: number}) {
//   let left = 5;
//   let right = 7;
//   for (let i = 1; i <= triangle.m; i++) {
//     let tShape = "";
//     for (let j = 1; j <= triangle.n; j++) {
//       if(i === 1 && j === 6) {
//         tShape += "*"
//       } else if (i === triangle.m || (i > 1 && i < triangle.m && (j === left || j === right))) {
//         tShape += "*";
//       } else {
//         tShape += " ";
//       }
//     }
//     console.log(tShape);
//     left -= 1;
//     right += 1;
//   }
// }
// console.log(house({m: 6, n: 12}, {m: 20, n: 20}));
// middlewares
app.use((req, res, next) => {
    express_1.default.json()(req, res, next);
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use("/", api_1.router);
// cloudinary config
// @ts-ignore
cloudinary_1.default.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const server = http_1.default.createServer(app);
// config port 4000
const port = process.env.PORT || 4000;
// run server port
server.listen(port, () => {
    console.log(`start at port ${port}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map