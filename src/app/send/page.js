"use client";

import useUserStore from "@/store/userstore";
import { addHole } from "@/lib/actions";
import SendButton from "@/components/send/sendbutton";

export default function Page() {
  const { userName } = useUserStore();

  return (
    <div className="bg-[rgba(31,31,31,0.8)] backdrop-blur-sm rounded-xl px-6 pt-5 pb-6">
      <h1 className="text-xl font-bold mb-4">发布新树洞</h1>
      <form action={addHole} className="space-y-4">
        {/* 隐藏的用户名字段 */}
        <input type="hidden" name="user" value={userName} />

        {/* 文本输入框 */}
        <textarea
          name="text"
          placeholder="分享你的想法..."
          className="w-full h-60 px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
          required
        />

        {/* 发布按钮 */}
        <div className="flex justify-end">
          <SendButton />
        </div>
      </form>
    </div>
  );
}
