const { Router } = require("express");
const router = Router();

router.use((req, res, next) => {
  if (!req.session.mnemonic) {
    res.status(302).end(); // Explicit 302 (temporary) redirect
  } else {
    next();
  }
});

module.exports = router;
