const responseManagement = require("../../lib/responseManagement");
const enquiry = require("../../models/enquiry");
const httpStatus = require("http-status-codes")
const helpers = require("../../helpers/messages.json");
const fs = require('fs')
const { query } = require("express");


const excelJS = require("exceljs");
const PDFDocument =  require('pdfkit');



module.exports.insertEnquiry=async (req, res)=>{
    console.log(req.body)
     if (req.file== undefined){
        try {
    
            const enquiry = await enquiry.create(req.body)
            await enquiry.save()
    
            if (enquiry) {
                            responseManagement.sendResponse(
                                res,
                                200,
                                helpers.enquiry_added_success,
                                req.body
                            );
                        } else {
                            throw "..";
                        }
            
        } catch (error) {
    
                    responseManagement.sendResponse(
                res,
                500,
                helpers.enquiry_added_fail,
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
           "email": req.body.email,
           "phone": req.body.name,
           "subject": req.body.name,
           "message": req.body.name,

                   "status":true,
    
    
                }
    
    
                const enq = await enquiry.create(data)
                await enq.save()
            
            responseManagement.sendResponse(res, 200, helpers.enquiry_added_success)
    
        } catch (error) {
            console.log(error)
            responseManagement.sendResponse(res, 500, helpers.something_went_wrong)
        }
    
   
    
    } 
    

}


module.exports.viewAll = async(req, res) => {
    try {
        let Enquiry = await enquiry.find({}, { __v: 0 });

        if (Enquiry) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.question_view,
               Enquiry
            );
        } else {
            throw "err";
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};




module.exports.deleteEnquiry = async(req, res) => {
 
    try {
        // console.log(req.body)
        let Enquiry = await enquiry.findOne(req.query);
console.log(Enquiry.enquiry_image)
fs.unlinkSync(Enquiry.enquiry_image)
        if (Enquiry) {
            let Enquiry = await enquiry.deleteOne(req.query);
            responseManagement.sendResponse(res, 200, helpers.enquiry_delete_success);
        } else {
            responseManagement.sendResponse(res, 404, helpers.enquiry_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};

module.exports.updateEnquiry = async(req, res) => {
    try {
        let Enquiry = await enquiry.findOne({ _id: req.body._id });

        if (Enquiry) {
            await enquiry.updateOne({ _id: req.body._id }, req.body);
            //   let stu = await student.findOne(req.body);
            responseManagement.sendResponse(res, 200, helpers.enquiry_update_success, Enquiry);
        } else {
            responseManagement.sendResponse(res, 404, helpers.enquiry_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};



module.exports.editEnquiry = async(req, res) => {
    try {
        let Enquiry = await enquiry.find(req.query, { __v: 0 });

        if (Enquiry) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.enquiry_view,
                Enquiry
            );
        } else {
            responseManagement.sendResponse(res, 404, helpers.enquiry_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};



// module.exports.updateEnquiryStatus = async(req, res) => {
//     try {
//         let enquiry = await enquiry.findOne({ _id: req.body._id });
// if (enquiry.status){
//         var data = {

//             "name": enquiry.address ,
//             "email": enquiry.email,
//             "phone": enquiry.phone,
//             "subject": enquiry.subject,
//             "message": enquiry.message,



          
//             "status":false
//         }
//     }
//     else {


//         var data = {
//            "name": enquiry.address ,
//             "email": enquiry.email,
//             "phone": enquiry.phone,
//             "subject": enquiry.subject,
//             "message": enquiry.message,

          

        
        
//             "status":true
//         }

//     }

//         if (enquiry) {
//             await qna.updateOne({ _id: req.body._id }, data);
       
//             responseManagement.sendResponse(res, 200, helpers.question_update_success, contact);
//         } else {
//             responseManagement.sendResponse(res, 404, helpers.contact_search_fail);
//         }
//     } catch {
//         responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
//     }
// };




module.exports.exportToExcel=async(req,res)=>{


    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("My enquirys"); // New Worksheet
    const path = "./";  // Path to download excel
    // Column for data in excel. key must match data key

    let enquiry = await enquiry.find({}, {__v: 0 ,_id:0,question_image:0});
    
    worksheet.columns = [
      {header: "s_no", key: "s_no", width: 20 },
      { header: "name", key: "name", width: 20 }, 
      { header: "subject", key: "subject", width: 20 }, 
      { header: "message", key: "message", width: 20 }, 
      { header: "email", key: "email", width: 20 }, 
      { header: "phone", key: "phone", width: 20 }, 

  ];
  // Looping through product data
  let counter = 1;
  enquiry.forEach((enquiry) => {
    enquiry.s_no = counter;
    worksheet.addRow(enquiry); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const data = await workbook.xlsx.writeFile(`${path}/enquiry.xlsx`)
     .then(() => {
        res.download(`${path}/enquiry.xlsx`);
    
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





