"use client";

import { useState } from "react";
import useUserStore from "@/store/userstore";
import Icon from "../icon";

/**
 * UserNameInput 组件 - 用户名输入框与确认按钮
 */
export default function UserNameInput() {
  const { userName, setUserName } = useUserStore();
  const [localUserName, setLocalUserName] = useState(userName);

  // 处理输入变化
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalUserName(value); // 只更新本地状态
  };

  // 处理确认按钮点击
  const handleConfirm = () => {
    setUserName(localUserName); // 更新全局状态
  };

  // 根据本地状态判断是否需要禁用更新按钮
  const isButtonDisabled = localUserName === userName;

  return (
    <div className="flex items-center gap-4 min-w-0">
      <div className="flex items-center relative flex-1 min-w-0">
        {/* 用户图标 */}
        <Icon name="user" className="absolute left-3" />

        {/* 输入框 */}
        <input
          type="text"
          onChange={handleInputChange}
          placeholder={userName || "请输入您的昵称..."}
          className="w-full pl-9 pr-4 py-1 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* 更新按钮 */}
      <button
        onClick={handleConfirm}
        disabled={isButtonDisabled}
        className={`px-3 py-1 rounded-lg whitespace-nowrap ${
          isButtonDisabled
            ? "bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-gray-500 cursor-not-allowed"
            : "bg-blue-600 border border-blue-800 hover:bg-blue-500"
        }`}
      >
        更新
      </button>

      {/* 用户名显示 */}
      <span className="whitespace-nowrap">
        （当前用户：{userName || "暂无"}）
      </span>
    </div>
  );
}
