
const adminQnaRouter= require("./adminRouter/qnaRouter")
const adminCategoryRouter = require("./adminRouter/categoryRouter")
const adminProductRouter = require("./adminRouter/productRouter")
const adminTestimonialRouter = require("./adminRouter/testimonialRouter")
const adminUsersRouter = require("./adminRouter/usersRouter")
const adminContactRouter = require("./adminRouter/contactRouter")
const adminOfferRouter = require("./adminRouter/offerRouter")
const adminStoryRouter = require("./adminRouter/storyRouter")
const adminInquiryRouter = require("./adminRouter/inquiryRouter")

const adminSliderRouter = require("./adminRouter/sliderRouter")


const clientQnaRouter= require("./clientRouter/qnaRouter")
const clientCategoryRouter = require("./clientRouter/categoryRouter")
const clientProductRouter = require("./clientRouter/productRouter")
const clientTestimonialRouter = require("./clientRouter/testimonialRouter")
const clientUsersRouter = require("./clientRouter/usersRouter")


const config  = require("../config/config.json")


const express = require("express");


const router = express.Router();



router.use("/admin/api/"+config.apiVersion+"/"+"qna",adminQnaRouter)
router.use("/admin/api/"+config.apiVersion+"/"+"category",adminCategoryRouter)
router.use("/admin/api/"+config.apiVersion+"/"+"product",adminProductRouter)
router.use("/admin/api/"+config.apiVersion+"/"+"testimonial",adminTestimonialRouter)
router.use("/admin/api/"+config.apiVersion+"/"+"users",adminUsersRouter)
router.use("/admin/api/"+config.apiVersion+"/"+"contact",adminContactRouter)
router.use("/admin/api/"+config.apiVersion+"/"+"offer",adminOfferRouter)
router.use("/admin/api/"+config.apiVersion+"/"+"story",adminStoryRouter)
router.use("/admin/api/"+config.apiVersion+"/"+"Inquiry",adminInquiryRouter)
router.use("/admin/api/"+config.apiVersion+"/"+"slider",adminSliderRouter)









/////////////////////////////////////////////////////////clint//////////



router.use("/api/"+config.apiVersion+"/"+"qna",clientQnaRouter)
router.use("/api/"+config.apiVersion+"/"+"category",clientCategoryRouter)
router.use("/api/"+config.apiVersion+"/"+"product",clientProductRouter)
router.use("/api/"+config.apiVersion+"/"+"testimonial",clientTestimonialRouter)
router.use("/api/"+config.apiVersion+"/"+"users",clientUsersRouter)





module.exports = router;

