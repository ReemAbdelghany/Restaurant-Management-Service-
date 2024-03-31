const router = require("express").Router();
const { getMenu, createMenu, getMenuById, updateMenu, deleteMenu } = require("./controllers/menuController");
const { getMenuType, createMenuType, getMenuTypeById, updateMenuType, deleteMenuType } = require("./controllers/menuTypeController");
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require("./controllers/orderController");
const { createOrderType, getAllOrderTypes, getOrderTypeById, updateOrderType, deleteOrderType } = require("./controllers/orderTypeController"); 

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

// Routes for Order component
router.get("/order", getAllOrders); // Get all orders
router.post("/order/createOrder", createOrder); // Create a new order
router.get("/order/:id", getOrderById); // Get order by ID
router.post("/order/updateOrder/:id", updateOrder); // Update order by ID
router.delete("/order/deleteOrder/:id", deleteOrder); // Delete order by ID

// Routes for OrderType component
router.get("/ordertype", getAllOrderTypes); // Get all order types
router.post("/ordertype/createOrderType", createOrderType); // Create a new order type
router.get("/ordertype/:id", getOrderTypeById); // Get order type by ID
router.post("/ordertype/updateOrderType/:id", updateOrderType); // Update order type by ID
router.delete("/ordertype/deleteOrderType/:id", deleteOrderType); // Delete order type by ID

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

module.exports = router;
