import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * 用户昵称状态管理 - 使用 Zustand 创建全局状态
 */
const useUserStore = create(
  persist(
    (set, get) => ({
      userName: "",
      setUserName: (name) => set({ userName: name }),
      getUserName: () => get().userName,
    }),
    {
      name: "treehole-user", // localStorage key
      partialize: (state) => ({ userName: state.userName }), // 只持久化用户名
    }
  )
);

export default useUserStore;
