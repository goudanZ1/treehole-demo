"use client";

import Link from "next/link";
import { CommentBadge, LikeBadge } from "./cardbadges";
import { formatTimestamp } from "@/lib/utils";
import useUserStore from "@/store/userstore";

/**
 * HoleCard 组件 - 展示单条树洞
 */
export default function HoleCard({ hole }) {
  const { userName } = useUserStore();

  // 判断当前用户是否收藏了这个树洞
  const isLike = hole.likedBy && hole.likedBy.includes(userName);

  return (
    <Link href={`/hole?pid=${hole.pid}`} className="w-full block">
      <div className="w-full bg-[#292929] rounded-lg pl-3 pr-3 pt-2 pb-4 hover:bg-[#404040] transition-colors duration-200 cursor-pointer">
        {/* 先放一行树洞信息 */}
        <div className="flex items-center justify-between mb-1.5 text-sm">
          {/* 左侧：树洞号和时间 */}
          <div className="flex items-center gap-3">
            <span
              className="text-[#bbb] pt-[2px]"
              style={{ fontFamily: "Consolas" }}
            >
              #{hole.pid}
            </span>
            <span>{formatTimestamp(hole.timestamp)}</span>
          </div>

          {/* 右侧：评论数和收藏数 */}
          <div className="flex items-center pr-1 gap-4">
            <CommentBadge commentNum={hole.commentNum} />
            <LikeBadge likeNum={hole.likeNum} isLike={isLike} />
          </div>
        </div>

        {/* 树洞内容 */}
        <div className="break-words whitespace-pre-wrap leading-snug">
          {hole.text}
        </div>
      </div>
    </Link>
  );
}
