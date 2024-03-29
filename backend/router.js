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
router.get("/order", getAllOrders);
router.post("/order/createOrder", createOrder);
router.post("/order/getOrder", getOrderById);
router.post("/order/updateOrder", updateOrder);
router.delete("/order/deleteOrder", deleteOrder);

// Routes for OrderType component
router.get("/ordertype", getAllOrderTypes);
router.post("/ordertype/createOrderType", createOrderType);
router.post("/ordertype/getOrderType", getOrderTypeById);
router.post("/ordertype/updateOrderType", updateOrderType);
router.delete("/ordertype/deleteOrderType", deleteOrderType);

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

module.exports = router;
