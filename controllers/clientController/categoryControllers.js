
const responseManagement = require("../../lib/responseManagement");
const category = require("../../models/category");
const httpStatus = require("http-status-codes")
const helpers = require("../../helpers/messages.json");
const { query } = require("express");
const product = require("../../models/product");

const excelJS = require("exceljs");
const PDFDocument =  require('pdfkit');


module.exports.searchProductByCategory= async (req,res)=>{

//    const  r= await category.aggregate([{
//         $lookup:
//           {
//             from: "products",
//             localField: "_id",
//             foreignField: "category_id",
//             as: "product_list"
//           },


          
//      }])

   var data =  await product.find({category_id:req.body._id,status:true})
   


   
   responseManagement.sendResponse(
    res,
    200,
    helpers.category_view_products,
    data
);


}



module.exports.insertCategory=async (req, res)=>{
    console.log(req.body)
     if (req.file!= undefined){
        try {
    
            const pro = await category.create(req.body)
            await pro.save()
    
            if (pro) {
                            responseManagement.sendResponse(
                                res,
                                200,
                                helpers.category_added_success,
                                req.body
                            );
                        } else {
                            throw "..";
                        }
            
        } catch (error) {
    
                    responseManagement.sendResponse(
                res,
                500,
                helpers.category_added_fail,
                req.body
            );
            
        }
    }
    else {
    
    
            try {
    
      
    
          
            
    
            // return 0
    
          
                const data = {
    
                    "name": req.body.name,
                    
    
                   "status":true,
    
    
                }
    
    
                const pro = await category.create(data)
                await pro.save()
            
            responseManagement.sendResponse(res, 200, helpers.category_added_success)
    
        } catch (error) {
            console.log(error)
            responseManagement.sendResponse(res, 500, helpers.something_went_wrong)
        }
    
    
    
    
    
    
    
    
    } 
    






}


module.exports.viewAll = async(req, res) => {
    try {
        let cate = await category.find({status:true}, { __v: 0 });

        if (cate) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.category_view,
               cate
            );
        } else {
            throw "err";
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_wrong);
    }
};




module.exports.deleteCategory = async(req, res) => {
 
    try {
        
        let cate = await category.findOne(req.query);

        if (cate) {
            let cate = await category.deleteOne(req.query);
            responseManagement.sendResponse(res, 200, helpers.category_delete_success);
        } else {
            responseManagement.sendResponse(res, 404, helpers.category_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};












module.exports.updateCategory = async(req, res) => {
    try {
        let cate = await category.findOne({ _id: req.body._id });

        if (cate) {
            await category.updateOne({ _id: req.body._id }, req.body);
      
            responseManagement.sendResponse(res, 200, helpers.category_update_success, cate);
        } else {
            responseManagement.sendResponse(res, 404, helpers.category_update_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};



module.exports.editCategory = async(req, res) => {
    try {
        let cate = await category.find(req.query, { __v: 0 });

        if (cate) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.category_view,
                cate
            );
        } else {
            responseManagement.sendResponse(res, 404, helpers.student_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};         





module.exports.updateCategoryStatus = async(req, res) => {
    try {
        let pro = await category.findOne({ _id: req.body._id });
if (pro.status){
        var data = {

            "name": pro.name ,
       
            "status":false
        }
    }
    else {


        var data = {
            "name": pro.name ,
            
          

            
        
            "status":true
        }

    }

        if (pro) {
            await category.updateOne({ _id: req.body._id }, data);
       
            responseManagement.sendResponse(res, 200, helpers.category_update_success, pro);
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

    let cate = await category.find({}, {});
    
    worksheet.columns = [
      {header: "s_no", key: "s_no", width: 20 },
      { header: "name", key: "name", width: 20 }, 
  ];
  // Looping through product data
  let counter = 1;
  cate.forEach((category) => {
    category.s_no = counter;
    worksheet.addRow(category); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const data = await workbook.xlsx.writeFile(`${path}/category.xlsx`)
     .then(() => {
        res.download(`${path}/category.xlsx`);
    
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


    var myDoc = new PDFDocument({bufferPages: true});

    let buffers = [];
    myDoc.on('data', buffers.push.bind(buffers));
    myDoc.on('end', () => {
    
        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=category.pdf',})
        .end(pdfData);
    
    });
    
    myDoc.font('Times-Roman')
         .fontSize(12)
         .text(`this is a test text`);

         
         myDoc  .addPage()
  .fillColor('blue')
  .text('Here is a link!', 100, 100)
  .underline(100, 100, 160, 27, { color: '#0000FF' })
  .link(100, 100, 160, 27, 'http://google.com/');

    myDoc.end();








}


module.exports.insertCategory=async (req, res)=>{
    console.log(req.body)
     if (req.file== undefined){
        try {
    
            const cate = await category.create(req.body)
            await cate.save()
    
            if (cate) {
                            responseManagement.sendResponse(
                                res,
                                200,
                                helpers.category_added_success,
                                req.body
                            );
                        } else {
                            throw "..";
                        }
            
        } catch (error) {
    
                    responseManagement.sendResponse(
                res,
                500,
                helpers.category_added_fail,
                req.body
            );
            
        }
    }
    else {
    
    
        const imagename = req.file.destination + `/` + req.file.filename;
    
            try {
    
      
    
          
            
    
            // return 0
    
          
                const data = {
    
                    "name": req.body.name,
                    
                    
    
                   "status":true,
    
    
                    "category_image": imagename
                }
    
    
                const cate = await category.create(data)
                await cate.save()
            
            responseManagement.sendResponse(res, 200, helpers.category_added_success)
    
        } catch (error) {
            console.log(error)
            responseManagement.sendResponse(res, 500, helpers.something_went_wrong)
        }
    
    
    
    
    
    
    
    
    } 
    






}
