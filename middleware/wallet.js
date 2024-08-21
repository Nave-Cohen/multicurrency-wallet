const { Router } = require("express");
const router = Router();

router.use((req, res, next) => {
  if (!req.session.mnemonic) {
    res.redirect("/");
  } else {
    next();
  }
});

module.exports = router;
