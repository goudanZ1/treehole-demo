import "@/styles/globals.css";
import "@/styles/icomoon.css";
import Nav from "@/components/nav/nav";

export const metadata = {
  title: "自研树洞",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        {/* 页面背景 */}
        <div
          className="fixed inset-0 -z-10 bg-white bg-cover bg-center opacity-75"
          style={{
            backgroundImage:
              'url("/background.jpg")',
          }}
        />
        {/* 固定导航栏 */}
        <Nav />
        {/* 子布局或子页面 */}
        <main className="pt-44 md:pt-32">
          <div className="max-w-3xl mx-auto p-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
