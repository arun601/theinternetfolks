import express from "express";
import {
    registerController,
    loginController,CommunityController,getallCommunityController,allCommunitymemberController,deletemember,addmemebertocommunity}
    from '../controller/authcontroller.js';

const router = express.Router()

router.post("/register", registerController);

router.post("/login", loginController);
router.post("/communities",CommunityController);
router.get("/getallcommunities",getallCommunityController);
router.post("/add-member/:communityId",addmemebertocommunity)
router.delete("/remove-member/:communityId/:userId",deletemember)
router.get("/community-members/:communityId",allCommunitymemberController);


//router.post("/", loginController);

export default router;