const ACCENTS = {
  blue: {
    icon: "bg-slate-50 text-[#245e76]",
    helper: "text-[#245e76]",
  },
  green: {
    icon: "bg-emerald-50 text-[#16966e]",
    helper: "text-[#16966e]",
  },
  slate: {
    icon: "bg-slate-50 text-[#45606d]",
    helper: "text-[#45606d]",
  },
  orange: {
    icon: "bg-orange-50 text-[#e88326]",
    helper: "text-[#e88326]",
  },
};

export default function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  accent = "blue",
  onClick,
}) {
  const colors = ACCENTS[accent] || ACCENTS.blue;

  const content = (
    <>
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colors.icon}`}
      >
        {Icon && <Icon size={18} strokeWidth={2} />}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-slate-400">{label}</p>
        <p className="mt-1 text-[21px] font-bold leading-none tracking-tight text-[#102f3a]">
          {value}
        </p>
        <p className={`mt-2 text-[9px] font-semibold ${colors.helper}`}>
          {helper}
        </p>
      </div>
    </>
  );

  const className =
    "flex min-h-[100px] items-start gap-3 rounded-xl border border-slate-200/90 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${className} w-full`}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}
