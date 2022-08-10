import { advertisementModel } from '../models/advertisement.js';

export function find(params) {
  try {
    const { shortText, description, userId, tags } = params;
    const searchParams = { isDeleted: false };

    if (shortText) {
      searchParams.shortText = { $regex: shortText };
    }
    if (description) {
      searchParams.description = { $regex: description };
    }
    if (userId) {
      searchParams.user = userId;
    }
    if (tags) {
      searchParams.tags = tags;
    }

    const advertisements = advertisementModel.find(searchParams);
    return advertisements
  } catch (error) {
    console.error(error);
  }
}

export function create(data) {
  try {
    data.createdAt = Date.now();
    data.updatedAt = Date.now();
    data.isDeleted = false;

    const newAdvertisement = new advertisementModel(data);
    return newAdvertisement.save()
  } catch (error) {
    console.error(error);
  }
}

export function remove(id) {
  try {
    const advertisement = advertisementModel.findByIdAndUpdate(id, {
      $set: { isDeleted: true }
    });
    return advertisement;
  } catch (error) {
    console.error(error);
  }
}

export function findById(id) {
  try {
    const advertisements = advertisementModel.findById(id);
    return advertisements;
  } catch (error) {
    console.error(error);
  }
}

export default {findById, find, remove, create}
