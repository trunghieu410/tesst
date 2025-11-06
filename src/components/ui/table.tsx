import type { ReactNode } from "react";
import { cn } from "@/lib/utils/common";

interface TableProps {
  children: ReactNode;
  className?: string;
  horizontalScrollWithStickyColumns?: boolean;
}

interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

interface TableHeaderCellProps {
  children: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  "data-sticky"?: "left-1" | "left-2" | "right";
}

interface TableCellProps {
  children: ReactNode;
  onClick?: () => void;
  align?: "left" | "center" | "right";
  className?: string;
  "data-sticky"?: "left-1" | "left-2" | "right";
}

export function Table({
  children,
  className = "",
  horizontalScrollWithStickyColumns = false,
}: TableProps) {
  if (horizontalScrollWithStickyColumns) {
    return (
      <div className={cn("w-full relative", className)}>
        <div className="overflow-x-auto">
          <div className="min-w-max inline-flex">
            <table className="w-full text-left table-auto">{children}</table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col w-full h-full overflow-x-auto",
        className
      )}
    >
      <table className="w-full text-left table-auto min-w-max">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, className = "" }: TableHeadProps) {
  return <thead className={className}>{children}</thead>;
}

export function TableBody({ children, className = "" }: TableBodyProps) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, onClick, className = "" }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        onClick && "cursor-pointer",
        "transition-colors hover:bg-gray-50",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TableHeaderCell({
  children,
  align = "left",
  className = "",
  "data-sticky": sticky,
}: TableHeaderCellProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <th
      className={cn(
        "h-8 px-2.5 py-2 bg-white border-b border-[#cfd6de]",
        alignClass,
        sticky === "left-1" && "sticky left-0 z-30 bg-white",
        sticky === "left-2" &&
          "sticky left-[70px] z-30 bg-white after:content-[''] after:absolute after:top-0 after:right-0 after:bottom-0 after:w-2.5 after:translate-x-full after:bg-gradient-to-r after:from-black/10 after:to-transparent after:pointer-events-none",
        sticky === "right" &&
          "sticky right-0 z-30 bg-white before:content-[''] before:absolute before:top-0 before:left-0 before:bottom-0 before:w-2.5 before:-translate-x-full before:bg-gradient-to-l before:from-black/10 before:to-transparent before:pointer-events-none",
        className
      )}
      data-sticky={sticky}
    >
      <div className="font-medium text-xs leading-4 text-[#021337]">
        {children}
      </div>
    </th>
  );
}

export function TableCell({
  children,
  align = "left",
  className = "",
  "data-sticky": sticky,
  onClick,
}: TableCellProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <td
      className={cn(
        "h-9 px-2.5 py-2 bg-white [tr:not(:last-child)_&]:border-b [tr:not(:last-child)_&]:border-[#cfd6de]",
        onClick && "cursor-pointer",
        alignClass,
        sticky === "left-1" && "sticky left-0 z-30 bg-white",
        sticky === "left-2" &&
          "sticky left-[70px] z-30 bg-white after:content-[''] after:absolute after:top-0 after:right-0 after:bottom-0 after:w-2.5 after:translate-x-full after:bg-gradient-to-r after:from-black/10 after:to-transparent after:pointer-events-none",
        sticky === "right" &&
          "sticky right-0 z-30 bg-white before:content-[''] before:absolute before:top-0 before:left-0 before:bottom-0 before:w-2.5 before:-translate-x-full before:bg-gradient-to-l before:from-black/10 before:to-transparent before:pointer-events-none",
        className
      )}
      data-sticky={sticky}
      onClick={onClick}
    >
      <div className="font-normal text-sm leading-5 text-[#021337]">
        {children}
      </div>
    </td>
  );
}

// Legacy exports for backward compatibility (will be deprecated)
export const TableHeader = TableHeaderCell;
