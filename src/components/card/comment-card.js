import { ReplyButton } from "./cardbadges";
import { formatTimestamp } from "@/lib/utils";

/**
 * CommentCard 组件 - 展示单条评论
 */
export default function CommentCard({
  comment,
  color,
  name,
  repliedName,
  onClick,
}) {
  return (
    <div
      className={`w-full rounded-lg pl-3 pr-3 pt-2 pb-4`}
      style={{ backgroundColor: color }}
    >
      {/* 先放一行评论信息 */}
      <div className="flex items-center justify-between mb-1.5 text-sm">
        {/* 左侧：评论号和时间 */}
        <div className="flex items-center gap-3">
          <span
            className="text-[#bbb] pt-[2px]"
            style={{ fontFamily: "Consolas" }}
          >
            #{comment.cid}
          </span>
          <span>{formatTimestamp(comment.timestamp)}</span>
        </div>

        {/* 右侧：回复按钮 */}
        <div className="pr-1">
          <ReplyButton onClick={onClick} />
        </div>
      </div>

      {/* 评论内容，添加前缀 */}
      <div className="break-words whitespace-pre-wrap leading-snug">
        [{name}] {!!repliedName && "Re " + repliedName + ": "}
        {comment.text}
      </div>
    </div>
  );
}
