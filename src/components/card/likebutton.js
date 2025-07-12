"use client";

import useUserStore from "@/store/userstore";
import { updateHoleLike } from "@/lib/actions";
import Icon from "../icon";

/**
 * LikeButton 组件 - 对一个树洞进行收藏或取消收藏
 */
export default function LikeButton({ pid, likedBy = [] }) {
  const { userName } = useUserStore();

  // 判断当前用户是否已经收藏
  const isLiked = userName && likedBy.includes(userName);

  // 根据收藏状态确定图标和文字
  const iconName = isLiked ? "star-full" : "star-empty";
  const text = isLiked ? "已关注" : "未关注";

  return (
    <form action={updateHoleLike} className="inline-block">
      <input type="hidden" name="pid" value={pid} />
      <input type="hidden" name="user" value={userName || ""} />
      <input type="hidden" name="isLike" value={!isLiked} />

      <button
        type="submit"
        disabled={!userName}
        className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#292929] 
                ${
                  !userName
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-indigo-300 hover:cursor-pointer"
                }
            `}
      >
        <Icon name={iconName} />
        <span className={`${!!userName && "hover:underline"}`}>{text}</span>
      </button>
    </form>
  );
}
