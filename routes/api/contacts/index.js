const express = require("express");
const { ValidationError } = require("joi");
const router = express.Router();
const ctrl = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard");

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

router
  .get("/", guard, ctrl.getAll)
  .post("/", guard, validationCreateContact, ctrl.create);

router
  .get("/:contactId", guard, validateMongoID, ctrl.getById)
  .delete("/:contactId", guard, validateMongoID, ctrl.remove)
  .put(
    "/:contactId",
    guard,
    validateMongoID,
    validationUpdateContact,
    ctrl.update
  );

router.patch(
  "/:contactId/favorite",
  guard,
  validationUpdateStatusContact,
  ctrl.update
);

module.exports = router;
