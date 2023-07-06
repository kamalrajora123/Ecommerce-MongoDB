const responseManagement = require("../../lib/responseManagement");
const product = require("../../models/product");
const httpStatus = require("http-status-codes")
const helpers = require("../../helpers/messages.json");
const fs = require('fs')
const excelJS = require("exceljs");
const PDFDocument =  require('pdfkit');
const { query } = require("express");




module.exports.insertProduct=async (req, res)=>{
    console.log(req.body)
     if (req.file== undefined){
        try {
    
            const pro = await product.create(req.body)
            await pro.save()
    
            if (pro) {
                            responseManagement.sendResponse(
                                res,
                                200,
                                helpers.product_added_success,
                                req.body
                            );
                        } else {
                            throw "..";
                        }
            
        } catch (error) {
    
                    responseManagement.sendResponse(
                res,
                500,
                helpers.product_added_fail,
                req.body
            );
            
        }
    }
    else {
    
    
        const imagename = req.file.destination + `/` + req.file.filename;
    
            try {
    
      
    
          
            
    
            // return 0
    
          
                const data = {
    
                    "product_name": req.body.product_name,
                    "product_description": req.body.product_description,
                    "product_stock": req.body.product_stock,
                    "product_detail": req.body.product_detail,
                    "product_price": req.body.product_price,
                    "category_id":req.body.category_id,
    
                   "status":true,
    
    
                    "product_image": imagename
                }
    
    
                const pro = await product.create(data)
                await pro.save()
            
            responseManagement.sendResponse(res, 200, helpers.product_added_success)
    
        } catch (error) {
            console.log(error)
            responseManagement.sendResponse(res, 500, helpers.something_went_wrong)
        }
    
    
    
    
    
    
    
    
    } 
    






}




module.exports.viewProduct = async(req, res) => {
    try {
        let pro = await product.find({_id:req.body._id,status:true}, { __v: 0 });

        if (pro) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.product_view,
               pro
            );
        } else {
            throw "err";
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};



module.exports.viewAll = async(req, res) => {
    try {
        let pro = await product.find({status:true}, { __v: 0 });

        if (pro) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.product_view,
               pro
            );
        } else {
            throw "err";
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};




module.exports.deleteProduct = async(req, res) => {
 
    try {
        // console.log(req.body)
        let pro = await product.findOne(req.query);
console.log(pro.product_image)
fs.unlinkSync(pro.product_image)
        if (pro) {
             pro = await product.deleteOne(req.query);
            responseManagement.sendResponse(res, 200, helpers.product_delete_success);
        } else {
            responseManagement.sendResponse(res, 404, helpers.product_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};





// module.exports.updateProduct = async(req, res) => {
//     try {
//         let pro = await product.findOne({ _id: req.body._id });

//         if (pro) {
//             await product.updateOne({ _id: req.body._id }, req.body);
       
//             responseManagement.sendResponse(res, 200, helpers.product_update_success, pro);
//         } else {
//             responseManagement.sendResponse(res, 404, helpers.product_search_fail);
//         }
//     } catch {
//         responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
//     }
// };




module.exports.updateProductStatus = async(req, res) => {
    try {
        let pro = await product.findOne({ _id: req.body._id });
if (pro.status){
        var data = {

            "product_name": pro.product_name,
            "product_description": pro.product_description,
            "product_stock": pro.product_stock,
            "product_detail": pro.product_detail,
            "product_price": pro.product_price,




            "product_image": pro.product_image,
            "status":false
        }
    }
    else {


        var data = {

            "product_name": pro.product_name,
            "product_description": pro.product_description,
            "product_stock": pro.product_stock,
            "product_detail": pro.product_detail,
            "product_price": pro.product_price,




            "product_image": pro.product_image,
            "status":true
        }

    }

        if (pro) {
            await product.updateOne({ _id: req.body._id }, data);
       
            responseManagement.sendResponse(res, 200, helpers.product_update_success, pro);
        } else {
            responseManagement.sendResponse(res, 404, helpers.product_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};







module.exports.editProduct = async(req, res) => {
    try {
        let pro = await product.find(req.query, { __v: 0 });
console.log(pro)
        if (pro) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.product_view,
                pro
            );
        } else {
            responseManagement.sendResponse(res, 404, helpers.product_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};













module.exports.exportToExcel=async(req,res)=>{


    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("My products"); // New Worksheet
    const path = "./";  // Path to download excel
    // Column for data in excel. key must match data key

    let pro = await product.find({}, { __v: 0 ,_id:0,product_description:0,product_image:0});
    
    worksheet.columns = [
      {header: "s_no", key: "s_no", width: 20 },
      { header: "product_name", key: "product_name", width: 20 }, 
      { header: "product_stock", key: "product_stock", width: 20 },
      { header: "product_price", key: "product_price", width: 20 }
    
  ];
  // Looping through product data
  let counter = 1;
  pro.forEach((product) => {
    product.s_no = counter;
    worksheet.addRow(product); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const data = await workbook.xlsx.writeFile(`${path}/products.xlsx`)
     .then(() => {
        res.download(`${path}/products.xlsx`);
    
     });
  } catch (err) {
    console.log(err)
      res.send({
      status: "error",
      message: "Something went wrong",
    });
    }



}


module.exports.exportToPDF = async (req,res)=>{



    try {
        let pro = await product.find({}, { __v: 0 });

        if (pro) {
       

            var myDoc = new PDFDocument({bufferPages: true});

            let buffers = [];
            myDoc.on('data', buffers.push.bind(buffers));
            myDoc.on('end', () => {
            
                let pdfData = Buffer.concat(buffers);
                res.writeHead(200, {
                'Content-Length': Buffer.byteLength(pdfData),
                'Content-Type': 'application/pdf',
                'Content-disposition': 'attachment;filename=test.pdf',})
                .end(pdfData);
            
            });
            


            for(var i=0 ; i<pro.length ; ++i){




                myDoc.font('Times-Roman')
                .fontSize(12)
                .text(pro[i].product_name +"   "+pro[i].product_price+"  "+ pro[i].product_description);
       
          
      





            }
           
            myDoc.end();
        



        } else {
            throw "err";
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }


    






}




module.exports.search = async(req,res) =>{
    try {
      let stu = await product.findOne(req.query);
  
      if (stu) {
        responseManagement.sendResponse(
          res,
          200,
          helpers.product_find_sucess,
          stu
        );
      } else {
        responseManagement.sendResponse(res, 404, helpers.product_find_fail);
      }
    } catch {
      responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
  
  
  }

  module.exports.updateProduct = async(req, res) => {


    const imagename = req.file.destination + `/` + req.file.filename;

    try {

        // Generate id 
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        }

        let Product = await product.findOne({ _id: req.body._id })

        // return 0

        if (!Product) {
            

            // responseManagement.sendResponse(res, 400 )

        } else {
            const data = {

                "product_name": req.body.product_name,
                "product_description": req.body.product_description,
                "product_stock": req.body.product_stock,

                "product_price": req.body.product_price,


                "product_image": imagename
            }

            const stucreate = await product.updateOne({ _id: req.body._id }, data)
        }
        responseManagement.sendResponse(res, 200, helpers.product_update_success)

    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong)
    }

};

