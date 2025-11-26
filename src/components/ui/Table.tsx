import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const table = tv({
  base: "relative flex flex-col w-full h-full overflow-x-auto",
  variants: {
    horizontalScroll: {
      true: "w-full relative",
    },
  },
});

const tableRow = tv({
  base: "transition-colors hover:bg-gray-50",
  variants: {
    isClickable: {
      true: "cursor-pointer",
    },
  },
});

const tableCell = tv({
  base: "px-2.5 py-2 bg-white",
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    sticky: {
      "left-1": "sticky left-0 z-30 bg-white",
      "left-2":
        "sticky left-[70px] z-30 bg-white after:content-[''] after:absolute after:top-0 after:right-0 after:bottom-0 after:w-2.5 after:translate-x-full after:bg-gradient-to-r after:from-black/10 after:to-transparent after:pointer-events-none",
      right:
        "sticky right-0 z-30 bg-white before:content-[''] before:absolute before:top-0 before:left-0 before:bottom-0 before:w-2.5 before:-translate-x-full before:bg-gradient-to-l before:from-black/10 before:to-transparent before:pointer-events-none",
    },
    isHeader: {
      true: "h-8 border-b border-[#cfd6de]",
      false:
        "h-9 [tr:not(:last-child)_&]:border-b [tr:not(:last-child)_&]:border-[#cfd6de]",
    },
    isClickable: {
      true: "cursor-pointer",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

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
  colSpan?: number;
}

export function Table({
  children,
  className,
  horizontalScrollWithStickyColumns = false,
}: TableProps) {
  if (horizontalScrollWithStickyColumns) {
    return (
      <div
        className={table({ horizontalScroll: true, className })}
      >
        <div className="overflow-x-auto">
          <div className="min-w-max inline-flex">
            <table className="w-full text-left table-auto">{children}</table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={table({ className })}>
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

export function TableRow({ children, onClick, className }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={tableRow({ isClickable: !!onClick, className })}
    >
      {children}
    </tr>
  );
}

export function TableHeaderCell({
  children,
  align = "left",
  className,
  "data-sticky": sticky,
}: TableHeaderCellProps) {
  return (
    <th
      className={tableCell({ align, sticky, isHeader: true, className })}
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
  className,
  "data-sticky": sticky,
  onClick,
  colSpan,
}: TableCellProps) {
  return (
    <td
      colSpan={colSpan}
      className={tableCell({
        align,
        sticky,
        isHeader: false,
        isClickable: !!onClick,
        className,
      })}
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

