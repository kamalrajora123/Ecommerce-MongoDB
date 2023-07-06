
const responseManagement = require("../../lib/responseManagement");
const Story = require("../../models/story");
const httpStatus = require("http-status-codes")
const helpers = require("../../helpers/messages.json");
const { query } = require("express");
const product = require("../../models/product");

const excelJS = require("exceljs");
const PDFDocument = require('pdfkit');





module.exports.insertStory = async (req, res) => {
    console.log(req.body)
    if (req.file == undefined) {
        try {

            const pro = await Story.create(req.body)
            await pro.save()

            if (pro) {
                responseManagement.sendResponse(
                    res,
                    200,
                    helpers.Story_added_success,
                    req.body
                );
            } else {
                throw "..";
            }

        } catch (error) {

            responseManagement.sendResponse(
                res,
                500,
                helpers.Story_added_fail,
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
                "story": req.body.story,

                "client_image": imagename,

                "status": true,
            }
            const pro = await Story.create(data)
            await pro.save()

            responseManagement.sendResponse(res, 200, helpers.Story_added_success)

        } catch (error) {
            console.log(error)
            responseManagement.sendResponse(res, 500, helpers.something_went_wrong)
        }

    }

}


module.exports.viewAll = async (req, res) => {
    try {
        let cate = await Story.find({}, { __v: 0 });

        if (cate) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.Story_view,
                cate
            );
        } else {
            throw "err";
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_wrong);
    }
};


module.exports.deleteStory = async (req, res) => {

    try {

        let cate = await Story.findOne(req.query);

        if (cate) {
            let cate = await Story.deleteOne(req.query);
            responseManagement.sendResponse(res, 200, helpers.Story_delete_success);
        } else {
            responseManagement.sendResponse(res, 404, helpers.Story_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};

module.exports.updateStory = async (req, res) => {
    try {
        let cate = await Story.findOne({ _id: req.body._id });

        if (cate) {
            await Story.updateOne({ _id: req.body._id }, req.body);

            responseManagement.sendResponse(res, 200, helpers.Story_update_success, cate);
        } else {
            responseManagement.sendResponse(res, 404, helpers.Story_update_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};



module.exports.editStory = async (req, res) => {
    try {
        let cate = await Story.find(req.query, { __v: 0 });

        if (cate) {
            responseManagement.sendResponse(
                res,
                200,
                helpers.Story_view,
                cate
            );
        } else {
            responseManagement.sendResponse(res, 404, helpers.Story_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};
module.exports.updateStoryStatus = async (req, res) => {
    try {

        let pro = await Story.findOne({ _id: req.body._id });
        if (pro.status) {
            var data = {

                "name": pro.name,
                "story": pro.story,


                "status": false
            }
        }
        else {
            var data = {
                "name": pro.name,
                "story": pro.story,
                "status": true
            }

        }
        if (pro) {
            await Story.updateOne({ _id: req.body._id }, data);

            responseManagement.sendResponse(res, 200, helpers.Story_update_success, pro);
        } else {
            responseManagement.sendResponse(res, 404, helpers.Story_search_fail);
        }
    } catch {
        responseManagement.sendResponse(res, 500, helpers.something_went_wrong);
    }
};











