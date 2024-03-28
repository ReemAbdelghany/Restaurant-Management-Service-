const router = require("express").Router();
const { getMenu, createMenu, getMenuById, updateMenu, deleteMenu } = require("./controllers/menuController");
const { getMenuType, createMenuType, getMenuTypeById, updateMenuType, deleteMenuType } = require("./controllers/menuTypeController");
const { getCustomerById, createCustomer, getAllCustomers, updateCustomer, deleteCustomer} = require("./controllers/cutomerController");
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
router.get("/customer/:id", getCustomerById); // Assuming getCustomerById is a function in your customerController.js
router.post("/customer/createCustomer", createCustomer); // Assuming createCustomer is a function in your customerController.js
router.get("/customer", getAllCustomers); // Assuming getAllCustomers is a function in your customerController.js
router.post("/customer/updateCustomer/:id", updateCustomer); // Assuming updateCustomer is a function in your customerController.js
router.delete("/customer/deleteCustomer/:id", deleteCustomer); // Assuming deleteCustomer is a function in your customerController.js

// Routes for Feedback component
router.post("/feedback", createFeedback); // Create a new feedback
router.get("/feedback", getAllFeedback); // Get all feedback
router.get("/feedback/:id", getFeedbackById); // Get feedback by ID
router.post("/feedback/:id", updateFeedback); // Update feedback by ID
router.delete("/feedback/:id", deleteFeedback); // Delete feedback by ID

router.get("/", (req, res) => {
    res.send("Let's build a CRUD API!");
});

module.exports = router;
