import Link from "next/link";
import Icon from "../icon";

/**
 * NavLink 组件 - 带图标的导航链接
 */
export default function NavLink({ iconName, text, href }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 px-3 py-1 rounded-lg hover:bg-[#666]"
    >
      <Icon name={iconName} />
      <span className="whitespace-nowrap">{text}</span>
    </Link>
  );
}
