const Contact = require("../model/contact");

const listContacts = async (userId, query) => {
  // const results = await Contact.find({ owner: userId }).populate({
  //   path: " owner",
  //   select: "name enail gender",
  // });
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 20,
    page = 0,
  } = query;
  const optionsSearch = { owner: userId };
  if (favorite !== null) {
    optionsSearch.favorite = favorite;
  }
  const results = await Contact.paginate(optionsSearch, {
    limit,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "",
    populate: {
      path: " owner",
      select: "name enail gender",
    },
  });
  return results;
};

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: " owner",
    select: "name enail gender",
  });
  return result;
};

const removeContact = async (contactId) => {
  const { value: result } = await Contact.findOneAndRemove({ _id: contactId });
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contact.create({ owner: userId, ...body });
  return result;
};

const updateContact = async (userId, contactId, body) => {
  const { value: result } = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
