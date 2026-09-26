import { ArrowUpRight } from "lucide-react";

const ACCENTS = {
  brand: {
    badge: "bg-gradient-to-br from-brand-500 to-navy-700",
    ring: "from-brand-500/15 to-transparent",
    trend: "text-brand-600 bg-info-50",
  },
  success: {
    badge: "bg-gradient-to-br from-emerald-400 to-success-600",
    ring: "from-success-600/15 to-transparent",
    trend: "text-success-600 bg-success-50",
  },
  purple: {
    badge: "bg-gradient-to-br from-purple-500 to-navy-800",
    ring: "from-purple-500/15 to-transparent",
    trend: "text-purple-500 bg-purple-500/10",
  },
  warning: {
    badge: "bg-gradient-to-br from-amber-400 to-warning-600",
    ring: "from-warning-600/15 to-transparent",
    trend: "text-warning-600 bg-warning-50",
  },
};

export default function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  accent = "brand",
  onClick,
}) {
  const colors = ACCENTS[accent] || ACCENTS.brand;

  const content = (
    <>
      <div
        className={`pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${colors.ring} blur-xl`}
      />

      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md shadow-navy-900/10 ${colors.badge}`}
        >
          {Icon && <Icon size={19} strokeWidth={2.25} />}
        </div>

        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-[9px] font-bold ${colors.trend}`}
        >
          <ArrowUpRight size={10} strokeWidth={2.5} />
          Live
        </span>
      </div>

      <div className="relative mt-4 min-w-0">
        <p className="text-[22px] font-extrabold leading-none tracking-tight text-navy-950">
          {value}
        </p>
        <p className="mt-1.5 text-[11px] font-semibold text-slate-400">
          {label}
        </p>
        <p className="mt-2 truncate text-[10px] font-medium text-slate-400">
          {helper}
        </p>
      </div>
    </>
  );

  const className =
    "group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-4.5 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-lg hover:shadow-navy-900/[0.06]";

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${className} w-full`}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}
