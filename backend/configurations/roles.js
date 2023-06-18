const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const roles = (() => {
  ac.grant("customer")
    .readAny("item")
    .createOwn("order")
    .readOwn("order")
    .updateOwn("profile");

  ac.grant("supplier")
    .createOwn("item")
    .readAny("item")
    .updateOwn("item")
    .deleteOwn("item")
    .createAny("category")
    .deleteOwn("item");

  ac.grant("driver").updateOwn("profile");
  ac.grant("expert").updateOwn("profile");

  ac.grant("admin")
    .extend("driver")
    .extend("expert")
    .extend("supplier")
    .extend("customer")
    .updateAny("profile")
    .deleteAny("profile");

  return ac;
})();

module.exports = {
  roles,
};
