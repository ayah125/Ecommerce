import { catcherror } from "../../middleware/catcherror.js";
import { usermodel } from "../../../databases/models/usermodel.js";

const addaddress = catcherror(async (req, res, next) => {
  let address = await usermodel.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { addresses: req.body } },
    { new: true }
  );

  !address && res.status(404).json({ message: "address not found" });
  address && res.json({ message: "success", address: address.addresses });
});
const removeaddress = catcherror(async (req, res, next) => {
  let address = await usermodel.findByIdAndUpdate(
    req.user.id,
    { $pull: { addresses: req.params.id } },
    { new: true }
  );

  !address && res.status(404).json({ message: "address not found" });
  address && res.json({ message: "Deleted!", address: address.addresses });
});
const getLoggetUseraddress = catcherror(async (req, res, next) => {
  let addresses = await usermodel.findById(req.user._id);
  addresses && res.json({ message: "success", addresses });
});
export { addaddress, removeaddress, getLoggetUseraddress };
