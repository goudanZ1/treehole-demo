import Icon from "../icon";

/**
 * CommentBadge 组件 - 显示评论数和评论图标（如果没有评论就不显示）
 */
export function CommentBadge({ commentNum }) {
  if (!commentNum || commentNum === 0) {
    return null;
  }
  return (
    <div className="flex items-center gap-1.25">
      <span>{commentNum}</span>
      <Icon name="bubble" />
    </div>
  );
}

/**
 * LikeBadge 组件 - 显示收藏数和收藏图标（如果没有收藏就不显示）
 * 
 */
export function LikeBadge({ likeNum, isLike }) {
  if (!likeNum || likeNum === 0) {
    return null;
  }

  // isLike 为真表示已经收藏，isLike 为 false 表示还未收藏
  
  return (
    <div className="flex items-center gap-1.25">
      <span>{likeNum}</span>
      <Icon name="star-empty" />
    </div>
  );
}

/**
 * ReplyButton 组件 - 回复评论按钮
 */
export function ReplyButton({ onClick }) {
  return (
    <button className="flex items-center gap-1.25" onClick={onClick}>
      <Icon name="reply" />
      <span className="hover:text-gray-400 hover:underline">回复</span>
    </button>
  );
}
