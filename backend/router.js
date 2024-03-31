const router = require("express").Router();
const { getMenu, createMenu, getMenuById, updateMenu, deleteMenu } = require("./controllers/menuController");
const { getMenuType, createMenuType, getMenuTypeById, updateMenuType, deleteMenuType } = require("./controllers/menuTypeController");
const { getUsers, createUser, getUserById, deleteUser, updateUser } = require("./controllers/userController");
const { getUserTypes, createUserType, getUserTypeById, deleteUserType, updateUserType } = require("./controllers/userTypeController");
const { getCustomerById, createCustomer, getAllCustomers, updateCustomer, deleteCustomer } = require("./controllers/customerController");
const { createFeedback, getAllFeedback, getFeedbackById, updateFeedback, deleteFeedback } = require("./controllers/feedbackController");

// Routes for Menu component
router.get("/menu", getMenu);
router.post("/menu/createMenu", createMenu);
router.post("/menu/getMenu", getMenuById);
router.post("/menu/updateMenu", updateMenu);
router.delete("/menu/deleteMenu", deleteMenu);

// Routes for MenuType component
router.get("/menutype", getMenuType);
router.post("/menutype/createMenuType", createMenuType);
router.post("/menutype/getMenuType", getMenuTypeById);
router.post("/menutype/updateMenuType", updateMenuType);
router.delete("/menutype/deleteMenuType", deleteMenuType);

// Routes for Customer component
router.get("/customer/:id", getCustomerById);
router.post("/customer/createCustomer", createCustomer);
router.get("/customer", getAllCustomers);
router.post("/customer/updateCustomer/:id", updateCustomer);
router.delete("/customer/deleteCustomer/:id", deleteCustomer);

// Routes for Feedback component
router.post("/feedback", createFeedback);
router.get("/feedback", getAllFeedback);
router.get("/feedback/:id", getFeedbackById);
router.post("/feedback/:id", updateFeedback);
router.delete("/feedback/:id", deleteFeedback);

// User Routes
router.get("/users", getUsers);
router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

// UserType Routes
router.get("/userTypes", getUserTypes);
router.post("/userTypes", createUserType);
router.get("/userTypes/:id", getUserTypeById);
router.delete("/userTypes/:id", deleteUserType);
router.put("/userTypes/:id", updateUserType);

// Default route
router.get("/", (req, res) => {
    res.send("Let's build a CRUD API!");
});

module.exports = router;
