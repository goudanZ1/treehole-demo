"use client";

import useUserStore from "@/store/userstore";
import { addComment } from "@/lib/actions";

export default function ReplyCommentForm({ pid, replyTo = null, onClick }) {
  const { userName } = useUserStore();

  return (
    <div className="bg-[rgba(31,31,31,0.9)] backdrop-blur-sm rounded-xl px-6 pt-5 pb-6">
      <div className="flex flex-row items-center gap-6 mb-4">
        <h1 className="text-xl font-bold">
          {replyTo ? `回复评论 #${replyTo}` : "添加评论"}
        </h1>
        {replyTo && (
          <button
            className="hover:text-gray-400 hover:underline"
            onClick={onClick}
          >
            取消回复
          </button>
        )}
      </div>
      <form action={addComment} className="space-y-4">
        <input type="hidden" name="pid" value={pid} />
        <input type="hidden" name="user" value={userName} />
        {replyTo && <input type="hidden" name="replyTo" value={replyTo} />}

        <textarea
          name="text"
          placeholder={replyTo ? "写下你的回复..." : "写下你的评论..."}
          className="w-full h-60 px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
          required
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg pl-4 pr-3.5 py-2 bg-blue-600 hover:bg-blue-500"
          >
            {replyTo ? "发表回复" : "发表评论"}
          </button>
        </div>
      </form>
    </div>
  );
}
