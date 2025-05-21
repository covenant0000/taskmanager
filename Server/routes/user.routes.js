// const express = require("express");
// const userController = require("../controllers/user.controller");

// const router = express.Router();

// router.post("/signup", userController.signup);
// router.post("/login", userController.login);

// module.exports = router;

// const express = require("express");
// const userController = require("../controllers/user.controller");
// const validate = require("../middleware/validate");
// const { createUserSchema, loginUserSchema } = require("../validation/userValidation");

// const router = express.Router();

// router.post("/signup", validate(createUserSchema), userController.signup);
// router.post("/login", validate(loginUserSchema), userController.login);

// module.exports = router;

// const express = require('express');
// const userController = require('../controllers/user.controller');
// const validate = require('../middleware/validate');
// const { createUserSchema } = require('../validation/userValidation');

// const router = express.Router();

// router.post('/signup', validate(createUserSchema), userController.signup);
// router.post('/login', userController.login);

// module.exports = router;

const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// Example user routes
router.get('/', userController.getUsers);
// Add more user-specific routes here...

module.exports = router;