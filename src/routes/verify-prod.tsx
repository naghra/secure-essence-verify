import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Lock,
  Server,
  Fingerprint,
  CheckCircle2,
  Loader2,
  Globe2,
  Calendar,
  Package,
  Hash,
  BadgeCheck,
  LifeBuoy,
  AlertTriangle,
  Factory,
} from "lucide-react";
import productImg from "../assets/product.png";

const ARABIC_FONT = "'IBM Plex Sans Arabic', system-ui, sans-serif";

export const Route = createFileRoute("/verify-prod")({
  component: VerifyProd,
  head: () => ({
    meta: [
      { title: "التحقق من المنتج — نظام المصادقة الآمن" },
      {
        name: "description",
        content:
          "تحقّق من أصالة المنتج عبر منصة المصادقة المؤسسية لمكافحة التزوير.",
      },
    ],
  }),
});

const STEPS = [
  { label: "تهيئة عملية التحقق الآمن", icon: Lock },
  { label: "الاتصال بخوادم المصادقة", icon: Server },
  { label: "فحص التوقيع الرقمي للمنتج", icon: Fingerprint },
  { label: "التحقق من شهادة الأمان", icon: ShieldCheck },
  { label: "تم تأكيد الأصالة", icon: CheckCircle2 },
];

function randomSerial() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) s += "-";
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
}

function VerifyProd() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<null | {
    productName: string;
    batch: string;
    mfg: string;
    verified: string;
    country: string;
    serial: string;
  }>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    STEPS.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => {
            setStep(i);
            if (i === STEPS.length - 1) {
              setTimeout(() => setDone(true), 700);
            }
          },
          i * 700 + 200,
        ),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!done) return;
    const now = new Date();
    const mfg = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 187);
    const fmt = (d: Date) =>
      d.toLocaleDateString("ar-EG-u-nu-latn", { day: "2-digit", month: "long", year: "numeric" });
    setData({
      productName: "largoMax — كريم أصلي 50 مل",
      batch: "LX-" + Math.floor(100000 + Math.random() * 899999),
      mfg: fmt(mfg),
      verified:
        fmt(now) +
        " · " +
        now.toLocaleTimeString("ar-EG-u-nu-latn", { hour: "2-digit", minute: "2-digit" }),
      country: "موريتانيا",
      serial: randomSerial(),
    });
  }, [done]);

  return (
    <main
      dir="rtl"
      lang="ar"
      style={{ fontFamily: ARABIC_FONT }}
      className="relative min-h-screen overflow-hidden bg-black text-white antialiased"
    >
      <BackgroundFX />

      <AnimatePresence mode="wait">
        {!done ? (
          <LoadingScreen key="load" step={step} />
        ) : (
          <SuccessScreen key="ok" data={data} />
        )}
      </AnimatePresence>
    </main>
  );
}

function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(16,185,129,0.18), transparent 45%), radial-gradient(circle at 85% 80%, rgba(16,185,129,0.12), transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(16,185,129,0) 0deg, rgba(16,185,129,0.08) 90deg, rgba(16,185,129,0) 180deg, rgba(16,185,129,0.06) 270deg, rgba(16,185,129,0) 360deg)",
          filter: "blur(40px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      />
    </div>
  );
}

function LoadingScreen({ step }: { step: number }) {
  const pct = Math.round(((step + 1) / STEPS.length) * 100);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16"
    >
      <div className="relative mb-10 flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
        <motion.div
          className="absolute inset-0 rounded-full border border-emerald-400/20"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border border-emerald-400/30 border-t-emerald-400"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          style={{ boxShadow: "0 0 40px rgba(16,185,129,0.35)" }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border border-emerald-300/50 border-b-emerald-300"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
        <motion.div
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 backdrop-blur-sm"
          style={{ boxShadow: "0 0 60px rgba(16,185,129,0.45)" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ShieldCheck className="h-9 w-9 text-emerald-300" />
        </motion.div>
      </div>

      <motion.p
        className="mb-2 text-[11px] tracking-[0.4em] text-emerald-300/70"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        تحقّق آمن
      </motion.p>
      <h1 className="mb-10 text-center text-2xl font-light tracking-tight text-white sm:text-3xl">
        جارٍ التحقق من أصالة المنتج
      </h1>

      <div className="w-full max-w-md">
        <ol className="space-y-3">
          {STEPS.map((s, i) => {
            const state = i < step ? "done" : i === step ? "active" : "pending";
            const Icon = s.icon;
            return (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 backdrop-blur-md"
                style={
                  state === "active"
                    ? { boxShadow: "0 0 24px rgba(16,185,129,0.25)", borderColor: "rgba(16,185,129,0.4)" }
                    : undefined
                }
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black/40">
                  {state === "done" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : state === "active" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-300" />
                  ) : (
                    <Icon className="h-4 w-4 text-white/30" />
                  )}
                </div>
                <span
                  className={
                    "text-sm " +
                    (state === "pending"
                      ? "text-white/35"
                      : state === "done"
                        ? "text-white/70"
                        : "text-white")
                  }
                >
                  {s.label}
                  {state === "active" && "…"}
                </span>
              </motion.li>
            );
          })}
        </ol>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-[11px] tracking-[0.3em] text-white/40">
            <span>التقدّم</span>
            <span className="text-emerald-300" style={{ fontFamily: ARABIC_FONT }}>
              {pct}٪
            </span>
          </div>
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-emerald-500 to-emerald-300"
              style={{ boxShadow: "0 0 18px rgba(16,185,129,0.7)" }}
              animate={{ width: pct + "%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function SuccessScreen({
  data,
}: {
  data: null | {
    productName: string;
    batch: string;
    mfg: string;
    verified: string;
    country: string;
    serial: string;
  };
}) {
  if (!data) return null;

  const details = [
    { label: "اسم المنتج", value: data.productName, icon: Package },
    { label: "رقم الدفعة", value: data.batch, icon: Hash },
    { label: "تاريخ الإنتاج", value: data.mfg, icon: Calendar },
    { label: "تاريخ التحقق", value: data.verified, icon: BadgeCheck },
    { label: "بلد التحقق", value: data.country, icon: Globe2 },
    { label: "بلد الصنع", value: "ألمانيا", icon: Factory },
    { label: "الحالة", value: "أصلي", icon: ShieldCheck, accent: true },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-10 sm:px-8 sm:py-16"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex items-center justify-between"
      >
        <div className="flex items-center gap-2 text-white/70">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="text-[11px] tracking-[0.35em]">تحقّق آمن</span>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-3 py-1 text-[11px] tracking-widest text-emerald-300 sm:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          جلسة مباشرة
        </div>
      </motion.div>

      {/* Hero badge */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        className="mx-auto mb-6 flex items-center justify-center"
      >
        <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
          <motion.div
            className="absolute inset-0 rounded-full border border-emerald-400/40"
            animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-emerald-400/40"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, delay: 0.4 }}
          />
          <div
            className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600"
            style={{ boxShadow: "0 0 60px rgba(16,185,129,0.6), inset 0 0 30px rgba(255,255,255,0.15)" }}
          >
            <CheckCircle2 className="h-14 w-14 text-black" strokeWidth={2.5} />
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-center text-3xl font-light tracking-tight text-white sm:text-5xl"
      >
        المنتج{" "}
        <span className="font-semibold text-emerald-300" style={{ textShadow: "0 0 24px rgba(16,185,129,0.5)" }}>
          أصلي وموثّق
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-white/55 sm:text-base"
      >
        تم التحقق من هذا المنتج رسميًا وتسجيله في قاعدة البيانات الآمنة الخاصة بنا.
      </motion.p>

      {/* Product */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="relative mx-auto mt-12 flex w-full max-w-sm items-center justify-center"
      >
        <div
          className="absolute inset-x-10 bottom-0 h-20 rounded-[50%] bg-emerald-500/30 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute inset-0 rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-xl"
          style={{ boxShadow: "0 0 80px rgba(16,185,129,0.15) inset" }}
          aria-hidden
        />
        <motion.img
          src={productImg}
          alt="المنتج الموثّق"
          width={1024}
          height={1536}
          className="relative z-10 h-80 w-auto drop-shadow-[0_30px_40px_rgba(16,185,129,0.35)] sm:h-[28rem]"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        <div className="pointer-events-none absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-black/60 px-2.5 py-1 text-[10px] tracking-widest text-emerald-300 backdrop-blur">
          <BadgeCheck className="h-3 w-3" /> موثّق
        </div>
      </motion.div>

      {/* Serial */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-8 flex max-w-md flex-col items-center gap-1"
      >
        <span className="text-[10px] tracking-[0.4em] text-white/40">
          التوقيع التشفيري
        </span>
        <code dir="ltr" className="font-mono text-sm tracking-widest text-emerald-200/90 sm:text-base">
          {data.serial}
        </code>
      </motion.div>

      {/* Details */}
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {details.map((d, i) => {
          const Icon = d.icon;
          return (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
              style={
                d.accent
                  ? { borderColor: "rgba(16,185,129,0.45)", boxShadow: "0 0 30px rgba(16,185,129,0.18)" }
                  : undefined
              }
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
              />
              <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-white/40">
                <Icon className="h-3.5 w-3.5 text-emerald-400" />
                {d.label}
              </div>
              <div
                className={
                  "mt-2 font-medium " +
                  (d.accent
                    ? "text-emerald-300 text-base tracking-[0.25em]"
                    : "text-white text-[15px]")
                }
              >
                {d.value}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Security strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          { l: "TLS 1.3", s: "مشفّر" },
          { l: "AES-256", s: "موقّع رقميًا" },
          { l: "ISO 27001", s: "متوافق" },
          { l: "MENA", s: "النطاق" },
        ].map((m) => (
          <div
            key={m.l}
            className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 text-center backdrop-blur"
          >
            <div className="text-[10px] tracking-[0.3em] text-white/35">{m.s}</div>
            <div dir="ltr" className="mt-0.5 font-mono text-xs text-emerald-300/90">{m.l}</div>
          </div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-12 flex flex-col items-center gap-6 border-t border-white/5 pt-8 text-center"
      >
        <div className="flex items-center gap-2 text-[11px] tracking-[0.35em] text-white/45">
          <Lock className="h-3 w-3 text-emerald-400" />
          محمي بتقنية التحقق الآمن
        </div>
        <p className="max-w-xl text-xs leading-relaxed text-white/35">
          يؤكد هذا التحقق أصالة المنتج لحظة المسح. يُعاقَب على تزوير أو تقليد أو توزيع المنتجات
          المزيّفة بموجب قوانين مكافحة التزوير الدولية.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white backdrop-blur transition hover:border-white/30 hover:bg-white/10">
            <LifeBuoy className="h-4 w-4 text-emerald-300" />
            تواصل مع الدعم
          </button>
          <button className="group inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/5 px-5 py-2.5 text-sm text-red-200 backdrop-blur transition hover:border-red-400/60 hover:bg-red-500/10">
            <AlertTriangle className="h-4 w-4" />
            الإبلاغ عن منتج مزيّف
          </button>
        </div>
        <div className="text-[10px] tracking-[0.4em] text-white/25">
          © {new Date().getFullYear()} تحقّق آمن · جميع الحقوق محفوظة
        </div>
      </motion.footer>
    </motion.section>
  );
}
