const router = require("express").Router();
const { getMenu, createMenu, getMenuById, updateMenu, deleteMenu } = require("./controllers/menuController");
const { getMenuType, createMenuType, getMenuTypeById, updateMenuType, deleteMenuType } = require("./controllers/menuTypeController");
const { getUsers, createUser, getUserById, deleteUser, updateUser } = require("./controllers/userController");
const { getUserTypes, createUserType, getUserTypeById, deleteUserType, updateUserType } = require("./controllers/userTypeController");
const { getCustomerById, createCustomer, getAllCustomers, updateCustomer, deleteCustomer } = require("./controllers/cutomerController");
const { createFeedback, getAllFeedback, getFeedbackById, updateFeedback, deleteFeedback } = require("./controllers/feedbackController");
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require("./controllers/orderController");

// Routes for Menu component
router.get("/menu", getMenu);
router.post("/menu/createMenu", createMenu);
router.get("/menu/getMenu/:id", getMenuById);
router.put("/menu/updateMenu/:id", updateMenu);
router.delete("/menu/deleteMenu/:id", deleteMenu);

// Routes for MenuType component
router.get("/menutype", getMenuType);
router.post("/menutype/createMenuType", createMenuType);
router.get("/menutype/getMenuType/:id", getMenuTypeById);
router.put("/menutype/updateMenuType/:id", updateMenuType);
router.delete("/menutype/deleteMenuType/:id", deleteMenuType);

// Routes for Order component
router.get("/order", getAllOrders);
router.post("/order/createOrder", createOrder);
router.get("/order/:id", getOrderById);
router.put("/order/updateOrder/:id", updateOrder);
router.delete("/order/deleteOrder/:id", deleteOrder);


// Routes for Customer component
router.get("/customer/:id", getCustomerById);
router.post("/customer/createCustomer", createCustomer);
router.get("/customer", getAllCustomers);
router.put("/customer/updateCustomer/:id", updateCustomer);
router.delete("/customer/deleteCustomer/:id", deleteCustomer);

// Routes for Feedback component
router.post("/feedback", createFeedback);
router.get("/feedback", getAllFeedback);
router.get("/feedback/:id", getFeedbackById);
router.put("/feedback/:id", updateFeedback);
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
