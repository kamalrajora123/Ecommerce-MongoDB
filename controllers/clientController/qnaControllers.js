const responseManagement = require("../../lib/responseManagement");
const qna = require("../../models/qna");
const httpStatus = require("http-status-codes")
const helpers = require("../../helpers/messages.json");
const fs = require('fs')
const { query } = require("express");


const excelJS = require("exceljs");
const PDFDocument =  require('pdfkit');



module.exports.insertQna=async (req, res)=>{
    console.log(req.body)
     if (req.file== undefined){
        try {
    
            const pro = await qna.create(req.body)
            await pro.save()
    
            if (pro) {
                            responseManagement.sendResponse(
                                res,
                                200,
                                helpers.question_added_success,
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
    
"question": req.body.question,
"answer": req.body.answer,

"question_image": imagename,
    
                   "status":true,
    
    
                }
    
    
                const pro = await qna.create(data)
                await pro.save()
            
            responseManagement.sendResponse(res, 200, helpers.question_added_success)
    
        } catch (error) {
            console.log(error)
            responseManagement.sendResponse(res, 500, helpers.something_went_wrong)
        }
    
    
    
    
    
    
    
    
    } 
    






}


module.exports.viewAll = async(req, res) => {
    try {
        let Qna = await qna.find({status:true}, { __v: 0 });

        if (Qna) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.question_view,
               Qna
            );
        } else {
            throw "err";
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};




module.exports.deleteQna = async(req, res) => {
 
    try {
        // console.log(req.body)
        let Qna = await qna.findOne(req.query);
console.log(Qna.question_image)
fs.unlinkSync(Qna.question_image)
        if (Qna) {
            let Qna = await qna.deleteOne(req.query);
            responseManagement.sendResponse(res, 200, helpers.question_delete_success);
        } else {
            responseManagement.sendResponse(res, 404, helpers.question_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};

module.exports.updateQna = async(req, res) => {
    try {
        let Qna = await qna.findOne({ _id: req.body._id });

        if (Qna) {
            await qna.updateOne({ _id: req.body._id }, req.body);
            //   let stu = await student.findOne(req.body);
            responseManagement.sendResponse(res, 200, helpers.question_update_success, Qna);
        } else {
            responseManagement.sendResponse(res, 404, helpers.question_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};



module.exports.editQna = async(req, res) => {
    try {
        let Qna = await qna.find(req.query, { __v: 0 });

        if (Qna) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.question_view,
                Qna
            );
        } else {
            responseManagement.sendResponse(res, 404, helpers.question_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};



module.exports.updateQnaStatus = async(req, res) => {
    try {
        let pro = await qna.findOne({ _id: req.body._id });
if (pro.status){
        var data = {

            "question": pro.question ,
            "answer": pro.answer,
          

            "question_image": pro.question_image,
            "status":false
        }
    }
    else {


        var data = {
            "question": pro.question ,
            "answer": pro.answer,
          

            "question_image": pro.question_image,
        
            "status":true
        }

    }

        if (pro) {
            await qna.updateOne({ _id: req.body._id }, data);
       
            responseManagement.sendResponse(res, 200, helpers.question_update_success, pro);
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

    let pro = await qna.find({}, {__v: 0 ,_id:0,question_image:0});
    
    worksheet.columns = [
      {header: "s_no", key: "s_no", width: 20 },
      { header: "name", key: "name", width: 20 }, 
     
      { header: "answer", key: "answer", width: 20 }, 
  ];
  // Looping through product data
  let counter = 1;
  pro.forEach((question) => {
    question.s_no = counter;
    worksheet.addRow(question); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const data = await workbook.xlsx.writeFile(`${path}/question.xlsx`)
     .then(() => {
        res.download(`${path}/question.xlsx`);
    
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
        'Content-disposition': 'attachment;filename=question.pdf',})
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





