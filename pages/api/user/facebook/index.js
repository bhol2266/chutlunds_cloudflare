import passport from "passport";
import"../../../../config/passportUser"

export default async function (req, res, next) {
   

  passport.authenticate("facebook", { scope: 'email' })(req, res, next);



}

export const runtime = "experimental-edge";
// router.route("/facebook").get(passport.authenticate('facebook', { scope: 'email' }), facebook);