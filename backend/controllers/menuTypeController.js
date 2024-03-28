const MenuType = require("../models/MenuType");

const getMenuType = (req, res) => {
  MenuType.find()
  .then(menuType => res.json(menuType))
  .catch(err => res.send(err));

  };

const getMenuTypeById = (req, res) => {
  MenuType.findById(req.body.id)
  .then(menuType => res.json(menuType))
  .catch(err => res.send(err));

  };

  const updateMenuType = (req, res) => {
    const updateData = {
      dish_type: req.body.dish_type,
      meal_type: req.body.meal_type,
      diet_type: req.body.diet_type,
    };
  
    MenuType.findByIdAndUpdate(req.body.id, updateData, { new: true })
      .then(updatedMenuType => {
        if (!updatedMenuType) {
          return res.status(404).json({ message: "Menu type not found" });
        }
        res.json(updatedMenuType);
      })
      .catch(err => {
        console.error("Error updating menu type:", err);
        res.status(500).send("Internal server error");
      });
  };
  

  
const deleteMenuType = (req, res) => {
  MenuType.findByIdAndDelete(req.body.id)
  .then(menuType => res.json(menuType))
  .catch(err => res.send(err));

  };
  
const createMenuType = async (req, res) => {
    const menuType = new MenuType({
        dish_type: req.body.dish_type,
        meal_type: req.body.meal_type,
        diet_type: req.body.diet_type,
    });
  
    try {
      const savedMenuType = await menuType.save();
      console.log("inserted");
      res.json(savedMenuType);
    } catch (err) {
      res.send(err);
    }
  };
  
module.exports = {
  getMenuType,createMenuType,getMenuTypeById,updateMenuType,deleteMenuType
};
