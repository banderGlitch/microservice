import Product from "../models/Product.js";

// export const getAllProducts = async (req, res) => {
//     const products = await Product.find();
//     res.json(products);
// };


export const getAllProducts = async (req, res) => {
  try {
    const { search, category, page = 1 , limit = 10} = req.query

    const query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (category) query.category = category;

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
        Product.find(query).skip(skip).limit(Number(limit)),
        Product.countDocuments(query)
    ]);
    res.json({
        data: products,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / limit)
        }
      });

  } catch(err) {
    res.status(500).json({ message : 'Server error',  error: err.message })
  }
};



export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
};


export const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
};

export const updateProduct = async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
};


export const deleteProduct = async (req, res) => {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
};




