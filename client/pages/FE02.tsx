import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AlertTriangle,
  Bell,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Laptop,
  LayoutDashboard,
  Lock,
  Mail,
  Monitor,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Smartphone,
  Trash2,
  Upload,
  User,
  Users,
  X,
} from "lucide-react";

/* ─── shared chrome ───────────────────────────────────────── */

function BrandMark({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-9 w-9 text-lg" : "h-11 w-11 text-xl";
  return (
    <span className={`grid ${box} place-items-center rounded-xl bg-[#FFF4ED] font-extrabold text-[#F37021]`}>
      F
    </span>
  );
}

function AuthShell({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="grid min-h-screen grid-cols-2 bg-white text-[#0F172A]">
      <aside className="relative flex flex-col justify-between overflow-hidden bg-[#FFF4ED] px-14 py-12">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full border-[40px] border-[#F37021]/15" />
        <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full border-[32px] border-[#0072BC]/10" />
        <div className="relative">
          <Link to="/" className="flex items-center gap-3">
            <BrandMark />
            <span className="text-lg font-bold text-[#a04100]">
              FSOLVER <span className="font-medium text-slate-600">Đại học FPT</span>
            </span>
          </Link>
          <h1 className="mt-16 max-w-md text-4xl font-extrabold leading-tight tracking-tight">
            Minh bạch nguồn quỹ
            <br />
            <span className="text-[#F37021]">Lan tỏa niềm tin sinh viên</span>
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">
            Nền tảng quản trị quỹ cộng đồng sinh viên. FSOLVER không giữ tiền thật — tài khoản nhận thuộc Đoàn / Hội / CTSV.
          </p>
        </div>
        <ul className="relative space-y-4 text-sm text-slate-700">
          {[
            "Email .edu.vn và SSO của Trường",
            "OTP bảo mật · khóa sau 5 lần sai",
            "Minh bạch giao dịch & log bất biến",
          ].map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#F37021] text-white">
                <Check size={12} />
              </span>
              {t}
            </li>
          ))}
        </ul>
        {title && <span className="sr-only">{title}</span>}
      </aside>
      <main className="flex items-center justify-center bg-[#F8FAFC] px-10 py-12">
        <div className="w-full max-w-[440px]">{children}</div>
      </main>
    </div>
  );
}

const APP_MENU: [string, string, React.ReactNode][] = [
  ["Bảng điều khiển", "/app", <LayoutDashboard size={18} />],
  ["Đóng góp", "/app/dong-gop", <Users size={18} />],
  ["Hồ sơ xin giải ngân", "/app/proposal", <Shield size={18} />],
  ["Dự án của tôi", "/app/du-an", <Monitor size={18} />],
  ["Báo cáo tiến độ", "/app/tien-do", <Check size={18} />],
  ["Kiểm toán", "/app/kiem-toan", <Lock size={18} />],
  ["Giao dịch", "/giao-dich", <Search size={18} />],
  ["Người dùng", "/app/nguoi-dung", <Users size={18} />],
  ["Báo cáo", "/app/bao-cao", <Mail size={18} />],
  ["Thông báo", "/app/thong-bao", <Bell size={18} />],
  ["Cài đặt", "/app/ho-so", <User size={18} />],
];

function AppShell({
  children,
  title,
  breadcrumb = "Cài đặt",
  active = "/app/ho-so",
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
            const isActive =
              active === href ||
              (href === "/app/ho-so" &&
                (active.startsWith("/app/ho-so") ||
                  active.startsWith("/app/phien") ||
                  active.startsWith("/app/xoa-tai-khoan")));
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
            <button className="relative rounded-lg border p-2 text-slate-600">
              <Bell size={18} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#F37021]" />
            </button>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#FFF4ED] text-sm font-bold text-[#F37021]">
                NA
              </span>
              <div className="text-sm">
                <p className="font-semibold">Nguyễn Minh Anh</p>
                <p className="text-xs text-slate-500">Sinh viên</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

function PublicShellLite({ children }: { children: React.ReactNode }) {
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
                className={`flex h-full items-center border-b-2 text-[13px] font-medium ${
                  href === "/"
                    ? "border-[#F37021] text-[#F37021]"
                    : "border-transparent text-slate-600"
                }`}
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
            <b className="mr-2 text-sm text-[#a04100]">FSOLVER</b>© 2026 Hệ thống Quản trị Quỹ Sinh viên FSOLVER - Đại
            học FPT
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

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs font-medium text-[#DC2626]">{msg}</p>;
}

/* ─── S08 Login ───────────────────────────────────────────── */

export function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [locked, setLocked] = useState(false);
  const [ssoError, setSsoError] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; pw?: string }>({});
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [fails, setFails] = useState(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;
    const next: typeof errors = {};
    if (!email.includes("@") && !/^SE\d+/i.test(email)) next.email = "Nhập email .edu.vn hoặc mã SV";
    if (email && email.includes("@") && !email.endsWith(".edu.vn"))
      next.email = "Chỉ chấp nhận email .edu.vn";
    if (pw.length < 6) next.pw = "Mật khẩu tối thiểu 6 ký tự";
    setErrors(next);
    if (Object.keys(next).length) {
      const f = fails + 1;
      setFails(f);
      if (f >= 5) setLocked(true);
      return;
    }
    window.location.href = "/hoan-thien-ho-so";
  };

  return (
    <AuthShell title="Đăng nhập">
      <div className="f-card p-8">
        <h2 className="text-2xl font-bold">Đăng nhập</h2>
        <p className="mt-1 text-sm text-slate-500">Truy cập portal quỹ sinh viên FSOLVER</p>

        {locked && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-[#FECACA] bg-[#FEE2E2] p-3 text-sm text-[#991B1B]">
            <Lock size={16} className="mt-0.5 shrink-0" />
            Tài khoản tạm khóa 15 phút do sai mật khẩu 5 lần. Thử lại sau hoặc dùng SSO.
          </div>
        )}
        {ssoError && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-[#FDE68A] bg-[#FEF3C7] p-3 text-sm text-[#92400E]">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            SSO Trường tạm thời lỗi. Vui lòng đăng nhập bằng email/mật khẩu (fallback).
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block">
            <span className="f-label">Email / Mã sinh viên</span>
            <input
              className="f-input"
              placeholder="ten@fpt.edu.vn hoặc SE123456"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={locked}
            />
            <FieldError msg={errors.email} />
          </label>
          <label className="block">
            <span className="f-label">Mật khẩu</span>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                className="f-input pr-11"
                placeholder="••••••••"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                disabled={locked}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-slate-400"
                onClick={() => setShowPw((v) => !v)}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <FieldError msg={errors.pw} />
          </label>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="rounded border-slate-300" /> Ghi nhớ đăng nhập
            </label>
            <Link to="/quen-mat-khau" className="font-semibold text-[#F37021]">
              Quên mật khẩu?
            </Link>
          </div>
          <button type="submit" className="f-btn-primary w-full" disabled={locked}>
            Đăng nhập
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
          <div className="h-px flex-1 bg-slate-200" />
          hoặc
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <button
          type="button"
          className="f-btn-secondary w-full"
          onClick={() => setSsoError(true)}
        >
          <Shield size={16} /> Đăng nhập SSO của Trường
        </button>
        <p className="mt-6 text-center text-sm text-slate-600">
          Chưa có tài khoản?{" "}
          <Link to="/dang-ky" className="font-semibold text-[#F37021]">
            Đăng ký
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

/* ─── S08a Forgot password ────────────────────────────────── */

export function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [err, setErr] = useState("");

  const goOtp = () => {
    if (!email.endsWith(".edu.vn")) {
      setErr("Email phải thuộc miền .edu.vn");
      return;
    }
    setErr("");
    setStep(2);
  };

  return (
    <AuthShell title="Quên mật khẩu">
      <div className="f-card p-8">
        <div className="mb-6 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full ${step >= s && step < 4 ? "bg-[#F37021]" : step === 4 ? "bg-[#16A34A]" : "bg-slate-200"}`}
            />
          ))}
        </div>

        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold">Quên mật khẩu</h2>
            <p className="mt-1 text-sm text-slate-500">Nhập email .edu.vn để nhận mã OTP</p>
            <label className="mt-6 block">
              <span className="f-label">Email .edu.vn</span>
              <input
                className="f-input"
                placeholder="ten@fpt.edu.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FieldError msg={err} />
            </label>
            <div className="mt-4 flex items-center gap-3 rounded-lg border bg-slate-50 p-3">
              <div className="grid h-12 flex-1 place-items-center rounded bg-white font-mono text-lg tracking-widest text-slate-700">
                X7K2
              </div>
              <button type="button" className="f-btn-secondary h-11 px-3">
                <RefreshCw size={16} /> Tải lại
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">CAPTCHA — nhập mã hiển thị (demo)</p>
            <button type="button" className="f-btn-primary mt-6 w-full" onClick={goOtp}>
              Gửi OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold">Nhập mã OTP</h2>
            <p className="mt-1 text-sm text-slate-500">
              Đã gửi 6 số tới <b>{email}</b> · hết hạn 5 phút
            </p>
            <div className="mt-6 flex justify-between gap-2">
              {otp.map((d, i) => (
                <input
                  key={i}
                  className="f-input h-12 w-12 text-center text-lg font-bold"
                  maxLength={1}
                  value={d}
                  onChange={(e) => {
                    const next = [...otp];
                    next[i] = e.target.value.replace(/\D/g, "").slice(-1);
                    setOtp(next);
                  }}
                />
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-slate-500">
              Gửi lại sau <b className="text-[#F37021]">60s</b>
            </p>
            <button type="button" className="f-btn-primary mt-6 w-full" onClick={() => setStep(3)}>
              Xác nhận OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold">Đặt mật khẩu mới</h2>
            <p className="mt-1 text-sm text-slate-500">Tối thiểu 8 ký tự, có chữ và số</p>
            <label className="mt-6 block">
              <span className="f-label">Mật khẩu mới</span>
              <input type="password" className="f-input" placeholder="••••••••" />
            </label>
            <label className="mt-4 block">
              <span className="f-label">Xác nhận mật khẩu</span>
              <input type="password" className="f-input" placeholder="••••••••" />
            </label>
            <button type="button" className="f-btn-primary mt-6 w-full" onClick={() => setStep(4)}>
              Cập nhật mật khẩu
            </button>
          </>
        )}

        {step === 4 && (
          <div className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
              <Check size={28} />
            </div>
            <h2 className="mt-4 text-2xl font-bold">Đổi mật khẩu thành công</h2>
            <p className="mt-2 text-sm text-slate-500">Bạn có thể đăng nhập bằng mật khẩu mới.</p>
            <Link to="/dang-nhap" className="f-btn-primary mt-6 inline-flex w-full">
              Về đăng nhập
            </Link>
          </div>
        )}

        {step < 4 && (
          <p className="mt-6 text-center text-sm">
            <Link to="/dang-nhap" className="font-semibold text-[#F37021]">
              ← Quay lại đăng nhập
            </Link>
          </p>
        )}
      </div>
    </AuthShell>
  );
}

/* ─── S09 Register ────────────────────────────────────────── */

export function RegisterPage() {
  const [role, setRole] = useState<"sv" | "donor">("sv");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.endsWith(".edu.vn")) {
      setErr("Email phải kết thúc bằng .edu.vn");
      return;
    }
    if (email === "trung@fpt.edu.vn") {
      setErr("Email đã được đăng ký");
      return;
    }
    setErr("");
    window.location.href = "/xac-thuc-otp";
  };

  return (
    <AuthShell title="Đăng ký">
      <div className="f-card p-8">
        <h2 className="text-2xl font-bold">Đăng ký tài khoản</h2>
        <p className="mt-1 text-sm text-slate-500">Chỉ email miền .edu.vn</p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block">
            <span className="f-label">Họ và tên</span>
            <input className="f-input" placeholder="Nguyễn Văn A" required />
          </label>
          <label className="block">
            <span className="f-label">Email .edu.vn</span>
            <input
              className="f-input"
              placeholder="ten@fpt.edu.vn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FieldError msg={err} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="f-label">Mật khẩu</span>
              <input type="password" className="f-input" placeholder="••••••••" required />
            </label>
            <label className="block">
              <span className="f-label">Xác nhận MK</span>
              <input type="password" className="f-input" placeholder="••••••••" required />
            </label>
          </div>

          <div>
            <span className="f-label">Vai trò</span>
            <div className="mt-1 grid grid-cols-2 gap-3">
              {(
                [
                  ["sv", "Sinh viên", "Xin giải ngân, báo cáo mốc"],
                  ["donor", "Người đóng góp", "Theo dõi tác động đóng góp"],
                ] as const
              ).map(([id, title, desc]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRole(id)}
                  className={`rounded-xl border p-3 text-left transition ${
                    role === id
                      ? "border-[#F37021] bg-[#FFF4ED] ring-2 ring-orange-100"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <p className="text-sm font-bold">{title}</p>
                  <p className="mt-1 text-xs text-slate-500">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border bg-slate-50 p-3">
            <div className="grid h-12 flex-1 place-items-center rounded bg-white font-mono text-lg tracking-widest">
              A9P1
            </div>
            <button type="button" className="f-btn-secondary h-11 px-3">
              <RefreshCw size={16} /> Tải lại
            </button>
          </div>

          <label className="flex items-start gap-2 text-sm text-slate-600">
            <input type="checkbox" className="mt-1" required />
            <span>
              Tôi đồng ý <b>Điều khoản sử dụng</b> và <b>Chính sách bảo mật</b> của FSOLVER.
            </span>
          </label>

          <button type="submit" className="f-btn-primary w-full">
            Tiếp tục · Xác thực OTP
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Đã có tài khoản?{" "}
          <Link to="/dang-nhap" className="font-semibold text-[#F37021]">
            Đăng nhập
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

/* ─── S10 OTP ─────────────────────────────────────────────── */

export function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);

  const verify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp.join("") === "000000") {
        setError("Mã OTP không đúng. Vui lòng thử lại.");
        return;
      }
      if (expired) return;
      window.location.href = "/hoan-thien-ho-so";
    }, 600);
  };

  return (
    <AuthShell title="OTP">
      <div className="f-card p-8">
        <h2 className="text-2xl font-bold">Xác thực email OTP</h2>
        <p className="mt-1 text-sm text-slate-500">
          Nhập mã 6 số đã gửi tới email của bạn
        </p>

        {expired && (
          <div className="mt-4 rounded-lg border border-[#FECACA] bg-[#FEE2E2] p-3 text-sm text-[#991B1B]">
            Mã OTP đã hết hạn (5 phút). Vui lòng gửi lại mã mới.
          </div>
        )}

        <div className="mt-6 flex justify-between gap-2">
          {otp.map((d, i) => (
            <input
              key={i}
              className="f-input h-12 w-12 text-center text-lg font-bold"
              maxLength={1}
              value={d}
              onChange={(e) => {
                const next = [...otp];
                next[i] = e.target.value.replace(/\D/g, "").slice(-1);
                setOtp(next);
                setError("");
              }}
            />
          ))}
        </div>
        <FieldError msg={error} />

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>
            Hết hạn sau <b className="text-[#F37021]">04:32</b>
          </span>
          <button type="button" className="font-semibold text-[#0072BC]" onClick={() => setExpired(false)}>
            Gửi lại (60s)
          </button>
        </div>

        <button type="button" className="f-btn-primary mt-6 w-full" onClick={verify} disabled={loading}>
          {loading ? "Đang xác thực…" : "Xác thực"}
        </button>
        <button
          type="button"
          className="mt-3 w-full text-center text-xs text-slate-400 underline"
          onClick={() => setExpired(true)}
        >
          (demo) giả lập hết hạn
        </button>
        <p className="mt-6 text-center text-sm">
          <Link to="/dang-ky" className="font-semibold text-[#F37021]">
            Đổi email · Quay đăng ký
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

/* ─── S11 Onboarding profile (public) ─────────────────────── */

export function OnboardingPage() {
  const steps = ["Tài khoản", "Xác thực", "Hồ sơ", "Hoàn tất"];
  const [memberErr, setMemberErr] = useState("");
  const [member, setMember] = useState("");

  const addMember = () => {
    if (member && !member.includes("@")) {
      setMemberErr("Sinh viên chưa đăng ký FSOLVER");
      return;
    }
    setMemberErr("");
    setMember("");
  };

  return (
    <PublicShellLite>
      <div className="mx-auto max-w-[900px] px-6 py-12">
        <div className="mb-10 flex items-center justify-center gap-0">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`grid h-9 w-9 place-items-center rounded-full text-sm font-bold ${
                    i < 2
                      ? "bg-[#16A34A] text-white"
                      : i === 2
                        ? "bg-[#F37021] text-white"
                        : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {i < 2 ? <Check size={16} /> : i + 1}
                </div>
                <span className={`mt-2 text-xs font-semibold ${i === 2 ? "text-[#F37021]" : "text-slate-500"}`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`mx-2 mb-5 h-0.5 w-16 ${i < 2 ? "bg-[#16A34A]" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="f-card p-8">
          <h1 className="text-2xl font-bold">Hoàn thiện hồ sơ</h1>
          <p className="mt-1 text-sm text-slate-500">Bước cuối trước khi vào bảng điều khiển</p>

          <div className="mt-8 flex items-start gap-6">
            <div className="flex flex-col items-center">
              <div className="grid h-24 w-24 place-items-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400">
                <Upload size={28} />
              </div>
              <p className="mt-2 text-xs text-slate-500">Avatar ≤ 20MB</p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-4">
              <label className="block">
                <span className="f-label">Họ và tên *</span>
                <input className="f-input" defaultValue="Nguyễn Minh Anh" />
              </label>
              <label className="block">
                <span className="f-label">Mã SV *</span>
                <input className="f-input" placeholder="SE123456" />
              </label>
              <label className="block">
                <span className="f-label">Ngành *</span>
                <input className="f-input" placeholder="Software Engineering" />
              </label>
              <label className="block">
                <span className="f-label">Khóa *</span>
                <input className="f-input" placeholder="K18" />
              </label>
              <label className="block">
                <span className="f-label">Số điện thoại</span>
                <input className="f-input" placeholder="09xx xxx xxx" />
              </label>
              <label className="block">
                <span className="f-label">Email</span>
                <input className="f-input bg-slate-50" value="minhanh@fpt.edu.vn" readOnly />
              </label>
              <label className="col-span-2 block">
                <span className="f-label">Giới thiệu ngắn</span>
                <textarea
                  className="f-input h-24 py-3"
                  placeholder="Mô tả bản thân / định hướng dự án…"
                />
              </label>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
            <h3 className="font-bold">Hồ sơ nhóm (tuỳ chọn)</h3>
            <p className="mt-1 text-xs text-slate-500">Dùng khi nộp proposal theo team</p>
            <div className="mt-4 grid grid-cols-[1fr_1fr_auto] gap-3">
              <input className="f-input" placeholder="Tên nhóm" />
              <input
                className="f-input"
                placeholder="Email SV thành viên"
                value={member}
                onChange={(e) => setMember(e.target.value)}
              />
              <button type="button" className="f-btn-secondary h-11 px-4" onClick={addMember}>
                <Plus size={16} /> Thêm
              </button>
            </div>
            <FieldError msg={memberErr} />
            <p className="mt-3 text-xs text-slate-500">
              Link mời:{" "}
              <span className="font-mono text-[#0072BC]">https://fsolver.fpt.edu.vn/invite/TEAM-7A2K</span>
            </p>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Link to="/" className="f-btn-secondary">
              Để sau
            </Link>
            <Link to="/app/ho-so" className="f-btn-primary">
              Lưu & vào Dashboard
            </Link>
          </div>
        </div>
      </div>
    </PublicShellLite>
  );
}

/* ─── S12 Profile ─────────────────────────────────────────── */

export function ProfilePage() {
  return (
    <AppShell title="Hồ sơ cá nhân" breadcrumb="Cài đặt" active="/app/ho-so">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="f-card flex items-center gap-5 p-6">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#FFF4ED] text-xl font-extrabold text-[#F37021]">
            NA
          </span>
          <div>
            <h2 className="text-xl font-bold">Nguyễn Minh Anh</h2>
            <p className="text-sm text-slate-500">minhanh@fpt.edu.vn · SE184221</p>
            <span className="badge mt-2 bg-[#DBEAFE] text-[#1E40AF]">Sinh viên</span>
          </div>
          <div className="ml-auto flex gap-2">
            <Link to="/app/phien" className="f-btn-secondary h-10 px-3 text-xs">
              Phiên thiết bị
            </Link>
            <Link to="/app/xoa-tai-khoan" className="f-btn-secondary h-10 px-3 text-xs text-[#DC2626]">
              Xóa tài khoản
            </Link>
          </div>
        </div>

        <div className="f-card p-6">
          <h3 className="font-bold">Thông tin chỉnh sửa</h3>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <label className="block">
              <span className="f-label">Họ và tên</span>
              <input className="f-input" defaultValue="Nguyễn Minh Anh" />
            </label>
            <label className="block">
              <span className="f-label">Mã SV</span>
              <input className="f-input" defaultValue="SE184221" />
            </label>
            <label className="block">
              <span className="f-label">Ngành</span>
              <input className="f-input" defaultValue="Software Engineering" />
            </label>
            <label className="block">
              <span className="f-label">Khóa</span>
              <input className="f-input" defaultValue="K18" />
            </label>
            <label className="block">
              <span className="f-label">SĐT</span>
              <input className="f-input" defaultValue="0912 345 678" />
            </label>
            <label className="block">
              <span className="f-label">Email</span>
              <input className="f-input bg-slate-50" value="minhanh@fpt.edu.vn" readOnly />
            </label>
            <label className="col-span-2 block">
              <span className="f-label">Bio</span>
              <textarea className="f-input h-24 py-3" defaultValue="Quan tâm dự án giáo dục vùng cao." />
            </label>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="f-btn-primary">Lưu thay đổi</button>
          </div>
        </div>

        <div className="f-card p-6">
          <h3 className="font-bold">Nhóm đã tham gia</h3>
          <div className="mt-4 space-y-3">
            {[
              ["Team Vùng Cao K18", "3 thành viên", "Leader"],
              ["Startup Lab FPT", "5 thành viên", "Member"],
            ].map(([name, meta, role]) => (
              <div key={name} className="flex items-center justify-between rounded-xl border px-4 py-3">
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs text-slate-500">{meta}</p>
                </div>
                <span className="badge bg-slate-100 text-slate-600">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ─── S13 Sessions ────────────────────────────────────────── */

export function SessionsPage() {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: "Chrome · Windows 11",
      os: "Windows",
      ip: "113.161.xx.12",
      time: "Hôm nay · 09:41",
      current: true,
      icon: "laptop" as const,
    },
    {
      id: 2,
      device: "Safari · iPhone 15",
      os: "iOS 18",
      ip: "171.224.xx.88",
      time: "17/07/2026 · 21:05",
      current: false,
      icon: "phone" as const,
    },
    {
      id: 3,
      device: "Edge · Windows 10",
      os: "Windows",
      ip: "14.231.xx.44",
      time: "12/07/2026 · 14:20",
      current: false,
      icon: "monitor" as const,
    },
  ]);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const revoke = (id: number) => {
    setSessions((s) => s.filter((x) => x.id !== id));
    setConfirmId(null);
  };

  return (
    <AppShell title="Quản lý phiên thiết bị" breadcrumb="Cài đặt" active="/app/phien">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-sm text-slate-600">
          Thu hồi phiên nếu bạn không nhận ra thiết bị. Phiên hiện tại không thể revoke.
        </p>
        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-xs text-slate-500">
              <tr>
                {["Thiết bị", "Hệ điều hành", "IP", "Hoạt động", "Trạng thái", ""].map((h) => (
                  <th key={h} className="px-5 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600">
                        {s.icon === "phone" ? (
                          <Smartphone size={16} />
                        ) : s.icon === "monitor" ? (
                          <Monitor size={16} />
                        ) : (
                          <Laptop size={16} />
                        )}
                      </span>
                      <span className="font-semibold">{s.device}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{s.os}</td>
                  <td className="px-5 py-4 font-mono text-xs">{s.ip}</td>
                  <td className="px-5 py-4 text-slate-600">{s.time}</td>
                  <td className="px-5 py-4">
                    {s.current ? (
                      <span className="badge bg-[#DCFCE7] text-[#166534]">Máy hiện tại</span>
                    ) : (
                      <span className="badge bg-slate-100 text-slate-600">Đang hoạt động</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {!s.current && (
                      <button
                        className="text-sm font-semibold text-[#DC2626]"
                        onClick={() => setConfirmId(s.id)}
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {confirmId !== null && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div className="f-card w-full max-w-md p-6">
              <h3 className="text-lg font-bold">Thu hồi phiên?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Thiết bị sẽ bị đăng xuất ngay. Bạn có thể đăng nhập lại sau.
              </p>
              <div className="mt-6 flex justify-end gap-2">
                <button className="f-btn-secondary" onClick={() => setConfirmId(null)}>
                  Hủy
                </button>
                <button
                  className="f-btn bg-[#DC2626] text-white hover:bg-[#b91c1c]"
                  onClick={() => revoke(confirmId)}
                >
                  Xác nhận revoke
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

/* ─── S14 Delete account ──────────────────────────────────── */

export function DeleteAccountPage() {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [done, setDone] = useState(false);

  return (
    <AppShell title="Yêu cầu xóa tài khoản" breadcrumb="Cài đặt" active="/app/xoa-tai-khoan">
      <div className="mx-auto max-w-2xl">
        {done ? (
          <div className="f-card p-8 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#FEE2E2] text-[#DC2626]">
              <Check size={28} />
            </div>
            <h2 className="mt-4 text-xl font-bold">Đã gửi yêu cầu xóa</h2>
            <p className="mt-2 text-sm text-slate-600">
              Tài khoản sẽ được xử lý trong 7 ngày làm việc. Chứng từ giao dịch vẫn được lưu ≥ 5 năm theo quy định.
            </p>
            <Link to="/" className="f-btn-primary mt-6 inline-flex">
              Về trang chủ
            </Link>
          </div>
        ) : (
          <div className="f-card border-[#FECACA] p-7">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FEE2E2] text-[#DC2626]">
                <Trash2 size={20} />
              </span>
              <div>
                <h2 className="text-xl font-bold text-[#991B1B]">Danger zone</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Xóa tài khoản sẽ gỡ <b>thông tin cá nhân (PII)</b>: họ tên hiển thị, SĐT, bio, phiên đăng nhập.
                  <br />
                  <b>Chứng từ & nhật ký giao dịch</b> liên quan quỹ vẫn được <b>lưu tối thiểu 5 năm</b> phục vụ kiểm
                  toán và minh bạch (không xóa hash / SCF-ID).
                </p>
              </div>
            </div>
            <ul className="mt-5 space-y-2 rounded-xl bg-[#FEF2F2] p-4 text-sm text-[#991B1B]">
              <li>• Mất quyền truy cập portal & proposal đang mở</li>
              <li>• Không thể khôi phục sau khi duyệt xóa</li>
              <li>• Email .edu.vn có thể đăng ký lại sau 30 ngày</li>
            </ul>
            <button
              className="f-btn mt-6 bg-[#DC2626] text-white hover:bg-[#b91c1c]"
              onClick={() => setOpen(true)}
            >
              Yêu cầu xóa tài khoản
            </button>
          </div>
        )}

        {open && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div className="f-card w-full max-w-md p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold">Xác nhận lần 2</h3>
                <button onClick={() => setOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Gõ <b>XOA TAI KHOAN</b> để xác nhận. Hành động không hoàn tác sau khi Admin duyệt.
              </p>
              <input
                className="f-input mt-4"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="XOA TAI KHOAN"
              />
              <div className="mt-6 flex justify-end gap-2">
                <button className="f-btn-secondary" onClick={() => setOpen(false)}>
                  Hủy
                </button>
                <button
                  className="f-btn bg-[#DC2626] text-white disabled:opacity-40"
                  disabled={confirmText !== "XOA TAI KHOAN"}
                  onClick={() => {
                    setOpen(false);
                    setDone(true);
                  }}
                >
                  Xác nhận xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

/* ─── S15 Admin users ─────────────────────────────────────── */

const ROLES = ["Guest", "Sinh viên", "Nhà tài trợ", "Hội đồng", "Audit", "Admin"] as const;

export function AdminUsersPage() {
  const currentUserId = 1;
  const [q, setQ] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Minh Anh", email: "minhanh@fpt.edu.vn", role: "Admin" as string, self: true },
    { id: 2, name: "Trần Quốc Bảo", email: "bao@fpt.edu.vn", role: "Audit", self: false },
    { id: 3, name: "Lê Thu Hà", email: "ha@fpt.edu.vn", role: "Sinh viên", self: false },
    { id: 4, name: "Phạm Donor", email: "donor@fpt.edu.vn", role: "Nhà tài trợ", self: false },
    { id: 5, name: "Guest Demo", email: "guest@fpt.edu.vn", role: "Guest", self: false },
    { id: 6, name: "Vũ Hội Đồng", email: "hd@fpt.edu.vn", role: "Hội đồng", self: false },
  ]);
  const [toast, setToast] = useState("");

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(q.toLowerCase()) ||
          u.email.toLowerCase().includes(q.toLowerCase()),
      ),
    [users, q],
  );

  const changeRole = (id: number, role: string) => {
    if (id === currentUserId && role !== "Admin") {
      setToast("Không thể hạ quyền tài khoản đang đăng nhập (chặn self-demote).");
      setTimeout(() => setToast(""), 3000);
      return;
    }
    setUsers((list) => list.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  return (
    <AppShell title="Quản lý người dùng" breadcrumb="Người dùng" active="/app/nguoi-dung">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-slate-400" size={17} />
            <input
              className="f-input pl-10"
              placeholder="Tìm theo tên hoặc email…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <span className="text-sm text-slate-500">{filtered.length} người dùng</span>
        </div>

        {toast && (
          <div className="mb-4 rounded-lg border border-[#FDE68A] bg-[#FEF3C7] px-4 py-3 text-sm text-[#92400E]">
            {toast}
          </div>
        )}

        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-xs text-slate-500">
              <tr>
                {["Người dùng", "Email", "Vai trò", "Ghi chú"].map((h) => (
                  <th key={h} className="px-5 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#FFF4ED] text-xs font-bold text-[#F37021]">
                        {u.name
                          .split(" ")
                          .slice(-2)
                          .map((x) => x[0])
                          .join("")}
                      </span>
                      <span className="font-semibold">
                        {u.name} {u.self && <span className="text-xs font-normal text-slate-400">(bạn)</span>}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{u.email}</td>
                  <td className="px-5 py-4">
                    <select
                      className="f-input h-10 w-40"
                      value={u.role}
                      onChange={(e) => changeRole(u.id, e.target.value)}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">
                    {u.self ? "Không được self-demote" : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

/* ─── S57 12-month survey ─────────────────────────────────── */

export function Survey12Page() {
  const [startup, setStartup] = useState<"yes" | "no" | "">("");
  const [studying, setStudying] = useState<"yes" | "no" | "">("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <AuthShell title="Khảo sát">
        <div className="f-card p-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
            <Check size={28} />
          </div>
          <h2 className="mt-4 text-2xl font-bold">Cảm ơn bạn đã phản hồi</h2>
          <p className="mt-2 text-sm text-slate-500">Thông tin giúp FSOLVER theo dõi tác động dài hạn sau 12 tháng.</p>
          <Link to="/app/ho-so" className="f-btn-primary mt-6 inline-flex w-full">
            Về portal
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Khảo sát 12 tháng">
      <div className="f-card p-8">
        <span className="badge bg-[#FEF3C7] text-[#92400E]">Hạn còn 14 ngày</span>
        <h2 className="mt-3 text-2xl font-bold">Khảo sát sau 12 tháng</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Dành cho dự án/startup đã nhận hỗ trợ. Vui lòng trả lời Có/Không trước deadline.
        </p>

        <div className="mt-6 space-y-5">
          <div className="rounded-xl border p-4">
            <p className="font-semibold">Startup / dự án của bạn còn hoạt động?</p>
            <div className="mt-3 flex gap-3">
              {(
                [
                  ["yes", "Có"],
                  ["no", "Không"],
                ] as const
              ).map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setStartup(v)}
                  className={`flex-1 rounded-lg border py-2.5 text-sm font-semibold ${
                    startup === v
                      ? "border-[#F37021] bg-[#FFF4ED] text-[#F37021]"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <p className="font-semibold">Bạn vẫn còn là sinh viên / đang học?</p>
            <div className="mt-3 flex gap-3">
              {(
                [
                  ["yes", "Có"],
                  ["no", "Không"],
                ] as const
              ).map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setStudying(v)}
                  className={`flex-1 rounded-lg border py-2.5 text-sm font-semibold ${
                    studying === v
                      ? "border-[#F37021] bg-[#FFF4ED] text-[#F37021]"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="f-label">Ghi chú thêm (tuỳ chọn)</span>
            <textarea className="f-input h-24 py-3" placeholder="Cập nhật ngắn về tình trạng dự án…" />
          </label>
        </div>

        <button
          type="button"
          className="f-btn-primary mt-6 w-full"
          disabled={!startup || !studying}
          onClick={() => setSent(true)}
        >
          Gửi khảo sát
        </button>
        <p className="mt-4 text-center text-xs text-slate-400">Deadline: 01/08/2026 · FR follow-up 12 tháng</p>
      </div>
    </AuthShell>
  );
}

/* ─── router helper ───────────────────────────────────────── */

export const FE02_PATHS = [
  "/dang-nhap",
  "/quen-mat-khau",
  "/dang-ky",
  "/xac-thuc-otp",
  "/hoan-thien-ho-so",
  "/app/ho-so",
  "/app/phien",
  "/app/xoa-tai-khoan",
  "/app/nguoi-dung",
  "/khao-sat-12-thang",
] as const;

export default function FE02Router() {
  const { pathname } = useLocation();
  if (pathname === "/dang-nhap") return <LoginPage />;
  if (pathname === "/quen-mat-khau") return <ForgotPasswordPage />;
  if (pathname === "/dang-ky") return <RegisterPage />;
  if (pathname === "/xac-thuc-otp") return <OtpPage />;
  if (pathname === "/hoan-thien-ho-so") return <OnboardingPage />;
  if (pathname === "/app/ho-so") return <ProfilePage />;
  if (pathname === "/app/phien") return <SessionsPage />;
  if (pathname === "/app/xoa-tai-khoan") return <DeleteAccountPage />;
  if (pathname === "/app/nguoi-dung") return <AdminUsersPage />;
  if (pathname === "/khao-sat-12-thang") return <Survey12Page />;
  return <LoginPage />;
}
