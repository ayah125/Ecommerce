import { catcherror } from "../../middleware/catcherror.js";

export const deletOne = (model) => {
  return catcherror(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);
    !document && res.status(404).json({ message: "document  not found" });
    document && res.json({ message: "deleted!", document });
  });
};
export const getalldocuments = (model) => {
  return catcherror(async (req, res, next) => {
    let documents = await model.find({});
    res.json({ message: "documents:", documents });
  });
};
export const getone = (model) => {
  return catcherror(async (req, res, next) => {
    let document = await model.findById(req.params.id);
    !document && res.status(404).json({ message: "document not found" });
    document && res.json({ message: "success", document });
  });
};
