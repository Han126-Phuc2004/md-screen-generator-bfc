import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AlertTriangle,
  Bell,
  Check,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Hash,
  Landmark,
  LayoutDashboard,
  Mail,
  Plus,
  RefreshCw,
  Search,
  Send,
  Star,
  Upload,
  X,
} from "lucide-react";

/* ─── shared chrome (đồng bộ FE02) ───────────────────────── */

function BrandMark({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-9 w-9 text-lg" : "h-11 w-11 text-xl";
  return (
    <span className={`grid ${box} place-items-center rounded-xl bg-[#FFF4ED] font-extrabold text-[#F37021]`}>
      F
    </span>
  );
}

const APP_MENU: [string, string][] = [
  ["Bảng điều khiển", "/app"],
  ["Đóng góp", "/app/dong-gop"],
  ["Hồ sơ xin giải ngân", "/app/proposal"],
  ["Dự án của tôi", "/app/du-an"],
  ["Báo cáo tiến độ", "/app/tien-do"],
  ["Kiểm toán", "/app/duyet-dong-gop"],
  ["Giao dịch", "/giao-dich"],
  ["Người dùng", "/app/nguoi-dung"],
  ["Báo cáo", "/app/bao-cao"],
  ["Thông báo", "/app/thong-bao"],
  ["Cài đặt", "/app/ho-so"],
];

const SETTINGS_PATHS = [
  "/app/ho-so",
  "/app/phien",
  "/app/xoa-tai-khoan",
  "/app/cau-hinh-quy",
  "/app/stk-sso",
  "/app/dot-mo-don",
  "/app/cai-dat-thong-bao",
  "/app/email-templates",
];

function menuActive(href: string, active: string) {
  if (active === href) return true;
  if (href === "/app" && active === "/app") return true;
  if (href === "/app/dong-gop" && active.startsWith("/app/dong-gop")) return true;
  if (href === "/app/duyet-dong-gop" && (active.startsWith("/app/duyet-dong-gop") || active.startsWith("/app/kiem-toan")))
    return true;
  if (href === "/app/thong-bao" && (active.startsWith("/app/thong-bao") || active.startsWith("/app/broadcast")))
    return true;
  if (href === "/app/ho-so" && SETTINGS_PATHS.some((p) => active === p || active.startsWith(p + "/"))) return true;
  return false;
}

function AppShell({
  children,
  title,
  breadcrumb = "FSOLVER",
  active = "/app",
}: {
  children: React.ReactNode;
  title: string;
  breadcrumb?: string;
  active?: string;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <aside className="flex w-[260px] shrink-0 flex-col border-r border-[#E2E8F0] bg-white">
        <div className="flex h-[72px] items-center gap-2 border-b px-5">
          <BrandMark size="sm" />
          <span className="text-sm font-bold text-[#a04100]">
            FSOLVER <span className="font-medium text-slate-500">Đại học FPT</span>
          </span>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {APP_MENU.map(([label, href]) => {
            const isActive = menuActive(href, active);
            return (
              <Link
                key={href + label}
                to={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${
                  isActive
                    ? "border-l-[3px] border-[#F37021] bg-[#FFF4ED] text-[#F37021]"
                    : "border-l-[3px] border-transparent text-slate-600 hover:bg-slate-50"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[72px] items-center justify-between border-b bg-white px-8">
          <div>
            <p className="text-xs text-slate-500">
              {breadcrumb} <ChevronRight className="inline" size={12} /> {title}
            </p>
            <h1 className="text-lg font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/app/thong-bao" className="relative rounded-lg border p-2 text-slate-600">
              <Bell size={18} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#F37021]" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#FFF4ED] text-sm font-bold text-[#F37021]">
                NA
              </span>
              <div className="text-sm">
                <p className="font-semibold">Nguyễn Minh Anh</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

function PublicShell({ children }: { children: React.ReactNode }) {
  const nav = [
    ["Trang chủ", "/"],
    ["Các quỹ", "/cac-quy"],
    ["Giao dịch", "/giao-dich"],
    ["Minh bạch", "/minh-bach"],
    ["Đóng góp", "/dong-gop"],
  ];
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-20 h-20 border-b border-[#e0c0b2] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <BrandMark size="sm" />
            <span className="text-base font-bold text-[#a04100]">
              FSOLVER <span className="font-medium text-slate-500">Đại học FPT</span>
            </span>
          </Link>
          <nav className="flex h-full items-center gap-7">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                to={href}
                className="flex h-full items-center border-b-2 border-transparent text-[13px] font-medium text-slate-600 hover:text-[#F37021]"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/dang-nhap" className="text-sm font-semibold text-slate-700">
              Đăng nhập
            </Link>
            <Link to="/dong-gop" className="f-btn-primary h-10 px-4">
              Đóng góp ngay
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-8 text-xs text-slate-500">
          <p>
            <b className="mr-2 text-sm text-[#a04100]">FSOLVER</b> © 2026 Hệ thống Quản trị Quỹ Sinh viên FSOLVER -
            Đại học FPT
          </p>
          <div className="flex gap-5 whitespace-nowrap">
            <span>Về FSOLVER</span>
            <span>Quy trình minh bạch</span>
            <span>Chính sách bảo mật</span>
            <span>Điều khoản sử dụng</span>
            <span>Liên hệ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Badge({
  children,
  type = "success",
}: {
  children: React.ReactNode;
  type?: "success" | "warning" | "info" | "neutral" | "danger";
}) {
  const cls = {
    success: "bg-[#DCFCE7] text-[#166534]",
    warning: "bg-[#FEF3C7] text-[#92400E]",
    info: "bg-[#DBEAFE] text-[#1E40AF]",
    neutral: "bg-slate-100 text-slate-600",
    danger: "bg-[#FEE2E2] text-[#991B1B]",
  }[type];
  return <span className={`badge ${cls}`}>{children}</span>;
}

function AdminSettingsTabs({ active }: { active: string }) {
  const tabs: [string, string][] = [
    ["Cấu hình quỹ", "/app/cau-hinh-quy"],
    ["STK & SSO", "/app/stk-sso"],
    ["Đợt mở đơn", "/app/dot-mo-don"],
    ["Thông báo & CSAT", "/app/cai-dat-thong-bao"],
    ["Email templates", "/app/email-templates"],
    ["Hồ sơ", "/app/ho-so"],
  ];
  return (
    <div className="mb-6 flex flex-wrap gap-2 border-b pb-3">
      {tabs.map(([label, href]) => (
        <Link
          key={href}
          to={href}
          className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
            active === href ? "bg-[#FFF4ED] text-[#F37021]" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

const FUNDS = [
  ["Quỹ Học tập", "Hỗ trợ học phí, tài liệu", "Thấp", "1.245.000.000 ₫", true, 50_000_000, 3],
  ["Quỹ Khẩn cấp", "Hỗ trợ đột xuất", "Thấp", "382.500.000 ₫", true, 30_000_000, 1],
  ["Quỹ Nghiên cứu", "Đề tài nghiên cứu SV", "TB", "690.000.000 ₫", true, 40_000_000, 2],
  ["Quỹ Startup", "Ý tưởng khởi nghiệp", "Cao", "420.000.000 ₫", true, 25_000_000, 4],
  ["Quỹ Tình nguyện", "Dự án thiện nguyện", "TB", "278.000.000 ₫", true, 20_000_000, 0],
  ["Quỹ Vùng cao", "Cơ hội học tập vùng khó", "Thấp", "565.000.000 ₫", true, 35_000_000, 2],
  ["Quỹ Phát triển Cộng đồng", "Sáng kiến cộng đồng", "TB", "812.000.000 ₫", false, 40_000_000, 0],
] as const;

/* ─── S60 Admin Hub ──────────────────────────────────────── */

export function AdminHubPage() {
  const modules: [string, string, string, string][] = [
    ["Người dùng", "Phân quyền · 6 role", "/app/nguoi-dung", "#0072BC"],
    ["Cấu hình quỹ", "7 quỹ · ngưỡng số dư", "/app/cau-hinh-quy", "#F37021"],
    ["STK & SSO", "Thanh toán · đăng nhập", "/app/stk-sso", "#00A859"],
    ["Đợt mở đơn", "Application rounds", "/app/dot-mo-don", "#7C3AED"],
    ["Đóng góp", "Lịch sử & đối soát", "/app/dong-gop", "#F37021"],
    ["Duyệt đóng góp", "Queue audit", "/app/duyet-dong-gop", "#DC2626"],
    ["Broadcast", "Gửi thông báo hàng loạt", "/app/broadcast", "#0072BC"],
    ["Email templates", "OTP · tri ân · duyệt", "/app/email-templates", "#0F172A"],
    ["Thông báo", "Trung tâm in-app", "/app/thong-bao", "#F59E0B"],
    ["KPI / Báo cáo", "Trung tâm báo cáo", "/app/bao-cao", "#16A34A"],
  ];

  return (
    <AppShell title="Bảng điều khiển Admin tổng" breadcrumb="Admin" active="/app">
      <div className="space-y-6">
        <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-5 py-4">
          <p className="text-sm font-semibold text-[#991B1B]">Cảnh báo hệ thống</p>
          <div className="mt-3 grid gap-2 text-sm text-[#7F1D1D] md:grid-cols-3">
            <p className="flex items-start gap-2">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              Quỹ Startup sắp chạm ngưỡng low-balance (còn 42tr / ngưỡng 25tr — theo dõi)
            </p>
            <p className="flex items-start gap-2">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              3 cờ fraud / Need Review chờ Audit xử lý
            </p>
            <p className="flex items-start gap-2">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              5 báo cáo mốc giải ngân quá hạn &gt; 7 ngày
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            ["Tổng huy động", "4,39 tỷ ₫", "Học kỳ 2/2026"],
            ["Chờ duyệt đóng góp", "12", "Queue audit"],
            ["Proposal mở", "38", "3 đợt đang mở"],
            ["User active 7 ngày", "1.842", "+6,2% tuần trước"],
          ].map(([l, v, s]) => (
            <div key={l} className="f-card p-5">
              <div className="mb-3 h-1.5 w-10 rounded-full bg-[#F37021]" />
              <p className="text-sm text-slate-500">{l}</p>
              <p className="mt-1 text-2xl font-bold">{v}</p>
              <p className="mt-2 text-xs text-slate-500">{s}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">Lối tắt quản trị</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {modules.map(([title, desc, href, color]) => (
              <Link key={href + title} to={href} className="f-card group p-5 transition hover:border-[#F37021]/40">
                <div
                  className="mb-3 grid h-10 w-10 place-items-center rounded-xl text-white"
                  style={{ backgroundColor: color }}
                >
                  <LayoutDashboard size={18} />
                </div>
                <p className="font-bold group-hover:text-[#F37021]">{title}</p>
                <p className="mt-1 text-xs text-slate-500">{desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[1.4fr_1fr] gap-6">
          <div className="f-card p-6">
            <h3 className="font-bold">Hoạt động gần đây</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                ["18/07 · 10:32", "Đóng góp SCF-2026-01842 đã xác thực", "Audit"],
                ["18/07 · 09:15", "Mở đợt Hè 2026 — Quỹ Học tập", "Admin"],
                ["17/07 · 16:40", "Broadcast: Nhắc deadline báo cáo mốc 2", "System"],
                ["17/07 · 14:02", "Cập nhật STK Đoàn TN · Vietcombank", "Admin"],
              ].map(([t, m, who]) => (
                <li key={m} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{m}</p>
                    <p className="text-xs text-slate-500">{t}</p>
                  </div>
                  <Badge type="neutral">{who}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="f-card p-6">
            <h3 className="font-bold">Ghi chú vận hành</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              FSOLVER <b>không giữ tiền thật</b>. Mọi STK thụ hưởng thuộc Đoàn / Hội / CTSV. Cấu hình quỹ, SSO và
              broadcast chỉ dành cho Admin.
            </p>
            <Link to="/minh-bach" className="mt-4 inline-block text-sm font-semibold text-[#0072BC]">
              Xem dashboard minh bạch công khai →
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ─── S16 Admin cấu hình quỹ ─────────────────────────────── */

export function AdminFundsConfigPage() {
  const [funds, setFunds] = useState(
    FUNDS.map((f, i) => ({
      id: i + 1,
      name: f[0],
      desc: f[1],
      risk: f[2],
      balance: f[3],
      enabled: f[4],
      threshold: f[5],
      openProposals: f[6],
    })),
  );
  const [toast, setToast] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const toggle = (id: number) => {
    const fund = funds.find((f) => f.id === id);
    if (!fund) return;
    if (fund.enabled) {
      if (fund.openProposals > 0) {
        setToast(`Không thể tắt «${fund.name}»: còn ${fund.openProposals} hồ sơ dở dang.`);
        setTimeout(() => setToast(""), 3200);
        return;
      }
      // Chặn tắt khi còn số dư (mock: mọi chuỗi có chữ số khác 0)
      const hasBalance = /[1-9]/.test(fund.balance);
      if (hasBalance) {
        setToast(`Không thể tắt «${fund.name}»: quỹ còn số dư ${fund.balance}.`);
        setTimeout(() => setToast(""), 3200);
        return;
      }
    }
    setFunds((list) => list.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
  };

  const editing = funds.find((f) => f.id === editId);

  return (
    <AppShell title="Cấu hình quỹ" breadcrumb="Cài đặt" active="/app/cau-hinh-quy">
      <div className="space-y-5">
        <AdminSettingsTabs active="/app/cau-hinh-quy" />
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-600">
              CRUD 7 quỹ: bật/tắt, rủi ro mặc định, ngưỡng low-balance (FR-06-06). Không tắt quỹ còn số dư hoặc hồ sơ
              dở.
            </p>
          </div>
          <button className="f-btn-primary h-10 px-4 text-xs">
            <Plus size={15} /> Thêm quỹ
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            ["Tổng quỹ", "7", "#F37021"],
            ["Đang bật", String(funds.filter((f) => f.enabled).length), "#00A859"],
            ["Đang tắt", String(funds.filter((f) => !f.enabled).length), "#94A3B8"],
            ["Hồ sơ dở", String(funds.reduce((s, f) => s + f.openProposals, 0)), "#0072BC"],
          ].map(([l, v, c]) => (
            <div key={l} className="f-card p-4">
              <div className="mb-2 h-1 w-8 rounded-full" style={{ backgroundColor: c }} />
              <p className="text-xs text-slate-500">{l}</p>
              <p className="text-xl font-bold">{v}</p>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-xs text-slate-500">
              <tr>
                {["Quỹ", "Mô tả", "Rủi ro", "Số dư", "Ngưỡng low", "Hồ sơ dở", "Trạng thái", ""].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {funds.map((f) => (
                <tr key={f.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#FFF4ED] text-[#F37021]">
                        <Landmark size={15} />
                      </span>
                      <span className="font-semibold">{f.name}</span>
                    </div>
                  </td>
                  <td className="max-w-[160px] px-4 py-3 text-slate-600">{f.desc}</td>
                  <td className="px-4 py-3">
                    <Badge type={f.risk === "Cao" ? "warning" : f.risk === "TB" ? "info" : "success"}>
                      {f.risk}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-semibold">{f.balance}</td>
                  <td className="px-4 py-3 font-mono text-xs">{(f.threshold / 1_000_000).toFixed(0)}tr ₫</td>
                  <td className="px-4 py-3">{f.openProposals}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggle(f.id)}
                      className={`relative h-6 w-11 rounded-full transition ${
                        f.enabled ? "bg-[#F37021]" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                          f.enabled ? "left-5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-sm font-semibold text-[#0072BC]" onClick={() => setEditId(f.id)}>
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editing && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div className="f-card w-full max-w-lg p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Sửa quỹ</h3>
                <button onClick={() => setEditId(null)}>
                  <X size={18} />
                </button>
              </div>
              <div className="mt-4 space-y-3">
                <label className="block">
                  <span className="f-label">Tên quỹ</span>
                  <input className="f-input" defaultValue={editing.name} />
                </label>
                <label className="block">
                  <span className="f-label">Mô tả</span>
                  <textarea className="f-input h-20 py-3" defaultValue={editing.desc} />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="f-label">Rủi ro mặc định</span>
                    <select className="f-input" defaultValue={editing.risk}>
                      <option>Thấp</option>
                      <option>TB</option>
                      <option>Cao</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="f-label">Ngưỡng low-balance (₫)</span>
                    <input className="f-input" defaultValue={editing.threshold.toLocaleString("vi-VN")} />
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button className="f-btn-secondary" onClick={() => setEditId(null)}>
                  Hủy
                </button>
                <button
                  className="f-btn-primary"
                  onClick={() => {
                    setEditId(null);
                    setToast("Đã lưu cấu hình quỹ.");
                    setTimeout(() => setToast(""), 2500);
                  }}
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div className="fixed bottom-6 right-6 z-50 rounded-xl border bg-white px-4 py-3 text-sm font-semibold shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </AppShell>
  );
}

/* ─── S17 STK & SSO ──────────────────────────────────────── */

export function AdminStkSsoPage() {
  const [tab, setTab] = useState<"pay" | "sso">("pay");
  const [ssoOn, setSsoOn] = useState(true);
  const [testMsg, setTestMsg] = useState("");

  return (
    <AppShell title="STK thụ hưởng & SSO" breadcrumb="Cài đặt" active="/app/stk-sso">
      <div className="mx-auto max-w-4xl space-y-5">
        <AdminSettingsTabs active="/app/stk-sso" />
        <div className="flex gap-2 border-b">
          {(
            [
              ["pay", "Thanh toán / STK"],
              ["sso", "SSO Trường"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`border-b-2 px-4 pb-3 text-sm font-semibold ${
                tab === k ? "border-[#F37021] text-[#F37021]" : "border-transparent text-slate-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "pay" ? (
          <div className="grid grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="f-card space-y-4 p-6">
              <h3 className="font-bold">Tài khoản nhận đóng góp</h3>
              <p className="text-xs text-slate-500">
                FSOLVER không giữ tiền. STK thuộc Đoàn / Hội / CTSV — hiển thị trên màn đóng góp công khai.
              </p>
              <label className="block">
                <span className="f-label">Chủ tài khoản</span>
                <input className="f-input" defaultValue="ĐOÀN THANH NIÊN ĐẠI HỌC FPT" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="f-label">Ngân hàng</span>
                  <select className="f-input">
                    <option>Vietcombank</option>
                    <option>BIDV</option>
                    <option>MB Bank</option>
                  </select>
                </label>
                <label className="block">
                  <span className="f-label">Số tài khoản</span>
                  <input className="f-input font-mono" defaultValue="1028 6868 88" />
                </label>
              </div>
              <label className="block">
                <span className="f-label">Chi nhánh</span>
                <input className="f-input" defaultValue="TP.HCM — CN Thủ Đức" />
              </label>
              <label className="block">
                <span className="f-label">Upload VietQR</span>
                <button
                  type="button"
                  className="flex h-24 w-full items-center justify-center gap-2 rounded-lg border border-dashed text-sm text-slate-500"
                >
                  <Upload size={17} /> Tải ảnh QR (PNG/JPG · tối đa 5MB)
                </button>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button className="f-btn-secondary">Hủy</button>
                <button className="f-btn-primary">Lưu STK</button>
              </div>
            </div>
            <div className="f-card p-6">
              <h3 className="font-bold">Preview đóng góp</h3>
              <div className="mt-4 rounded-xl bg-[#FFF4ED] p-4">
                <p className="text-xs text-slate-500">Tài khoản nhận</p>
                <p className="mt-1 font-bold">ĐOÀN THANH NIÊN ĐẠI HỌC FPT</p>
                <p className="font-mono text-base font-bold text-[#a04100]">1028 6868 88 · Vietcombank</p>
              </div>
              <div className="mt-4 grid h-40 place-items-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-500">
                VietQR preview
              </div>
              <p className="mt-4 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600">
                Nội dung CK gợi ý: <span className="font-mono">SCF DG [Họ tên]</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="f-card space-y-5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">SSO Đại học FPT</h3>
                <p className="mt-1 text-sm text-slate-500">Email .edu.vn · OIDC / SAML</p>
              </div>
              <button
                type="button"
                onClick={() => setSsoOn((v) => !v)}
                className={`relative h-6 w-11 rounded-full transition ${ssoOn ? "bg-[#F37021]" : "bg-slate-200"}`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                    ssoOn ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="f-label">Client ID</span>
                <input className="f-input font-mono text-xs" defaultValue="fsolver-prod-oidc" />
              </label>
              <label className="block">
                <span className="f-label">Client Secret</span>
                <input className="f-input font-mono text-xs" type="password" defaultValue="••••••••••••" />
              </label>
              <label className="col-span-2 block">
                <span className="f-label">Issuer / Metadata URL</span>
                <input className="f-input font-mono text-xs" defaultValue="https://sso.fpt.edu.vn/.well-known/openid-configuration" />
              </label>
              <label className="col-span-2 block">
                <span className="f-label">Redirect URI</span>
                <input className="f-input font-mono text-xs" defaultValue="https://fsolver.fpt.edu.vn/auth/callback" />
              </label>
            </div>
            <div className="rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] p-4 text-sm text-[#1E40AF]">
              <b>Fallback mật khẩu:</b> vẫn bật đăng nhập email/OTP khi SSO lỗi, để sinh viên không bị khóa ngoài giờ
              bảo trì IdP.
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="f-btn-secondary"
                onClick={() => {
                  setTestMsg("Kết nối SSO thành công · latency 180ms");
                  setTimeout(() => setTestMsg(""), 3000);
                }}
              >
                <RefreshCw size={15} /> Test kết nối
              </button>
              <button className="f-btn-primary">Lưu cấu hình SSO</button>
              {testMsg && <span className="text-sm font-semibold text-[#16A34A]">{testMsg}</span>}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

/* ─── S18 Đợt mở đơn ─────────────────────────────────────── */

export function AdminRoundsPage() {
  const [rounds, setRounds] = useState([
    {
      id: 1,
      name: "Hè 2026 — Quỹ Học tập",
      fund: "Quỹ Học tập",
      start: "01/06/2026",
      end: "31/08/2026",
      status: "Đang mở" as string,
    },
    {
      id: 2,
      name: "Hè 2026 — Quỹ Vùng cao",
      fund: "Quỹ Vùng cao",
      start: "15/06/2026",
      end: "15/09/2026",
      status: "Đang mở",
    },
    {
      id: 3,
      name: "Xuân 2026 — Quỹ Startup",
      fund: "Quỹ Startup",
      start: "01/02/2026",
      end: "30/04/2026",
      status: "Đã đóng",
    },
    {
      id: 4,
      name: "Xuân 2026 — Quỹ Nghiên cứu",
      fund: "Quỹ Nghiên cứu",
      start: "01/01/2026",
      end: "31/03/2026",
      status: "Đã đóng",
    },
  ]);
  const [showForm, setShowForm] = useState(false);

  return (
    <AppShell title="Đợt mở đơn proposal" breadcrumb="Cài đặt" active="/app/dot-mo-don">
      <div className="space-y-5">
        <AdminSettingsTabs active="/app/dot-mo-don" />
        <div className="flex items-start justify-between gap-4">
          <p className="max-w-2xl text-sm text-slate-600">
            Quản lý đợt nộp hồ sơ theo quỹ. Quá hạn: chặn submit proposal mới (FR-04-04 pre-check).
          </p>
          <button className="f-btn-primary h-10 px-4 text-xs" onClick={() => setShowForm(true)}>
            <Plus size={15} /> Tạo đợt mới
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            ["Đang mở", rounds.filter((r) => r.status === "Đang mở").length, "success"],
            ["Đã đóng", rounds.filter((r) => r.status === "Đã đóng").length, "neutral"],
            ["Tổng đợt", rounds.length, "info"],
          ].map(([l, v, t]) => (
            <div key={String(l)} className="f-card p-5">
              <p className="text-sm text-slate-500">{l}</p>
              <p className="mt-1 text-2xl font-bold">{v}</p>
              <div className="mt-2">
                <Badge type={t as "success" | "neutral" | "info"}>{String(l)}</Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-xs text-slate-500">
              <tr>
                {["Tên đợt", "Quỹ", "Bắt đầu", "Kết thúc", "Trạng thái", ""].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rounds.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-3 font-semibold">{r.name}</td>
                  <td className="px-4 py-3 text-slate-600">{r.fund}</td>
                  <td className="px-4 py-3">{r.start}</td>
                  <td className="px-4 py-3">{r.end}</td>
                  <td className="px-4 py-3">
                    <Badge type={r.status === "Đang mở" ? "success" : "neutral"}>{r.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {r.status === "Đang mở" ? (
                      <button
                        className="text-sm font-semibold text-[#DC2626]"
                        onClick={() =>
                          setRounds((list) =>
                            list.map((x) => (x.id === r.id ? { ...x, status: "Đã đóng" } : x)),
                          )
                        }
                      >
                        Đóng đợt
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">Chặn submit</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="f-card flex items-start gap-3 border-[#FEF3C7] bg-[#FFFBEB] p-4 text-sm text-[#92400E]">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <p>
            <b>Rule quá hạn:</b> Khi status = Đã đóng hoặc ngày hiện tại &gt; end date, wizard proposal trả lỗi
            «Đợt nộp đã kết thúc» và không cho submit.
          </p>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div className="f-card w-full max-w-lg p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Tạo đợt mở đơn</h3>
                <button onClick={() => setShowForm(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="mt-4 space-y-3">
                <label className="block">
                  <span className="f-label">Tên đợt</span>
                  <input className="f-input" placeholder="Thu 2026 — Quỹ …" />
                </label>
                <label className="block">
                  <span className="f-label">Quỹ</span>
                  <select className="f-input">
                    {FUNDS.map((f) => (
                      <option key={f[0]}>{f[0]}</option>
                    ))}
                  </select>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="f-label">Ngày bắt đầu</span>
                    <input className="f-input" type="date" defaultValue="2026-09-01" />
                  </label>
                  <label className="block">
                    <span className="f-label">Ngày kết thúc</span>
                    <input className="f-input" type="date" defaultValue="2026-11-30" />
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button className="f-btn-secondary" onClick={() => setShowForm(false)}>
                  Hủy
                </button>
                <button
                  className="f-btn-primary"
                  onClick={() => {
                    setRounds((list) => [
                      {
                        id: Date.now(),
                        name: "Thu 2026 — Quỹ Học tập",
                        fund: "Quỹ Học tập",
                        start: "01/09/2026",
                        end: "30/11/2026",
                        status: "Đang mở",
                      },
                      ...list,
                    ]);
                    setShowForm(false);
                  }}
                >
                  Tạo đợt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

/* ─── S21 Lịch sử đóng góp ───────────────────────────────── */

export function MyDonationsPage() {
  const rows = [
    ["SCF-DON-2026-01842", "18/07/2026", "Quỹ Học tập", "5.000.000 ₫", "Không", "Đã xác thực"],
    ["SCF-DON-2026-01790", "12/07/2026", "Quỹ Vùng cao", "2.000.000 ₫", "Có", "Đã xác thực"],
    ["SCF-DON-2026-01712", "05/07/2026", "Quỹ Khẩn cấp", "1.000.000 ₫", "Không", "Chờ đối soát"],
    ["SCF-DON-2026-01655", "28/06/2026", "Quỹ Startup", "3.500.000 ₫", "Không", "Không hợp lệ"],
    ["SCF-DON-2026-01580", "15/06/2026", "Quỹ Học tập", "500.000 ₫", "Có", "Đã xác thực"],
  ];

  return (
    <AppShell title="Lịch sử đóng góp của tôi" breadcrumb="Đóng góp" active="/app/dong-gop">
      <div className="space-y-5">
        <div className="grid grid-cols-4 gap-4">
          {[
            ["Tổng đã đóng góp", "12.000.000 ₫", "#F37021"],
            ["Đã xác thực", "4 khoản", "#00A859"],
            ["Chờ đối soát", "1 khoản", "#F59E0B"],
            ["Biên nhận", "5 file", "#0072BC"],
          ].map(([l, v, c]) => (
            <div key={l} className="f-card p-5">
              <div className="mb-3 h-1.5 w-10 rounded-full" style={{ backgroundColor: c }} />
              <p className="text-sm text-slate-500">{l}</p>
              <p className="mt-1 text-xl font-bold">{v}</p>
            </div>
          ))}
        </div>

        <div className="f-card grid grid-cols-[1.4fr_repeat(3,1fr)] gap-3 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={17} />
            <input className="f-input pl-9" placeholder="Tìm mã SCF-DON…" />
          </div>
          <select className="f-input">
            <option>Tất cả quỹ</option>
            {FUNDS.map((f) => (
              <option key={f[0]}>{f[0]}</option>
            ))}
          </select>
          <select className="f-input">
            <option>Tất cả trạng thái</option>
            <option>Đã xác thực</option>
            <option>Chờ đối soát</option>
            <option>Không hợp lệ</option>
          </select>
          <input className="f-input" defaultValue="01/06/2026 – 18/07/2026" readOnly />
        </div>

        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-xs text-slate-500">
              <tr>
                {["Mã", "Ngày", "Quỹ", "Số tiền", "Ẩn danh", "Trạng thái", "Biên nhận"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs font-medium">{r[0]}</td>
                  <td className="px-4 py-3 text-slate-600">{r[1]}</td>
                  <td className="px-4 py-3">{r[2]}</td>
                  <td className="px-4 py-3 font-semibold text-[#16A34A]">+ {r[3]}</td>
                  <td className="px-4 py-3">{r[4]}</td>
                  <td className="px-4 py-3">
                    <Badge
                      type={
                        r[5] === "Đã xác thực" ? "success" : r[5] === "Chờ đối soát" ? "warning" : "danger"
                      }
                    >
                      {r[5]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button className="inline-flex items-center gap-1 text-sm font-semibold text-[#0072BC]">
                      <Download size={14} /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="f-card flex items-center gap-4 p-5">
          <Hash className="text-[#0072BC]" />
          <div>
            <p className="font-semibold">Đóng góp đã xác thực gắn vào log bất biến</p>
            <p className="text-sm text-slate-500">Xem chuỗi hash công khai khi trạng thái = Đã xác thực.</p>
          </div>
          <Link to="/log-bat-bien" className="ml-auto text-sm font-semibold text-[#0072BC]">
            Xem log
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

/* ─── S22 Audit duyệt đóng góp ───────────────────────────── */

export function AuditDonationsPage() {
  const queue = [
    {
      id: "SCF-DON-2026-01850",
      name: "Lê Thu Hà",
      fund: "Quỹ Học tập",
      amount: "3.000.000 ₫",
      date: "18/07/2026 · 11:20",
      note: "Học bổng kỳ Thu",
      anon: false,
    },
    {
      id: "SCF-DON-2026-01848",
      name: "Ẩn danh",
      fund: "Quỹ Khẩn cấp",
      amount: "1.500.000 ₫",
      date: "18/07/2026 · 10:05",
      note: "—",
      anon: true,
    },
    {
      id: "SCF-DON-2026-01840",
      name: "Phạm Donor",
      fund: "Quỹ Vùng cao",
      amount: "10.000.000 ₫",
      date: "17/07/2026 · 16:40",
      note: "Thiết bị lớp học số",
      anon: false,
    },
  ];
  const [selected, setSelected] = useState(0);
  const [reason, setReason] = useState("");
  const [done, setDone] = useState<Record<string, "ok" | "bad">>({});
  const item = queue[selected];

  return (
    <AppShell title="Duyệt đóng góp" breadcrumb="Kiểm toán" active="/app/duyet-dong-gop">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Queue chờ xác thực. FSOLVER chỉ đối soát — <b>không form giữ tiền</b>.
          </p>
          <Badge type="warning">{queue.filter((q) => !done[q.id]).length} chờ xử lý</Badge>
        </div>

        <div className="grid grid-cols-[320px_1fr] gap-5">
          <div className="overflow-hidden rounded-xl border bg-white">
            <div className="border-b bg-[#F8FAFC] px-4 py-3 text-xs font-semibold text-slate-500">
              Chờ xác thực
            </div>
            <ul>
              {queue.map((q, i) => (
                <li key={q.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(i);
                      setReason("");
                    }}
                    className={`w-full border-b px-4 py-3 text-left text-sm transition ${
                      selected === i ? "bg-[#FFF4ED]" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-slate-500">{q.id}</span>
                      {done[q.id] && (
                        <Badge type={done[q.id] === "ok" ? "success" : "danger"}>
                          {done[q.id] === "ok" ? "OK" : "Reject"}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 font-semibold">{q.name}</p>
                    <p className="text-xs text-slate-500">
                      {q.fund} · {q.amount}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="f-card p-6">
              <h3 className="font-bold">Thông tin đóng góp</h3>
              <div className="mt-4 space-y-3 text-sm">
                {[
                  ["Mã", item.id],
                  ["Người gửi", item.name],
                  ["Quỹ", item.fund],
                  ["Số tiền", item.amount],
                  ["Thời gian", item.date],
                  ["Mục đích", item.note],
                  ["Ẩn danh", item.anon ? "Có" : "Không"],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                    <span className="text-slate-500">{l}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <p className="mb-2 text-sm font-semibold">Ảnh chứng từ chuyển khoản</p>
                <div className="flex h-44 items-center justify-center rounded-xl border border-dashed bg-slate-50 text-sm text-slate-500">
                  <div className="text-center">
                    <FileText className="mx-auto mb-2 text-slate-400" size={28} />
                    UNC_CK_{item.id.slice(-4)}.jpg
                    <p className="mt-1 text-xs">
                      <Eye className="inline" size={12} /> Xem full · zoom
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="f-card flex flex-col p-6">
              <h3 className="font-bold">Hành động đối soát</h3>
              <p className="mt-2 text-sm text-slate-500">
                So khớp số tiền, nội dung CK và STK thụ hưởng. Không ghi nhận tiền vào ví FSOLVER.
              </p>
              <label className="mt-5 block">
                <span className="f-label">Lý do (bắt buộc nếu Không hợp lệ)</span>
                <textarea
                  className="f-input h-28 py-3"
                  placeholder="Ví dụ: Ảnh mờ / sai STK / số tiền không khớp…"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </label>
              <div className="mt-auto flex flex-col gap-2 pt-6">
                <button
                  type="button"
                  className="f-btn-primary w-full"
                  disabled={!!done[item.id]}
                  onClick={() => setDone((d) => ({ ...d, [item.id]: "ok" }))}
                >
                  <Check size={16} /> Đã xác thực
                </button>
                <button
                  type="button"
                  className="f-btn w-full border border-[#FECACA] bg-[#FEF2F2] text-[#991B1B] hover:bg-[#FEE2E2] disabled:opacity-40"
                  disabled={!!done[item.id] || !reason.trim()}
                  onClick={() => setDone((d) => ({ ...d, [item.id]: "bad" }))}
                >
                  <X size={16} /> Không hợp lệ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ─── S50 Trung tâm thông báo ────────────────────────────── */

export function NotificationsPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      type: "Gán HS",
      title: "Bạn được gán vào hội đồng xét duyệt HS-2026-112",
      time: "18/07 · 10:40",
      read: false,
      href: "/app/proposal",
    },
    {
      id: 2,
      type: "Duyệt",
      title: "Proposal «Lớp học số vùng cao» đã được phê duyệt",
      time: "18/07 · 09:12",
      read: false,
      href: "/app/du-an",
    },
    {
      id: 3,
      type: "Deadline",
      title: "Nhắc: báo cáo mốc 2 đến hạn 25/07/2026",
      time: "17/07 · 16:00",
      read: false,
      href: "/app/tien-do",
    },
    {
      id: 4,
      type: "Audit",
      title: "Cờ Need Review trên chứng từ giải ngân GN-884",
      time: "17/07 · 11:20",
      read: true,
      href: "/app/duyet-dong-gop",
    },
    {
      id: 5,
      type: "Đóng góp",
      title: "Đóng góp SCF-DON-2026-01842 đã được xác thực",
      time: "16/07 · 14:05",
      read: true,
      href: "/app/dong-gop",
    },
  ]);

  const unread = items.filter((i) => !i.read).length;
  const typeColor = (t: string) =>
    ({
      "Gán HS": "info",
      Duyệt: "success",
      Deadline: "warning",
      Audit: "danger",
      "Đóng góp": "neutral",
    }[t] as "info" | "success" | "warning" | "danger" | "neutral") || "neutral";

  return (
    <AppShell title="Trung tâm thông báo" breadcrumb="Thông báo" active="/app/thong-bao">
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="text-sm text-slate-600">In-app · deep link theo loại sự kiện</p>
            {unread > 0 && <Badge type="warning">{unread} chưa đọc</Badge>}
          </div>
          <div className="flex gap-2">
            <Link to="/app/broadcast" className="f-btn-secondary h-10 px-3 text-xs">
              Admin Broadcast
            </Link>
            <button
              type="button"
              className="f-btn-primary h-10 px-3 text-xs"
              onClick={() => setItems((list) => list.map((x) => ({ ...x, read: true })))}
            >
              Đánh dấu đã đọc hết
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border bg-white">
          {items.map((n) => (
            <Link
              key={n.id}
              to={n.href}
              onClick={() => setItems((list) => list.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
              className={`flex items-start gap-4 border-b px-5 py-4 transition last:border-0 hover:bg-slate-50 ${
                !n.read ? "bg-[#FFF4ED]/40" : ""
              }`}
            >
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FFF4ED] text-[#F37021]">
                <Bell size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Badge type={typeColor(n.type)}>{n.type}</Badge>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-[#F37021]" />}
                </div>
                <p className={`mt-1 text-sm ${!n.read ? "font-semibold" : "text-slate-700"}`}>{n.title}</p>
                <p className="mt-1 text-xs text-slate-500">{n.time}</p>
              </div>
              <ChevronRight className="mt-2 shrink-0 text-slate-400" size={16} />
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400">
          Cài đặt kênh email / in-app tại{" "}
          <Link to="/app/cai-dat-thong-bao" className="font-semibold text-[#0072BC]">
            Cài đặt thông báo
          </Link>
        </p>
      </div>
    </AppShell>
  );
}

/* ─── S51 Admin Broadcast ────────────────────────────────── */

export function AdminBroadcastPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("Tất cả user");
  const [force, setForce] = useState(false);
  const [sent, setSent] = useState(false);

  const counts: Record<string, number> = {
    "Tất cả user": 2847,
    "Sinh viên": 2104,
    "Nhà tài trợ": 412,
    "Hội đồng": 48,
    Audit: 12,
    Admin: 6,
  };
  const previewCount = counts[audience] ?? 0;
  const canSend = title.trim().length >= 5 && body.trim().length >= 10;

  return (
    <AppShell title="Admin Broadcast" breadcrumb="Thông báo" active="/app/broadcast">
      <div className="mx-auto grid max-w-5xl grid-cols-[1.2fr_0.8fr] gap-6">
        {sent ? (
          <div className="f-card col-span-2 p-10 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
              <Check size={28} />
            </div>
            <h2 className="mt-4 text-xl font-bold">Đã xếp hàng gửi broadcast</h2>
            <p className="mt-2 text-sm text-slate-600">
              Dự kiến tới <b>{previewCount.toLocaleString("vi-VN")}</b> người nhận · {audience}
              {force ? " · force notification bật" : ""}.
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <button className="f-btn-secondary" onClick={() => setSent(false)}>
                Soạn tin mới
              </button>
              <Link to="/app/thong-bao" className="f-btn-primary">
                Về trung tâm TB
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="f-card space-y-4 p-6">
              <h3 className="font-bold">Soạn thông báo</h3>
              <label className="block">
                <span className="f-label">Tiêu đề *</span>
                <input
                  className="f-input"
                  placeholder="Tối thiểu 5 ký tự"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {title.length > 0 && title.trim().length < 5 && (
                  <p className="mt-1 text-xs text-[#DC2626]">Tiêu đề quá ngắn</p>
                )}
              </label>
              <label className="block">
                <span className="f-label">Nội dung *</span>
                <textarea
                  className="f-input h-40 py-3"
                  placeholder="Rich text đơn giản · tối thiểu 10 ký tự"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <div className="mt-2 flex gap-1">
                  {["B", "I", "Link"].map((t) => (
                    <span key={t} className="rounded border px-2 py-0.5 text-xs font-semibold text-slate-500">
                      {t}
                    </span>
                  ))}
                </div>
              </label>
              <label className="block">
                <span className="f-label">Đối tượng</span>
                <select className="f-input" value={audience} onChange={(e) => setAudience(e.target.value)}>
                  {Object.keys(counts).map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked={force} onChange={(e) => setForce(e.target.checked)} />
                Force notification (bỏ qua tắt in-app của user)
              </label>
              <button
                type="button"
                className="f-btn-primary w-full disabled:opacity-40"
                disabled={!canSend}
                onClick={() => setSent(true)}
              >
                <Send size={16} /> Gửi broadcast
              </button>
            </div>
            <div className="space-y-4">
              <div className="f-card p-6">
                <h3 className="font-bold">Preview</h3>
                <div className="mt-4 rounded-xl border bg-[#F8FAFC] p-4">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-[#F37021]" />
                    <span className="text-xs font-bold uppercase text-[#F37021]">Broadcast</span>
                  </div>
                  <p className="mt-2 font-semibold">{title || "Tiêu đề hiển thị tại đây"}</p>
                  <p className="mt-1 text-sm text-slate-600">{body || "Nội dung…"}</p>
                </div>
                <p className="mt-4 text-sm">
                  Ước tính người nhận:{" "}
                  <b className="text-[#F37021]">{previewCount.toLocaleString("vi-VN")}</b>
                </p>
              </div>
              <div className="f-card p-5 text-sm text-slate-600">
                <p className="font-semibold text-[#0F172A]">Lưu ý</p>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  <li>Validate title/body trước khi enqueue</li>
                  <li>Force chỉ dùng cho sự cố / bảo trì</li>
                  <li>Log broadcast vào nhật ký admin</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

/* ─── S52 Cài đặt TB & CSAT ──────────────────────────────── */

export function NotificationSettingsPage() {
  const [email, setEmail] = useState({
    donate: true,
    approve: true,
    deadline: true,
    audit: false,
    marketing: false,
  });
  const [inApp, setInApp] = useState({
    donate: true,
    approve: true,
    deadline: true,
    audit: true,
    broadcast: true,
  });
  const [csatOpen, setCsatOpen] = useState(false);
  const [stars, setStars] = useState(0);
  const [csatDone, setCsatDone] = useState(false);

  const ToggleRow = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        onClick={onChange}
        className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-[#F37021]" : "bg-slate-200"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );

  return (
    <AppShell title="Cài đặt thông báo & CSAT" breadcrumb="Cài đặt" active="/app/cai-dat-thong-bao">
      <div className="mx-auto max-w-3xl space-y-5">
        <AdminSettingsTabs active="/app/cai-dat-thong-bao" />
        <div className="grid grid-cols-2 gap-5">
          <div className="f-card p-6">
            <div className="mb-2 flex items-center gap-2">
              <Mail size={18} className="text-[#0072BC]" />
              <h3 className="font-bold">Email</h3>
            </div>
            <ToggleRow
              label="Xác thực đóng góp"
              checked={email.donate}
              onChange={() => setEmail((e) => ({ ...e, donate: !e.donate }))}
            />
            <ToggleRow
              label="Kết quả duyệt proposal"
              checked={email.approve}
              onChange={() => setEmail((e) => ({ ...e, approve: !e.approve }))}
            />
            <ToggleRow
              label="Nhắc deadline mốc"
              checked={email.deadline}
              onChange={() => setEmail((e) => ({ ...e, deadline: !e.deadline }))}
            />
            <ToggleRow
              label="Cảnh báo audit"
              checked={email.audit}
              onChange={() => setEmail((e) => ({ ...e, audit: !e.audit }))}
            />
            <ToggleRow
              label="Tin tức / campaign"
              checked={email.marketing}
              onChange={() => setEmail((e) => ({ ...e, marketing: !e.marketing }))}
            />
          </div>
          <div className="f-card p-6">
            <div className="mb-2 flex items-center gap-2">
              <Bell size={18} className="text-[#F37021]" />
              <h3 className="font-bold">In-app</h3>
            </div>
            <ToggleRow
              label="Đóng góp"
              checked={inApp.donate}
              onChange={() => setInApp((e) => ({ ...e, donate: !e.donate }))}
            />
            <ToggleRow
              label="Duyệt / gán HS"
              checked={inApp.approve}
              onChange={() => setInApp((e) => ({ ...e, approve: !e.approve }))}
            />
            <ToggleRow
              label="Deadline"
              checked={inApp.deadline}
              onChange={() => setInApp((e) => ({ ...e, deadline: !e.deadline }))}
            />
            <ToggleRow
              label="Audit"
              checked={inApp.audit}
              onChange={() => setInApp((e) => ({ ...e, audit: !e.audit }))}
            />
            <ToggleRow
              label="Broadcast admin"
              checked={inApp.broadcast}
              onChange={() => setInApp((e) => ({ ...e, broadcast: !e.broadcast }))}
            />
          </div>
        </div>

        <div className="f-card flex items-center justify-between p-6">
          <div>
            <h3 className="font-bold">Đánh giá trải nghiệm (CSAT)</h3>
            <p className="mt-1 text-sm text-slate-500">Tùy chọn 1–5 sao · không ép buộc (KPI CSAT).</p>
          </div>
          {csatDone ? (
            <Badge type="success">Đã gửi cảm ơn</Badge>
          ) : (
            <button className="f-btn-primary h-10 px-4 text-xs" onClick={() => setCsatOpen(true)}>
              Mở khảo sát CSAT
            </button>
          )}
        </div>

        {csatOpen && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div className="f-card w-full max-w-md p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold">Bạn hài lòng với FSOLVER?</h3>
                <button onClick={() => setCsatOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <p className="mt-2 text-sm text-slate-500">Chọn 1–5 sao. Có thể bỏ qua bất kỳ lúc nào.</p>
              <div className="mt-5 flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setStars(n)} className="p-1">
                    <Star
                      size={28}
                      className={n <= stars ? "fill-[#F37021] text-[#F37021]" : "text-slate-300"}
                    />
                  </button>
                ))}
              </div>
              <textarea className="f-input mt-5 h-20 py-3" placeholder="Góp ý thêm (tuỳ chọn)" />
              <div className="mt-6 flex justify-end gap-2">
                <button className="f-btn-secondary" onClick={() => setCsatOpen(false)}>
                  Bỏ qua
                </button>
                <button
                  className="f-btn-primary disabled:opacity-40"
                  disabled={stars === 0}
                  onClick={() => {
                    setCsatOpen(false);
                    setCsatDone(true);
                  }}
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

/* ─── S53 Email templates ────────────────────────────────── */

const EMAIL_TEMPLATES = [
  {
    id: "otp",
    name: "OTP đăng nhập / đăng ký",
    fr: "FR-09-02",
    subject: "[FSOLVER] Mã OTP của bạn",
  },
  {
    id: "thanks",
    name: "Tri ân đóng góp",
    fr: "FR-03-06",
    subject: "[FSOLVER] Cảm ơn bạn đã đóng góp",
  },
  {
    id: "result",
    name: "Kết quả duyệt proposal",
    fr: "FR-05-06",
    subject: "[FSOLVER] Kết quả xét duyệt hồ sơ",
  },
  {
    id: "milestone",
    name: "Nhắc mốc giải ngân / báo cáo",
    fr: "FR-07-03",
    subject: "[FSOLVER] Nhắc deadline báo cáo mốc",
  },
  {
    id: "review",
    name: "Need Review (audit)",
    fr: "FR-08",
    subject: "[FSOLVER] Cần giải trình chứng từ",
  },
] as const;

export function EmailTemplatesPage() {
  const [active, setActive] = useState<(typeof EMAIL_TEMPLATES)[number]["id"]>("otp");
  const tpl = EMAIL_TEMPLATES.find((t) => t.id === active)!;

  const bodyPreview: Record<string, React.ReactNode> = {
    otp: (
      <>
        <p>Xin chào,</p>
        <p className="mt-3">
          Mã OTP của bạn là <b className="text-2xl tracking-widest text-[#F37021]">482917</b>
        </p>
        <p className="mt-3 text-sm text-slate-500">Hết hạn sau 5 phút. Không chia sẻ mã này.</p>
      </>
    ),
    thanks: (
      <>
        <p>Cảm ơn bạn đã đóng góp cho <b>Quỹ Học tập</b>.</p>
        <p className="mt-3">
          Mã biên nhận: <span className="font-mono">SCF-DON-2026-01842</span>
        </p>
        <p className="mt-3 text-sm text-slate-500">FSOLVER không giữ tiền — khoản CK đã về TK Đoàn / Hội / CTSV.</p>
      </>
    ),
    result: (
      <>
        <p>
          Hồ sơ <b>HS-2026-112</b> đã được <span className="font-bold text-[#16A34A]">phê duyệt</span>.
        </p>
        <p className="mt-3">Điểm trung bình: 87/100. Vui lòng theo dõi mốc giải ngân.</p>
      </>
    ),
    milestone: (
      <>
        <p>
          Báo cáo mốc 2 của dự án <b>Lớp học số vùng cao</b> đến hạn <b>25/07/2026</b>.
        </p>
        <p className="mt-3 text-sm">Nộp chậm có thể ảnh hưởng đợt giải ngân tiếp theo.</p>
      </>
    ),
    review: (
      <>
        <p className="font-semibold text-[#92400E]">Need Review</p>
        <p className="mt-3">
          Chứng từ GN-884 cần giải trình (lệch giá / thiếu VAT). Hạn phản hồi: 72 giờ.
        </p>
      </>
    ),
  };

  return (
    <AppShell title="Email templates" breadcrumb="Cài đặt" active="/app/email-templates">
      <div className="space-y-5">
        <AdminSettingsTabs active="/app/email-templates" />
        <div className="grid grid-cols-[280px_1fr] gap-5">
          <div className="overflow-hidden rounded-xl border bg-white">
            <div className="border-b bg-[#F8FAFC] px-4 py-3 text-xs font-semibold text-slate-500">Catalog</div>
            <ul>
              {EMAIL_TEMPLATES.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => setActive(t.id)}
                    className={`w-full border-b px-4 py-3 text-left text-sm last:border-0 ${
                      active === t.id ? "bg-[#FFF4ED]" : "hover:bg-slate-50"
                    }`}
                  >
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-[11px] text-slate-500">{t.fr}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="f-card overflow-hidden p-0">
            <div className="border-b bg-[#F8FAFC] px-6 py-4">
              <p className="text-xs text-slate-500">Subject</p>
              <p className="font-semibold">{tpl.subject}</p>
            </div>
            <div className="bg-slate-100 p-6">
              <div className="mx-auto max-w-md overflow-hidden rounded-xl border bg-white shadow-sm">
                <div className="flex items-center gap-2 border-b bg-[#FFF4ED] px-5 py-4">
                  <BrandMark size="sm" />
                  <span className="text-sm font-bold text-[#a04100]">FSOLVER · Đại học FPT</span>
                </div>
                <div className="px-5 py-6 text-sm leading-6 text-slate-700">{bodyPreview[active]}</div>
                <div className="border-t bg-slate-50 px-5 py-3 text-[11px] text-slate-500">
                  © 2026 FSOLVER — Không giữ tiền thật · TK Đoàn / Hội / CTSV
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t px-6 py-4">
              <button className="f-btn-secondary h-10 px-3 text-xs">Gửi thử</button>
              <button className="f-btn-primary h-10 px-3 text-xs">Chỉnh template</button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ─── S59 Bảo trì + system states ────────────────────────── */

export function SystemStatesPage() {
  const [view, setView] = useState<"maint" | "empty" | "skeleton" | "403" | "500" | "toast">("maint");
  const [showToast, setShowToast] = useState(true);

  const tabs: [typeof view, string][] = [
    ["maint", "Bảo trì"],
    ["empty", "Empty list"],
    ["skeleton", "Skeleton"],
    ["403", "403"],
    ["500", "500"],
    ["toast", "Toast success"],
  ];

  return (
    <PublicShell>
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-[#F37021]">S59 · System states</p>
        <h1 className="text-2xl font-bold">Bảo trì & Empty / Loading / Error / Success</h1>
        <p className="mt-2 text-sm text-slate-600">Bộ state cùng brand FSOLVER — nav/footer public đồng bộ.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setView(k);
                if (k === "toast") setShowToast(true);
              }}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                view === k ? "bg-[#FFF4ED] text-[#F37021]" : "border bg-white text-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative mt-8 min-h-[420px]">
          {view === "maint" && (
            <div className="f-card mx-auto max-w-xl px-10 py-14 text-center">
              <BrandMark />
              <h2 className="mt-6 text-2xl font-bold">Hệ thống đang bảo trì</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                FSOLVER tạm ngưng ghi nhận giao dịch để nâng cấp log bất biến. Vui lòng quay lại sau.
              </p>
              <p className="mt-5 rounded-lg bg-[#FFF4ED] px-4 py-3 text-sm font-semibold text-[#a04100]">
                Dự kiến: 18/07/2026 · 22:00 – 23:30 (GMT+7)
              </p>
              <Link to="/" className="f-btn-secondary mt-6 inline-flex">
                Về trang chủ
              </Link>
            </div>
          )}

          {view === "empty" && (
            <div className="f-card mx-auto max-w-lg px-10 py-14 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
                <FileText size={26} />
              </div>
              <h2 className="mt-5 text-xl font-bold">Chưa có dữ liệu</h2>
              <p className="mt-2 text-sm text-slate-500">Danh sách trống. Thử đổi bộ lọc hoặc tạo mục mới.</p>
              <button className="f-btn-primary mt-6">
                <Plus size={15} /> Tạo mới
              </button>
            </div>
          )}

          {view === "skeleton" && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="f-card animate-pulse p-5">
                    <div className="mb-3 h-2 w-10 rounded bg-slate-200" />
                    <div className="h-3 w-20 rounded bg-slate-200" />
                    <div className="mt-3 h-7 w-28 rounded bg-slate-200" />
                  </div>
                ))}
              </div>
              <div className="f-card animate-pulse p-6">
                <div className="mb-4 h-4 w-40 rounded bg-slate-200" />
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="mb-3 h-10 rounded-lg bg-slate-100" />
                ))}
              </div>
            </div>
          )}

          {view === "403" && (
            <div className="f-card mx-auto max-w-lg px-10 py-14 text-center">
              <p className="text-5xl font-extrabold text-[#F37021]">403</p>
              <h2 className="mt-4 text-xl font-bold">Không có quyền truy cập</h2>
              <p className="mt-2 text-sm text-slate-500">
                Vai trò hiện tại không được phép mở màn này. Liên hệ Admin nếu cần nâng quyền.
              </p>
              <div className="mt-6 flex justify-center gap-2">
                <Link to="/app" className="f-btn-primary">
                  Bảng điều khiển
                </Link>
                <Link to="/" className="f-btn-secondary">
                  Trang chủ
                </Link>
              </div>
            </div>
          )}

          {view === "500" && (
            <div className="f-card mx-auto max-w-lg px-10 py-14 text-center">
              <p className="text-5xl font-extrabold text-[#DC2626]">500</p>
              <h2 className="mt-4 text-xl font-bold">Lỗi máy chủ</h2>
              <p className="mt-2 text-sm text-slate-500">
                Đã ghi nhận sự cố. Thử tải lại hoặc quay lại sau vài phút.
              </p>
              <button className="f-btn-primary mt-6" onClick={() => window.location.reload()}>
                <RefreshCw size={15} /> Tải lại
              </button>
            </div>
          )}

          {view === "toast" && (
            <div className="f-card mx-auto max-w-lg px-10 py-14 text-center">
              <h2 className="text-xl font-bold">Demo toast success</h2>
              <p className="mt-2 text-sm text-slate-500">Thông báo góc màn hình — style đồng bộ app.</p>
              <button className="f-btn-primary mt-6" onClick={() => setShowToast(true)}>
                Hiện toast
              </button>
            </div>
          )}

          {view === "toast" && showToast && (
            <div className="fixed bottom-8 right-8 z-50 flex items-start gap-3 rounded-xl border border-[#bbf7d0] bg-white px-4 py-3 shadow-lg">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                <Check size={16} />
              </span>
              <div>
                <p className="text-sm font-bold">Thành công</p>
                <p className="text-xs text-slate-500">Đã lưu thay đổi cấu hình.</p>
              </div>
              <button onClick={() => setShowToast(false)} className="text-slate-400">
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </PublicShell>
  );
}

/* ─── router ─────────────────────────────────────────────── */

export const FE03_PATHS = [
  "/app",
  "/app/cau-hinh-quy",
  "/app/stk-sso",
  "/app/dot-mo-don",
  "/app/dong-gop",
  "/app/duyet-dong-gop",
  "/app/kiem-toan",
  "/app/thong-bao",
  "/app/broadcast",
  "/app/cai-dat-thong-bao",
  "/app/email-templates",
  "/bao-tri",
] as const;

export default function FE03Router() {
  const { pathname } = useLocation();
  if (pathname === "/app") return <AdminHubPage />;
  if (pathname === "/app/cau-hinh-quy") return <AdminFundsConfigPage />;
  if (pathname === "/app/stk-sso") return <AdminStkSsoPage />;
  if (pathname === "/app/dot-mo-don") return <AdminRoundsPage />;
  if (pathname === "/app/dong-gop") return <MyDonationsPage />;
  if (pathname === "/app/duyet-dong-gop" || pathname === "/app/kiem-toan") return <AuditDonationsPage />;
  if (pathname === "/app/thong-bao") return <NotificationsPage />;
  if (pathname === "/app/broadcast") return <AdminBroadcastPage />;
  if (pathname === "/app/cai-dat-thong-bao") return <NotificationSettingsPage />;
  if (pathname === "/app/email-templates") return <EmailTemplatesPage />;
  if (pathname === "/bao-tri") return <SystemStatesPage />;
  return <AdminHubPage />;
}
