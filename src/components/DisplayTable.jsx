import React, { memo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DisplayTable = ({
  data = [],
  column = [],
  loading = false,
  emptyMessage = "No data found",
}) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="w-full border-collapse text-sm">
          {/* Header */}
          <thead className="bg-gray-900 text-white sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th className="px-4 py-3 text-left font-semibold whitespace-nowrap border-b">
                  #
                </th>

                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold whitespace-nowrap border-b"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Loading */}
          {loading ? (
            <tbody>
              <tr>
                <td
                  colSpan={column.length + 1}
                  className="text-center py-10 text-gray-500"
                >
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
                    Loading...
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="border-b px-4 py-3 font-medium text-gray-600">
                      {index + 1}
                    </td>

                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border-b px-4 py-3 whitespace-nowrap text-gray-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={column.length + 1}
                    className="text-center py-12 text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>

      <div className="h-4" />
    </div>
  );
};

export default memo(DisplayTable);