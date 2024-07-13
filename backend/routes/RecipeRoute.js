const express = require("express");
const { body } = require("express-validator");
const RecipesController = require("../controllers/RecipeController");
const handelErrorMessage = require("../middleware/handelErrorMessage");
const router = express.Router();

router
  .get("/", RecipesController.index)
  .post(
    "/",
    [
      body("title").notEmpty(),
      body("description").notEmpty(),
      body("ingredients").notEmpty().isArray({ min: 3 }),
    ],
    handelErrorMessage,
    RecipesController.store
  )
  .get("/:id", RecipesController.show)
  .patch("/:id/update", RecipesController.update)
  .delete("/:id/delete", RecipesController.delete);

module.exports = router;
