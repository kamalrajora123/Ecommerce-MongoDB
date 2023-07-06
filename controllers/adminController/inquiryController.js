const responseManagement = require("../../lib/responseManagement");
const Inquiry = require("../../models/inquiry");
const httpStatus = require("http-status-codes")
const helpers = require("../../helpers/messages.json");
const fs = require('fs')
const excelJS = require("exceljs");
const PDFDocument =  require('pdfkit');
const { query } = require("express");

module.exports.insertInquiry = async(req, res) => {
    try {
      
        const der = await Inquiry.create(req.body);
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
        let cate = await Inquiry.find({}, { __v: 0 });

        if (cate) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.contact_view,
               cate
            );
        } else {
            throw "err";
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_wrong);
    }
};



module.exports.deleteInquiry = async(req, res) => {
 
    try {
        // console.log(req.body)
        let pro = await Inquiry.findOne(req.query);
        if (pro) {
             pro = await Inquiry.deleteOne(req.query);
            responseManagement.sendResponse(res, 200, helpers.Contact_delete_success);
        } else {
            responseManagement.sendResponse(res, 404, helpers.Contact_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};

module.exports.updateInquiry = async(req, res) => {
    try {
        let pro = await Inquiry.findOne({ _id: req.body._id });

        if (pro) {
            await Inquiry.updateOne({ _id: req.body._id }, req.body);
       
            responseManagement.sendResponse(res, 200, helpers.Contact_update_success, pro);
        } else {
            responseManagement.sendResponse(res, 404, helpers.Contact_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};






module.exports.editInquiry = async(req, res) => {
    try {
        let pro = await Inquiry.find(req.query, { __v: 0 });
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

