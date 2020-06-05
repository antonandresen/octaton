"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var helmet_1 = __importDefault(require("helmet"));
var twitch_1 = require("./twitch");
dotenv_1.default.config();
twitch_1.connectBot(process.env.TWITCH_USERNAME, process.env.TWITCH_TOKEN);
if (!process.env.PORT) {
    process.exit(1);
}
var PORT = process.env.PORT || 1337;
var app = express_1.default();
// Body parser
app.use(express_1.default.json());
// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
app.use(helmet_1.default());
app.use(cors_1.default());
app.get('/', function (req, res) {
    res.json({ name: 'octaton' });
});
app.listen(PORT, function () {
    return console.log("Server running in " + process.env.NODE_ENV + " mode on port " + PORT);
});
