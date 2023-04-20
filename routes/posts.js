const express = require("express");

const router = express.Router();
const { Post, Comment } = require("../models");

// 이름 생성
const createNewName = () => {
  const firstWord = [
    "예쁜",
    "매혹적인",
    "멋진",
    "차가운",
    "파릇파릇한",
    "활발한",
    "밝은",
    "쓸쓸한",
    "어두운"
  ];
  const secondWord = ["강아지","고양이","토끼","병아리","얼룩소","사자","원숭이","돼지","쏘미","코미"];

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
        ... post.dataValues,
        comments: comments,
      });
    } else {
      res.status(403).json("존재하지 않는 게시글입니다.");
    }
  } catch (err) {
    next(err);
  }
});

// 게시글 리스트 조회
router.get("/", async (req, res, next) => {
  try {
    const page = req.query.page;
    const sortBy = req.query.sortBy;

    let posts;
    let offset;
    const result = [];

    if (page == 1) {
      offset = 0;
    } else {
      offset = (page - 1) * 10 - 1;
    }

    if (sortBy === "id") {
      posts = await Post.findAll({
        order: [["date", "DESC"]],
        limit: 10,
        offset: offset,
      });
    } else if (sortBy === "like") {
      posts = await Post.findAll({
        order: [
          ["likes", "DESC"],
          ["date", "DESC"],
        ],
        limit: 10,
        offset: offset,
      });
    }

    for (const p in posts) {
      const comment = await Comment.findAll({
        where: {
          PostId: posts[p].id,
        },
        order: [["date", "DESC"]],
        limit: 1,
      });
      if (comment.length == 1) {
        result.push({
          post: posts[p],
          comment: comment[0],
        });
      } else {
        result.push({
          post: posts[p],
          comment: {},
        });
      }
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// 좋아요
router.put("/:postsId/like", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postsId },
    });

    if (post) {
      post.likes++;
      post.save();
      res.status(200).json();
    } else {
      res.status(403).json("존재하지 않는 게시글입니다.");
    }
  } catch (err) {
    next(err);
  }
});


module.exports = router;
