const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
    //console.log("*******Query Parameters:", { category, brand, sortBy });

    let filters = {};

    if (typeof category === "string" && category.length) {
      filters.category = { $in: category.split(",").map(cat => cat.toLowerCase()) };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",").map(cat => cat[0].toUpperCase() + cat.slice(1).toLowerCase()) };
    }

    //console.log("*****Filters:", filters);

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    //console.log("Sort:", sort);

    const products = await Product.find(filters).sort(sort);
    // console.log("Products:", products)
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.error("Error in getFilteredProducts:", e); // Log the error
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
