import { getHoleById, getCommentsByPid } from "@/lib/actions";
import LikeButton from "@/components/card/likebutton";
import HoleCard from "@/components/card/holecard";
import CommentCardList from "@/components/card/comment-card-list";

export default async function HolePage({ searchParams }) {
  var { pid } = await searchParams;
  pid = parseInt(pid);
  if (!pid) {
    return <div className="text-lg text-center">无效的树洞ID</div>;
  }

  // 获取树洞详情
  const hole = await getHoleById(pid);

  if (!hole) {
    return <div className="text-lg text-center">树洞不存在</div>;
  }

  // 获取评论数据
  const comments = await getCommentsByPid(pid);

  return (
    <div className="flex flex-col items-center gap-6">
      <LikeButton pid={pid} likedBy={hole.likedBy} />
      <HoleCard hole={hole} />
      <CommentCardList hole={hole} comments={comments} />
    </div>
  );
}
