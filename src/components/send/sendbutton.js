import Icon from "@/components/icon";

export default function SendButton() {
  return (
    <button
      type="submit"
      className="flex items-center gap-1.5 rounded-lg pl-4 pr-3.5 py-2 bg-blue-600 hover:bg-blue-500"
    >
      <Icon name="send" />
      <span>发布</span>
    </button>
  );
}
