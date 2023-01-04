import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { special } from "../utils/splitDescription.js";

//percentage calculation
function calculatePercentage(arr) {
  let res = [];
  arr.forEach((item) => res.push(item.value));

  let sum = res.reduce((item, value) => item + value, 0);
  return Math.round((sum / arr.length / 3) * 100);
}


const addTopic = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id) {
    res.status(500);
    throw new Error("topics must have a user id");
  }
  //find the user who wants to add topic
  const user = await User.findById({ _id });
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  //adding new topic to user's topic list
  const { title, description } = req.body;
  if (!title | !description) {
    res.status(400);
    throw new Error("please enter user title and description");
  }
  //checking for duplicate title of a user

  // const isAvailable = user.topics.map((item) =>  item.title == title);
  // console.log(isAvailable,'eeee');
  // if (isAvailable.length>0) {
  //   res.status(400);
  
   
  //   throw new Error("duplicate topic title");
  // }
  //spliting topics description before saving to db
  let splitedDescription = special(description);
  // console.log(splitedDescription);
  user.topics.push({ title, description: splitedDescription });

  const updatedUser = await user.save();

  res.status(201).json({
    status: "success",
    data: updatedUser,
  });
});
const usersAllTopic = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!_id) {
    res.status(500);
    throw new Error("topics must have a user id");
  }
  //find the user who wants to add topic
  const user = await User.findById({ _id });
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  //calculating percentage
  user.topics.forEach(item=>item.percentage=calculatePercentage(item.description))
  
  res.status(200).json({
    status: "success",
    usersTopic: user.topics,
  });
});
//handler to get users paricular topic
const userSelectedTopic = asyncHandler(async (req, res) => {
  const { title } = req.query;
  const { _id } = req.params;
  if (!_id) {
    res.status(500);
    throw new Error("topics must have a user id");
  }
  //find the user who wants to add topic
  const user = await User.findById({ _id });
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  const topic = user.topics.filter((item) => item.title === title);
  if (topic.length == 0) {
    res.status(400);
    throw new Error("no topic found");
  }
  res.status(200).json({
    status: "success",
    Topic: topic,
  });
});

const userSelectedTopicChunk = asyncHandler(async (req, res) => {
  const { title, _id } = req.query;

  const { user_id } = req.params;
  if (!user_id) {
    res.status(500);
    throw new Error("topics must have a user id");
  }
  //find the user who wants to add topic
  const user = await User.findById({ _id: user_id });
  if (!user) {
    res.status(400);
    throw new Error(" not a valid user");
  }
  //filter users selected topic
  const topic = user.topics.filter((item) => item.title === title);
  if (topic.length == 0) {
    res.status(400);
    throw new Error("no topic found");
  }

  //filtering selected chunk of description

  const selectedChunk = topic[0].description.filter(
    (chunk) => chunk._id == _id
  );
  console.log("successfully fetched descriptions selected part");
  res.status(200).json({
    status: "success",
    selctedSection: selectedChunk,
  });
});

const updateSelectedChunk = asyncHandler(async (req, res) => {
  const { title, chunk_id, value } = req.query;
  const { user_id } = req.params;
  if (!user_id) {
    res.status(500);
    throw new Error("topics must have a user id");
  }
  //find the user who wants to add topic
  const user = await User.findById({ _id: user_id });
  if (!user) {
    res.status(400);
    throw new Error(" not a valid user");
  }

  //filter users selected topic
  const topic = user.topics.filter((item) => item.title === title);
  if (topic.length == 0) {
    res.status(400);
    throw new Error("no topic found");
  }

  //filtering selected chunk of description

  const selectedChunk = topic[0].description.filter(
    (item) => item._id == chunk_id
  );
  if (selectedChunk.length == 0) {
    res.status(400);
    throw new Error("bad selection");
  }

  if (value > 3) {
    res.status(400);
    throw new Error("value must be in range 1-4");
  }
  //updating value and saving

  selectedChunk[0].value = value;
  await user.save();
  res.status(201).json({
    status: "success",
    updatedChunk: selectedChunk[0],
  });
});

export {
  addTopic,
  usersAllTopic,
  userSelectedTopic,
  userSelectedTopicChunk,
  updateSelectedChunk,
};
