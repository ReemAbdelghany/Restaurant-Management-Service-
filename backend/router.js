const router = require("express").Router();
const {getMenu,createMenu,getMenuById, updateMenu, deleteMenu}= require("./controllers/menuController");
const {getMenuType,createMenuType,getMenuTypeById, updateMenuType, deleteMenuType}= require("./controllers/menuTypeController");

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

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});
module.exports = router;