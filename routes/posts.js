const express = require("express");

const router = express.Router();
const { Post } = require("../models");

// 이름 생성
const createNewName = () => {
  const firstWord = [
    "잘생긴",
    "이쁜",
    "기타치는",
    "멋진",
    "재미있는",
    "달려가는",
    "활기찬",
  ];
  const secondWord = ["쏘미", "코미", "고양이", "여우", "사자", "토끼"];

  const adjective = firstWord[Math.floor(Math.random() * firstWord.length)];
  const noun = secondWord[Math.floor(Math.random() * secondWord.length)];
  const randomNum = Math.floor(Math.random() * 9000) + 1000;

  return `${adjective} ${noun} ${randomNum}`;
};

// 글 작성
router.post("/", async (req, res, next) => {
  try {
    const { contents } = req.body;
    const name = createNewName();

    const post = await Post.create({
      name,
      contents,
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
