import {
  createMedia,
  findMediaById,
} from "../repo/MediaRepository.js";

export const saveMedia = (mediaData) => createMedia(mediaData);
export const getMedia = (id) => findMediaById(id);
