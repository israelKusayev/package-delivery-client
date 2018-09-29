"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var server = express();
server.listen(3000, function () {
    console.log("mock server listening on port " + 3000);
});
