import Media from "../Schema/MediaModel.js";

export const createMedia = (mediaData) => Media.create(mediaData);
export const findMediaById = (id) => Media.findById(id);
