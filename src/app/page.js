import { getAllHoles } from "@/lib/actions";
import HoleCard from "@/components/card/holecard";

export default async function Page() {
  // 获取所有树洞数据
  const holes = await getAllHoles();

  if (holes.length === 0) {
    return <div className="text-lg text-center">树洞暂无内容</div>;
  }
  return (
    <div className="space-y-6">
      {holes.map((hole) => (
        <HoleCard key={hole.pid} hole={hole} />
      ))}
    </div>
  );
}
