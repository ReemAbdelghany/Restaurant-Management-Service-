const router = require("express").Router();
const { getUsers, createUser, getUserById, deleteUser, updateUser } = require("./controllers/userController");
const { getUserTypes, createUserType, getUserTypeById, deleteUserType, updateUserType } = require("./controllers/userTypeController");

// User Routes
router.get("/users", getUsers); // GET all users
router.post("/users", createUser); // CREATE a new user
router.get("/users/:id", getUserById); // GET a user by ID
router.delete("/users/:id", deleteUser); // DELETE a user by ID
router.put("/users/:id", updateUser); // UPDATE a user by ID

// UserType Routes
router.get("/userTypes", getUserTypes); // GET all user types
router.post("/userTypes", createUserType); // CREATE a new user type
router.get("/userTypes/:id", getUserTypeById); // GET a user type by ID
router.delete("/userTypes/:id", deleteUserType); // DELETE a user type by ID
router.put("/userTypes/:id", updateUserType); // UPDATE a user type by ID

// Default route
router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

module.exports = router;
