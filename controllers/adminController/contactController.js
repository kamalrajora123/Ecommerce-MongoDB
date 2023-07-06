const responseManagement = require("../../lib/responseManagement");
const Contact = require("../../models/contact ");
const httpStatus = require("http-status-codes")
const helpers = require("../../helpers/messages.json");
const fs = require('fs')
const excelJS = require("exceljs");
const PDFDocument =  require('pdfkit');
const { query } = require("express");

module.exports.insertContact = async(req, res) => {
    try {
       
        const der = await Contact.create(req.body);
        await der.save();
        if (der) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.contact_added_success,
                req.body
            );
        } else {
            throw "..";
        }
    } catch {
        responseManagement.sendResponse(
            res,
            500,
            helpers.contact_added_fail,
            req.body
        );
    }
};




module.exports.viewAll = async(req, res) => {
    try {
        let pro = await Contact.find({}, { __v: 0 });

        if (pro) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.Contact_view,
               pro
            );
        } else {
            throw "err";
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};




module.exports.deleteContact = async(req, res) => {
 
    try {
        // console.log(req.body)
        let pro = await Contact.findOne(req.query);
        if (pro) {
             pro = await Contact.deleteOne(req.query);
            responseManagement.sendResponse(res, 200, helpers.Contact_delete_success);
        } else {
            responseManagement.sendResponse(res, 404, helpers.Contact_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};

module.exports.updateContact = async(req, res) => {
    try {
        let pro = await Contact.findOne({ _id: req.body._id });

        if (pro) {
            await Contact.updateOne({ _id: req.body._id }, req.body);
       
            responseManagement.sendResponse(res, 200, helpers.Contact_update_success, pro);
        } else {
            responseManagement.sendResponse(res, 404, helpers.Contact_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};






module.exports.editContact = async(req, res) => {
    try {
        let pro = await Contact.find(req.query, { __v: 0 });
console.log(pro)
        if (pro) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.Contact_view,
                pro
            );
        } else {
            responseManagement.sendResponse(res, 404, helpers.Contact_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.Contact_went_wrong);
    }
};













module.exports.exportToExcel=async(req,res)=>{


    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("My products"); // New Worksheet
    const path = "./";  // Path to download excel
    // Column for data in excel. key must match data key

    let pro = await Contact.find({}, { __v: 0 ,});
    
    worksheet.columns = [
      {header: "s_no", key: "s_no", width: 20 },
      { header: "email", key: "email", width: 20 }, 
      { header: "adders", key: "adders", width: 20 },
      { header: "number", key: "number", width: 20 }
    
  ];
  // Looping through product data
  let counter = 1;
  pro.forEach((contact) => {
    contact.s_no = counter;
    worksheet.addRow(contact); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const data = await workbook.xlsx.writeFile(`${path}/Contact.xlsx`)
     .then(() => {
        res.download(`${path}/Contacts.xlsx`);
    
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
        let pro = await Contact.find({}, { __v: 0 });

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
                .text(pro[i].email +"   "+pro[i].adders+"  "+ pro[i].number);
       
          
      





            }
           
            myDoc.end();
        



        } else {
            throw "err";
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }


    






}



//...............................................
