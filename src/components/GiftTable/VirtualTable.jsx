import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const VirtualTable = ({ data = [] }) => {
  const tableContainerRef = useRef(null);

  const columns = useMemo(() => [
    {
      accessorKey: 'childName',
      header: 'Child Name',
      cell: info => <span className="font-bold text-white">{info.getValue()}</span>,
    },
    {
      accessorKey: 'address',
      header: 'Address',
    },
    {
      accessorKey: 'region',
      header: 'Region',
    },
    {
      accessorKey: 'item',
      header: 'Requested Item',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        const colors = {
          'Pending': 'text-neutral-400 bg-neutral-800',
          'Wrapped': 'text-green-400 bg-green-900/30',
          'Delivered': 'text-blue-400 bg-blue-900/30',
          'Loaded': 'text-yellow-400 bg-yellow-900/30',
        };
        return (
            <span className={clsx("px-2 py-1 rounded text-xs font-medium uppercase tracking-wider", colors[status] || "text-gray-400")}>
                {status}
            </span>
        )
      }
    },
    {
      accessorKey: 'riskLevel',
      header: 'Risk',
      cell: info => {
         const risk = info.getValue();
         return (
             <span className={clsx("font-bold", risk === 'High' ? 'text-red-500' : 'text-green-500')}>
                 {risk}
             </span>
         )
      }
    }
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();
  
  // Virtualizer
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 60, // Estimate row height
    overscan: 5,
  });

  return (
    <div ref={tableContainerRef} className="h-[500px] overflow-auto border border-white/10 rounded-xl relative bg-neutral-900 text-sm">
      <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <div
                key={row.id}
                role="row"
                aria-label={`Row ${row.index + 1}: ${row.original.item} for ${row.original.childName}, Status: ${row.original.status}`}
                className="absolute top-0 left-0 w-full flex items-center border-b border-white/5 hover:bg-white/5 transition-colors p-2"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.getVisibleCells().map(cell => (
                    <div key={cell.id} className="flex-1 px-4 truncate text-neutral-300">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                ))}
              </div>
            );
          })}
      </div>
      
      {/* Fallback for empty state */}
      {data.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
              No gifts found (or loading...)
          </div>
      )}
    </div>
  );
};

export default VirtualTable;
