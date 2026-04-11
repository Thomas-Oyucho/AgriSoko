import * as React from "react"
import {
  ResponsiveContainer,
  Tooltip,
} from "recharts"

import { cn } from "@/lib/utils"

export const ChartContainer = ({
  config,
  children,
  className,
}: {
  config: Record<string, { label: string; color: string }>
  children: React.ReactNode
  className?: string
}) => {
  return (
<<<<<<< HEAD
    <div className={cn("flex h-full w-full flex-col gap-4", className)}>
=======
    <div className={cn("flex flex-col gap-4", className)}>
>>>>>>> 3debba9 (feat: use shadcn-like charts with Recharts for admin reports)
      <style>
        {Object.entries(config)
          .map(([key, value]) => {
            return `--color-${key}: ${value.color};`
          })
          .join("\n")}
      </style>
      <ResponsiveContainer width="100%" height="100%">
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  )
}

export const ChartTooltip = Tooltip

interface TooltipContentProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color?: string;
    payload: { fill?: string };
  }>;
  label?: string;
  hideLabel?: boolean;
  formatter?: (value: number) => string;
}

export const ChartTooltipContent = ({
  active,
  payload,
  label,
  hideLabel = false,
  formatter,
}: TooltipContentProps) => {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {!hideLabel && <div className="mb-1 text-[0.7rem] uppercase text-muted-foreground">{label}</div>}
      <div className="flex flex-col gap-0.5">
        {payload.map((item, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color || item.payload.fill }}
            />
            <span className="text-[0.7rem] font-medium">
              {item.name}: {formatter ? formatter(item.value) : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
