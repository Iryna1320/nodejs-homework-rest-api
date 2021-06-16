const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validateMongoID,
} = require("./validation");

router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router.get("/", ctrl.getAll).post("/", validationCreateContact, ctrl.create);

router
  .get("/:contactId", validateMongoID, ctrl.getById)
  .delete("/:contactId", validateMongoID, ctrl.remove)
  .put("/:contactId", validateMongoID, validationUpdateContact, ctrl.update);

router.patch(
  "/:contactId/favorite",
  validationUpdateStatusContact,
  ctrl.update
);

module.exports = router;
