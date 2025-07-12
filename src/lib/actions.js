/* 70% 智能，30% 人工 */
/* 你不需要阅读这份文件 */

"use server";

import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";

// 树洞数据文件路径
const DATA_FILE_PATH = path.join(process.cwd(), "data", "hole.json");

// 评论数据文件路径
const COMMENT_FILE_PATH = path.join(process.cwd(), "data", "comment.json");

/**
 * 读取所有树洞数据
 * @returns {Array} 所有树洞的数组，按时间排序（最新的在前面），每条树洞包含所有原始属性
 */
export async function getAllHoles() {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf8");
    const holes = JSON.parse(fileContent);
    return holes;
  } catch (error) {
    console.error("读取树洞数据失败:", error);
    return [];
  }
}

/**
 * Server Action - 添加新树洞
 * @param {FormData} formData - 表单数据
 */
export async function addHole(formData) {
  const user = formData.get("user");
  const text = formData.get("text");

  if (!user || !text) {
    throw new Error("用户名和内容不能为空");
  }

  try {
    // 读取现有数据
    const holes = await getAllHoles();

    // 生成新的pid（基于现有最大pid加1）
    let newPid = 1;
    if (holes.length > 0) {
      newPid = holes[0].pid + 1;
    }

    // 创建完整的树洞对象
    const hole = {
      pid: newPid,
      user: user,
      text: text,
      timestamp: Math.floor(Date.now() / 1000), // Unix时间戳（秒）
      commentNum: 0,
      likeNum: 1,
      likedBy: [user],
    };

    // 将新树洞添加到数组开头（最新的在前面）
    holes.unshift(hole);

    // 写入文件
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(holes, null, 2), "utf8");
  } catch (error) {
    console.error("添加树洞失败:", error);
    throw new Error("添加树洞失败");
  }

  // 发布成功后重定向到首页
  redirect("/");
}

/**
 * 根据pid获取单个树洞
 * @param {number} pid - 树洞ID
 * @returns {Object|null} 树洞对象或null
 */
export async function getHoleById(pid) {
  if (!pid) {
    throw new Error("树洞ID不能为空");
  }

  try {
    const holes = await getAllHoles();
    const hole = holes.find((hole) => hole.pid === pid);
    return hole || null;
  } catch (error) {
    console.error("获取树洞失败:", error);
    throw new Error("获取树洞失败");
  }
}

/**
 * Server Action - 更新树洞的收藏数
 * @param {FormData} formData - 表单数据
 */
export async function updateHoleLike(formData) {
  const pid = parseInt(formData.get("pid"));
  const user = formData.get("user");
  const isLike = formData.get("isLike") === "true";

  if (!pid || !user) {
    throw new Error("参数不完整");
  }

  try {
    const holes = await getAllHoles();
    const holeIndex = holes.findIndex((hole) => hole.pid === pid);

    if (holeIndex === -1) return false;

    const hole = holes[holeIndex];

    if (isLike) {
      // 收藏：如果用户还没收藏过，则添加
      if (!hole.likedBy.includes(user)) {
        hole.likedBy.push(user);
        hole.likeNum = hole.likedBy.length;
      }
    } else {
      // 取消收藏：移除用户
      const userIndex = hole.likedBy.indexOf(user);
      if (userIndex > -1) {
        hole.likedBy.splice(userIndex, 1);
        hole.likeNum = hole.likedBy.length;
      }
    }

    // 写入文件
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(holes, null, 2), "utf8");
  } catch (error) {
    console.error("更新收藏失败:", error);
    throw new Error("更新收藏失败");
  }

  // 重定向回当前页面以刷新数据
  redirect(`/hole?pid=${pid}`);
}

/**
 * 读取所有评论数据
 * @returns {Array} 所有评论的数组，按时间排序（最早的在前面）
 */
async function getAllComments() {
  try {
    const fileContent = await fs.readFile(COMMENT_FILE_PATH, "utf8");
    const comments = JSON.parse(fileContent);
    return comments;
  } catch (error) {
    console.error("读取评论数据失败:", error);
    return [];
  }
}

/**
 * 读取一个树洞的所有评论
 * @param {number} pid - 树洞ID
 * @returns {Array} 该树洞的所有评论，按时间排序（最早的在前面）
 */
export async function getCommentsByPid(pid) {
  if (!pid) {
    throw new Error("树洞ID不能为空");
  }

  try {
    const comments = await getAllComments();
    const holeComments = comments.filter((comment) => comment.pid === pid);
    return holeComments;
  } catch (error) {
    console.error("获取评论失败:", error);
    throw new Error("获取评论失败");
  }
}

/**
 * Server Action - 添加一条评论
 * @param {FormData} formData - 表单数据
 */
export async function addComment(formData) {
  const pid = parseInt(formData.get("pid"));
  const user = formData.get("user");
  const text = formData.get("text");
  const replyTo = formData.get("replyTo")
    ? parseInt(formData.get("replyTo"))
    : null;

  if (!pid || !user || !text) {
    throw new Error("评论信息不完整");
  }

  try {
    // 读取现有评论数据（已按时间排序）
    const comments = await getAllComments();

    // 生成新的cid（基于现有最大cid加1）
    let newCid = 1;
    if (comments.length > 0) {
      const maxCid = Math.max(...comments.map((comment) => comment.cid));
      newCid = maxCid + 1;
    }

    // 创建完整的评论对象
    const comment = {
      cid: newCid,
      pid: pid,
      user: user,
      text: text,
      timestamp: Math.floor(Date.now() / 1000), // Unix时间戳（秒）
      replyTo: replyTo,
    };

    // 将新评论添加到数组末尾（因为时间戳最新，自然排在最后）
    comments.push(comment);

    // 写入评论文件
    await fs.writeFile(
      COMMENT_FILE_PATH,
      JSON.stringify(comments, null, 2),
      "utf8"
    );

    // 更新对应树洞的评论数量
    await updateHoleCommentCount(pid);
  } catch (error) {
    console.error("添加评论失败:", error);
    throw new Error("添加评论失败");
  }

  // 添加评论成功后重定向回树洞详情页面
  redirect(`/hole?pid=${pid}`);
}

/**
 * 更新树洞的评论数量
 * @param {number} pid - 树洞ID
 * @returns {boolean} 是否更新成功
 */
async function updateHoleCommentCount(pid) {
  try {
    const holes = await getAllHoles();
    const holeIndex = holes.findIndex((hole) => hole.pid === pid);

    if (holeIndex === -1) return false;

    // 直接将评论数加一
    holes[holeIndex].commentNum += 1;

    // 写入文件
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(holes, null, 2), "utf8");

    return true;
  } catch (error) {
    console.error("更新树洞评论数量失败:", error);
    return false;
  }
}
