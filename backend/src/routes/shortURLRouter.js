import { Router } from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { deleteShortURLController, generateShortURLController, getShortURLController, updateShortURLController } from "../controllers/shortUrlController.js";

const shortURLRouter = Router();

shortURLRouter
  .route("/")
  .post(isLoggedIn, generateShortURLController);

shortURLRouter.route("/:shortURL").get(getShortURLController);

shortURLRouter.patch("/:shortURL", updateShortURLController)

shortURLRouter.delete("/:shortURL", deleteShortURLController)

export default shortURLRouter;