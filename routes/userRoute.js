import express from 'express'
import {registerUser,getUser,allUsers, loginUser} from '../controllers/userContoller.js'
import {addTopic,usersAllTopic,userSelectedTopic,userSelectedTopicChunk,updateSelectedChunk} from '../controllers/topicsController.js'

const router=express.Router();


router.get('/',allUsers)
router.post('/register',registerUser)
router.post('/login',loginUser);

router.get('/:_id',getUser)

//add topic
router.post('/:_id/addtopic',addTopic)
router.get('/:_id/usersalltopic',usersAllTopic)
router.get('/:_id/specifictopic',userSelectedTopic)
router.post('/:user_id/topicschunk',userSelectedTopicChunk)
router.patch('/:user_id/updatetopicschunk',updateSelectedChunk)


export default router