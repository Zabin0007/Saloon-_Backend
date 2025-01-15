const {json} = require("express")
const product = require("../Models/productSchema")

exports.addProductAPI = async(req,res)=>{
    console.log('inside the AddProduct API');
    const{title,productName,price,size} = req.body
    const productImg = req.file.filename

    try{
        const products = await product.findOne({productName})
        if(products){
            res.status(401).json("Already Existing")
        }else{
            const newProduct = new product({
                title,productName,price,size,productImg
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    }
    catch(err){
        res.status(406).json(err)
    }
}   

exports.getProductsAPI = async(req,res)=>{
    console.log('inside the viewproducts API');
    try{
        const allProducts = await product.find()
        res.status(200).json(allProducts)
    }
    catch(err){
        res.status(406).json(err)
    }
}

exports.editProductApi = async(req,res)=>{
    console.log('inside the editProduct API');
    const{title,productName,price,size,productImg} = req.body
    const updateImg = req.file ? req.file.filename : productImg
    const{productId} = req.params
    try{
       const editedProduct = await product.findByIdAndUpdate({_id:productId},
        {
            title:title,
            productName:productName,
            price:price,
            size:size,
            productImg:updateImg
        }
       )
       await editedProduct.save()
       res.status(200).json(editedProduct)
    }
    catch(err){
        res.status(406).json(err)
    }
}   

exports.deleteProductApi = async(req,res)=>{
    console.log("inside the delete api");
    const{productId} = req.params
    try{
            const deleteProducts = await product.findByIdAndDelete({_id:productId})
            res.status(200).json(deleteProducts)
    }
    catch(err){
        res.status(406).json(err)
    }
}

