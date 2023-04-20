const express = require("express");

const router = express.Router();
const { Post, Comment } = require("../models");

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

router.post("/:postsId/comments", async (req, res, next) => {
  try {
    const { contents } = req.body;
    const name = createNewName();

    const post = await Post.findOne({
      where: { id: req.params.postsId },
    });

    if (post) {
      const comment = await Comment.create({
        name,
        contents,
        PostId: post.id,
      });

      res.status(201).json(comment);
    } else {
      res.status(403).json("존재하지 않는 게시글입니다.");
    }
  } catch (err) {
    next(err);
  }
});

// 글 상세 조회
router.get("/:postsId", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postsId },
    });

    if (post) {
      const comments = await Comment.findAll({
        where: {
          PostId: post.id,
        },
      });

      res.status(200).json({
        post,
        comments: comments,
      });
    } else {
      res.status(403).json("존재하지 않는 게시글입니다.");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
