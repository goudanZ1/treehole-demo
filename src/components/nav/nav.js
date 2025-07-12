import NavLink from "./navlink";
import UserNameInput from "./username-input";

/**
 * Nav 组件 - 页面顶部导航栏
 */
export default function Nav() {
  return (
    <nav className="fixed z-50 bg-[rgba(31,31,31,0.8)] backdrop-blur-sm w-full py-5 px-4">
      {/* Treehole 标题和装饰线 */}
      <div className="flex items-center justify-center gap-8 mb-3">
        <div className="flex-1 h-px bg-[#ededed]"></div>
        <h1 className="text-3xl pb-1 font-semibold">Treehole</h1>
        <div className="flex-1 h-px bg-[#ededed]"></div>
      </div>

      {/* 导航链接和用户名输入框 */}
      <div className="flex flex-col gap-3 items-center justify-center md:flex-row md:gap-6">
        <div className="flex items-center justify-center gap-3">
          <NavLink iconName="home" text="首页" href="/" />
          <NavLink iconName="plus" text="发表" href="/send" />
        </div>
        <div>
          <UserNameInput />
        </div>
      </div>
    </nav>
  );
}
