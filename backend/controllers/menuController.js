const Menu = require("../models/Menu");

const getMenu = (req, res) => {
  Menu.find()
  .then(menu => res.json(menu))
  .catch(err => res.send(err));

  };

const getMenuById = (req, res) => {
  Menu.findById(req.body.id)
  .then(menu => res.json(menu))
  .catch(err => res.send(err));

  };

  const updateMenu = (req, res) => {
    const updateData = {
      dish_name: req.body.dish_name,
      dish_description: req.body.dish_description,
      dish_price: req.body.dish_price,
    };
  
    Menu.findByIdAndUpdate(req.body.id, updateData, { new: true })
      .then(updatedMenu => {
        if (!updatedMenu) {
          return res.status(404).json({ message: "Menu not found" });
        }
        res.json(updatedMenu);
      })
      .catch(err => {
        console.error("Error updating menu:", err);
        res.status(500).send("Internal server error");
      });
  };
  

  
const deleteMenu = (req, res) => {
  Menu.findByIdAndDelete(req.body.id)
  .then(menu => res.json(menu))
  .catch(err => res.send(err));

  };
  
const createMenu = async (req, res) => {
    const menu = new Menu({
        dish_name: req.body.dish_name,
        dish_description: req.body.dish_description,
        dish_price: req.body.dish_price,
    });
  
    try {
      const savedMenu = await menu.save();
      console.log("inserted");
      res.json(savedMenu);
    } catch (err) {
      res.send(err);
    }
  };
  
module.exports = {
  getMenu,createMenu,getMenuById,updateMenu,deleteMenu
};
