import { PieChart as PieIcon } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLOR_MAP = {
  Occupied: "#2563eb",
  Available: "#16a34a",
  Maintenance: "#d97706",
};
const FALLBACK_COLORS = ["#2563eb", "#16a34a", "#d97706", "#94a3b8"];

export default function OccupancyChart({ data, occupancyRate }) {
  const total = data.reduce((sum, item) => sum + (item.value || 0), 0);

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-4.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-info-50 text-brand-600">
            <PieIcon size={15} strokeWidth={2.25} />
          </div>
          <div>
            <h2 className="text-[13px] font-bold text-navy-950">
              Room Occupancy
            </h2>
            <p className="text-[9.5px] text-slate-400">Live status split</p>
          </div>
        </div>
      </div>

      <div className="relative mt-2 h-[168px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={54}
              outerRadius={74}
              paddingAngle={3}
              stroke="none"
              cornerRadius={6}
            >
              {data.map((item, index) => (
                <Cell
                  key={item.name}
                  fill={
                    COLOR_MAP[item.name] ||
                    FALLBACK_COLORS[index % FALLBACK_COLORS.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                `${value} room${value === 1 ? "" : "s"}`,
                name,
              ]}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                fontSize: 11,
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[22px] font-extrabold leading-none text-navy-950">
            {occupancyRate}%
          </p>
          <p className="mt-1 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
            Occupied
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-2.5 border-t border-slate-100 pt-3.5">
        {data.map((item, index) => {
          const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
          const color =
            COLOR_MAP[item.name] || FALLBACK_COLORS[index % FALLBACK_COLORS.length];

          return (
            <div key={item.name}>
              <div className="mb-1 flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1.5 font-semibold text-slate-600">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {item.name}
                </span>
                <span className="font-bold text-navy-950">{item.value}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
