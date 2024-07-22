const express = require("express");
const { body } = require("express-validator");
const RecipesController = require("../controllers/RecipeController");
const handelErrorMessage = require("../middleware/handelErrorMessage");

const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware");

const upload = require("../utils/upload")

router
  .get("/" , RecipesController.index)
  .post(
    "/",
    AuthMiddleware,
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
  .post("/:id/upload", [
    body("photo").custom((value, {req}) => {
      if(!req.file) throw new Error("Image is required")

      if(!req.file.mimetype.startsWith("image")) throw new Error("Image is required")

        return true
    })
  ], upload.single("photo"), handelErrorMessage,  RecipesController.upload)
  .delete("/:id/delete", RecipesController.delete);

module.exports = router;
