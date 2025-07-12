/**
 * Icon 组件 - 用于显示 icomoon 图标
 */
export default function Icon({ name, className = "", ...props }) {
  const iconClass = `icon-${name} mt-1 ${className}`.trim();
  return <i className={iconClass} {...props} />;
}
