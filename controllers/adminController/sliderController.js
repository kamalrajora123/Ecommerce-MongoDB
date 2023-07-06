
const responseManagement = require("../../lib/responseManagement");
const Slider = require("../../models/slider");
const httpStatus = require("http-status-codes")
const helpers = require("../../helpers/messages.json");
const { query } = require("express");



const PDFDocument =  require('pdfkit');



module.exports.insertSlider=async (req, res)=>{
    console.log(req.body)
     if (req.file== undefined){
        try {
    
            const pro = await Slider.create(req.body)
            await pro.save()
    
            if (pro) {
                            responseManagement.sendResponse(
                                res,
                                200,
                                helpers.slider_added_success,
                                req.body
                            );
                        } else {
                            throw "..";
                        }
            
        } catch (error) {
    
                    responseManagement.sendResponse(
                res,
                500,
                helpers.slider_added_fail,
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
          "offer": req.body.offer,
          "price": req.body.price,

          "slider_image": imagename,
      
                   "status":true,
    
    
                }
    
    
                const pro = await Slider.create(data)
                await pro.save()
            
            responseManagement.sendResponse(res, 200, helpers.slider_added_success)
    
        } catch (error) {
            console.log(error)
            responseManagement.sendResponse(res, 500, helpers.something_went_wrong)
        }
    
    
    
    
    
    
    
    
    } 
    






}




module.exports.viewAll = async(req, res) => {
    try {
        let cate = await Slider.find({}, { __v: 0 });

        if (cate) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.slider_view,
               cate
            );
        } else {
            throw "err";
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_wrong);
    }
};




module.exports.deleteSlider = async(req, res) => {
 
    try {
        
        let cate = await Slider.findOne(req.query);

        if (cate) {
            let cate = await Slider.deleteOne(req.query);
            responseManagement.sendResponse(res, 200, helpers.slider_delete_success);
        } else {
            responseManagement.sendResponse(res, 404, helpers.slider_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};












module.exports.updateSlider = async(req, res) => {
    try {
        let cate = await Slider.findOne({ _id: req.body._id });

        if (cate) {
            await Slider.updateOne({ _id: req.body._id }, req.body);
      
            responseManagement.sendResponse(res, 200, helpers.slider_update_success, cate);
        } else {
            responseManagement.sendResponse(res, 404, helpers.slider_update_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};



module.exports.editSlider = async(req, res) => {
    try {
        let cate = await Slider.find(req.query, { __v: 0 });

        if (cate) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.slider_view,
                cate
            );
        } else {
            responseManagement.sendResponse(res, 404, helpers.slider_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};         





module.exports.updateSliderStatus = async(req, res) => {
    try {
        let pro = await Slider.findOne({ _id: req.body._id });
if (pro.status){
        var data = {

            "name": pro.name ,
            "offer":pro.offer,
            "price":pro.price,
       
            "status":false
        }
    }
    else {


        var data = {
            "name": pro.name ,
            "offer":pro.offer,
            "price":pro.price,
            
          

            
        
            "status":true
        }

    }

        if (pro) {
            await Slider.updateOne({ _id: req.body._id }, data);
       
            responseManagement.sendResponse(res, 200, helpers.slider_update_success, pro);
        } else {
            responseManagement.sendResponse(res, 404, helpers.slider_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};






module.exports.exportSliderToPDF = async (req,res)=>{


    var myDoc = new PDFDocument({bufferPages: true});

    let buffers = [];
    myDoc.on('data', buffers.push.bind(buffers));
    myDoc.on('end', () => {
    
        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=Slider.pdf',})
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

