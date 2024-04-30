const express = require("express");
const UserRouter = require("./user")
const BlogRouter = require("./blog")
const cors = require("cors");

const router = express.Router();

router.use(cors())
router.use("/user", UserRouter);
router.use("/blog", BlogRouter)

module.exports = router;