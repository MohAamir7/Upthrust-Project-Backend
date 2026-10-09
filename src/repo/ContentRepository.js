import Content from "../Schema/ContentModel.js";

export const findHomeContent = () => Content.findOne({ key: "home" }).lean();

export const saveHomeContent = (data) =>
  Content.findOneAndUpdate(
    { key: "home" },
    { $set: { data } },
    { upsert: true, new: true },
  ).lean();

export const deleteHomeContent = () => Content.deleteOne({ key: "home" });
