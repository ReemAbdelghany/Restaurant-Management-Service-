const router = require("express").Router();
const {getMenu,createMenu,getMenuById, updateMenu, deleteMenu}= require("./controllers/menuController");

router.get("/menu", getMenu);
router.post("/menu/createMenu", createMenu);
router.post("/menu/getMenu", getMenuById)
router.post("/menu/updateMenu", updateMenu)
router.delete("/menu/deleteMenu", deleteMenu)


router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});
module.exports = router;