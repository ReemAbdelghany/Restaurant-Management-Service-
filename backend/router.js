const router = require("express").Router();
const {getMenu,createMenu,getMenuById, updateMenu, deleteMenu}= require("./controllers/menuController");
const {getMenuType,createMenuType,getMenuTypeById, updateMenuType, deleteMenuType}= require("./controllers/menuTypeController");
const { getUsers, createUser, getUserById, deleteUser, updateUser } = require("./controllers/userController");
const { getUserTypes, createUserType, getUserTypeById, deleteUserType, updateUserType } = require("./controllers/userTypeController");

//Routes for Menu component
router.get("/menu", getMenu);
router.post("/menu/createMenu", createMenu);
router.post("/menu/getMenu", getMenuById)
router.post("/menu/updateMenu", updateMenu)
router.delete("/menu/deleteMenu", deleteMenu)

//Routes for MenuType component
router.get("/menutype", getMenuType);
router.post("/menutype/createMenuType", createMenuType);
router.post("/menutype/getMenuType", getMenuTypeById)
router.post("/menutype/updateMenuType", updateMenuType)
router.delete("/menutype/deleteMenuType", deleteMenuType)
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
