const responseManagement = require("../../lib/responseManagement");
const test = require("../../models/testimonial");
const httpStatus = require("http-status-codes")
const helpers = require("../../helpers/messages.json");
const fs = require('fs')
const { query } = require("express");



const excelJS = require("exceljs");
const PDFDocument =  require('pdfkit');







module.exports.insertTest=async (req, res)=>{
    console.log(req.body)
     if (req.file== undefined){
        try {
    
            const pro = await test.create(req.body)
            await pro.save()
    
            if (pro) {
                            responseManagement.sendResponse(
                                res,
                                200,
                                helpers.testimonial_added_success,
                                req.body
                            );
                        } else {
                            throw "..";
                        }
            
        } catch (error) {
    
                    responseManagement.sendResponse(
                res,
                500,
                helpers.question_added_fail,
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
"review": req.body.review,
"date": req.body.date,
"time": req.body.time,



"testimonial_image": imagename,
    
                   "status":true,
    
    
                }
    
    
                const pro = await test.create(data)
                await pro.save()
            
            responseManagement.sendResponse(res, 200, helpers.testimonial_added_success)
    
        } catch (error) {
            console.log(error)
            responseManagement.sendResponse(res, 500, helpers.something_went_wrong)
        }
    
    
    
    
    
    
    
    
    } 
    






}










module.exports.viewAll = async(req, res) => {
    try {
        let tes = await test.find({status:true}, { __v: 0 });

        if (tes) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.testimonial_view,
               tes
            );
        } else {
            throw "err";
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};





module.exports.updateTest = async(req, res) => {
    try {
        let tes = await test.findOne({ _id: req.body._id });

        if (tes) {
            await test.updateOne({ _id: req.body._id }, req.body);
            //   let stu = await student.findOne(req.body);
            responseManagement.sendResponse(res, 200, helpers.testimonial_update_success, tes);
        } else {
            responseManagement.sendResponse(res, 404, helpers.testimonial_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};



module.exports.editTest = async(req, res) => {
    try {
        let tes = await test.find(req.query, { __v: 0 });

        if (tes) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.testimonial_view,
                tes
            );
        } else {
            responseManagement.sendResponse(res, 404, helpers.testimonial_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};



module.exports.updateTestStatus = async(req, res) => {
    try {
        let tes = await test.findOne({ _id: req.body._id });
if (tes.status){
        var data = {

            "name": tes.name ,
            "review": tes.review,
            "date": tes.date,
            "time": tes.time,
            
          

            "testimonial_image": tes.testimonial_image,
            "status":false
        }
    }
    else {


        var data = {
            "name": tes.name ,
            "review": tes.review,
            "date": tes.date,
            "time": tes.time,
            
          

            "testimonial_image": tes.testimonial_image,
        
            "status":true
        }

    }

        if (tes) {
            await test.updateOne({ _id: req.body._id }, data);
       
            responseManagement.sendResponse(res, 200, helpers.testimonial_update_success, tes);
        } else {
            responseManagement.sendResponse(res, 404, helpers.testimonial_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};




module.exports.deleteTest = async(req, res) => {
 
    try {
        // console.log(req.body)
        let pro = await test.findOne(req.query);
console.log(pro.testimonial_image)
fs.unlinkSync(pro.testimonial_image)
        if (pro) {
             pro = await test.deleteOne(req.query);
            responseManagement.sendResponse(res, 200, helpers.product_delete_success);
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

    let pro = await test.find({}, {__v: 0 ,_id:0,testimonial_image:0});
    
    worksheet.columns = [
      {header: "s_no", key: "s_no", width: 20 },
      { header: "name", key: "name", width: 20 }, 
      { header: "time", key: "time", width: 20 }, 
      { header: "date", key: "date", width: 20 }, 
      { header: "review", key: "review", width: 20 }, 
  ];
  // Looping through product data
  let counter = 1;
  pro.forEach((testimonial) => {
    testimonial.s_no = counter;
    worksheet.addRow(testimonial); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const data = await workbook.xlsx.writeFile(`${path}/testimonial.xlsx`)
     .then(() => {
        res.download(`${path}/testimonial.xlsx`);
    
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
        'Content-disposition': 'attachment;filename=testimonial.pdf',})
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