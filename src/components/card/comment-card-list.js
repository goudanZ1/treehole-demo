"use client";

import { useState } from "react";
import CommentCard from "./comment-card";
import ReplyCommentForm from "./reply-comment-form";

/**
 * CommentCardList 组件 - 一条树洞下面的评论列表与回复表单
 */
export default function CommentCardList({ hole, comments }) {
  // 本地状态：当前选择要回复的评论的cid
  const [selectedReplyToCid, setSelectedReplyToCid] = useState(null);

  const anonymousNames = [
    "洞主",
    "Alice",
    "Bob",
    "Carol",
    "Dave",
    "Eve",
    "Francis",
    "Grace",
  ];
  const randomDarkColors = [
    "#292929",
    "#521914",
    "#14522b",
    "#521449",
    "#145249",
    "#524714",
    "#522e14",
    "#141652",
    "#14524b",
    "#425214",
  ];

  // 真实用户所对应的匿名和颜色的字典
  const userNameDict = { [hole.user]: "洞主" };
  const userColorDict = { [hole.user]: "#292929" };

  // 已分配的名字索引和颜色索引
  let nameIndex = 0; // 洞主已经占用了索引0
  let colorIndex = 0; // 洞主已经占用了索引0
  let youWinCounter = 1;

  // 遍历评论，为每个用户分配名字和颜色
  for (const comment of comments) {
    const user = comment.user;

    // 如果这个用户还没有被分配名字和颜色
    if (!userNameDict[user]) {
      // 分配名字
      if (nameIndex < anonymousNames.length - 1) {
        nameIndex++;
        userNameDict[user] = anonymousNames[nameIndex];
      } else {
        userNameDict[user] = `You Win ${youWinCounter}`;
        youWinCounter++;
      }

      // 顺序分配颜色
      colorIndex = (colorIndex + 1) % randomDarkColors.length;
      userColorDict[user] = randomDarkColors[colorIndex];
    }
  }

  // 创建评论节点列表
  const commentNodeList = [];
  for (const comment of comments) {
    const userName = userNameDict[comment.user];
    const userColor = userColorDict[comment.user];

    // 获取被回复用户的匿名名字
    let repliedName = null;
    if (comment.replyTo) {
      const repliedComment = comments.find((c) => c.cid === comment.replyTo);
      if (repliedComment) {
        repliedName = userNameDict[repliedComment.user];
      }
    }

    commentNodeList.push(
      <CommentCard
        key={comment.cid}
        comment={comment}
        color={userColor}
        name={userName}
        repliedName={repliedName}
        onClick={() => setSelectedReplyToCid(comment.cid)}
      />
    );
  }

  return (
    <div className="w-full space-y-5">
      {/* 评论卡片列表 */}
      {commentNodeList}

      {/* 回复表单 */}
      <ReplyCommentForm
        pid={hole.pid}
        replyTo={selectedReplyToCid}
        onClick={() => setSelectedReplyToCid(null)}
      />
    </div>
  );
}
