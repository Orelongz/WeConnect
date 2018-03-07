import Business from './../models/businessModel';

const allBusinesses = [];

const createBusiness = (req, res) => {
  const {
    businessName, businessImage, category, address, city,
    state, phoneNumber, postalAddress, workHours, about
  } = req.body;

  let business = allBusinesses.find(eachBusiness => eachBusiness.businessName === businessName);
  if (business) {
    return res.status(409).json({
      message: `${businessName} already exists as a business name`
    });
  }
  business = new Business({
    businessName,
    businessImage,
    category,
    address,
    city,
    state,
    phoneNumber,
    postalAddress,
    workHours,
    about
  });
  allBusinesses.push(business);
  return res.status(201).json({
    message: 'Business successfully created',
    business
  });
};

export { createBusiness, allBusinesses };
