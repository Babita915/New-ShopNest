const categoryRepository = require("../respository/category.respository");

const createCategory = async (req, res) => {
    try {
      const {name} =  req.body;
      const categories = await categoryRepository.createCategory(name);
      res.status(201).json({
        success: true,
        data: categories
      })
    } catch(error) {
        res.status(500).json({
        success: false,
        message: error.message
        })
    }
}


const getCategory = async (req, res) => {
  try{
    const categories = await categoryRepository.getCategory()
    res.json(categories)
  } catch (error){
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


const getCategoryById = async (req, res) => {
  try {
    const {id} = req.params;
    const categories = await categoryRepository.getCategoryById(id);
    if(!categories) {
      return res.status(404).json({
        success: false,
        message: "Categories Not found"
      })
    }

    res.status(200).json({
      succcess: true,
      message: "Categories is found",
      data: categories
    })
  } catch(error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const categories = await categoryRepository.updateCategory(id, name);

    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      data: categories
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteCategory = async (req, res) => {
   try {
    const {id} = req.params;
    const categories = await categoryRepository.deleteCategory(id);

    if(!categories) {
      return res.status(404).json({
        success: false,
        message: "Categories Not Found"
      })
    } 
    return res.status(200).json({
      success: true,
      message: "Category Delete Successfully"
    })
   } catch(error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
   }
}

module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory 
}