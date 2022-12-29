import React from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import {
  useTable,
  usePagination,
  useSortBy,
  useExpanded,
  useRowSelect,
  useGlobalFilter,
} from "react-table";
import { useDispatch } from "react-redux";
import { setCliCkToCall } from "../../reducers/action/action";
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

export default function TableComponentClickToCall({
  data,
  selectOption = [],
  pagination = false,
  TicketsTitle,
  columns,
  exportData,
  other,
  action = {},
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
    setGlobalFilter,
    pageCount: controlledPageCount,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5, pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (selectOption?.show) {
        hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  );

  const headers = columns.map((item) => ({
    key: item.accessor,
    label: item.Header,
  }));
  const dispatch = useDispatch();
  function actionBtnHandler(type, row) {
    if (type === "call") {
      dispatch(setCliCkToCall([row]));
    }
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-slate-700">
                {TicketsTitle}
              </h3>
            </div>
            <div>
              {Object.keys(selectedRowIds).length > 0
                ? selectOption.option
                : ""}
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              {other}
              {exportData ? (
                <CSVLink
                  data={data}
                  filename={`${TicketsTitle}.csv`}
                  headers={headers}
                  className="bg-blue-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  <i className="fas fa-file-export"></i> Export
                </CSVLink>
              ) : (
                ""
              )}
              <input
                type="search"
                placeholder="Search...."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="py-1.5 px-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-scroll">
          <table
            className="w-full items-center  bg-transparent border-collapse"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-4 bg-gray-50 text-slate-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                      {column.render("Header")}
                      {i === 0 ? (
                        ""
                      ) : (
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <i className="fas fa-sort-down text-orange-500 mr-4"></i>
                            ) : (
                              <i className="fas fa-sort-up text-orange-500 mr-4"></i>
                            )
                          ) : (
                            <i className="fas fa-sort text-orange-500 mr-4"></i>
                          )}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);

                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-200">
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                    {Object.keys(action).length > 0 ? (
                      <td>
                        <button
                          className="bg-green-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          title="Call Now"
                          onClick={() => actionBtnHandler("call", row.original)}
                        >
                          <i className="fas fa-phone"></i>
                        </button>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {pagination ? (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium"> {page.length}</span> of{" "}
                  <span className="font-medium">
                    {controlledPageCount * pageSize}{" "}
                  </span>{" "}
                  results
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-700">
                  Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
                  <span className="font-medium">{pageOptions.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Go to </span>{" "}
                  <span className="font-medium">
                    <input
                      type="number"
                      className="border-solid border-2 border-gray-100 shadow-sm w-10"
                      defaultValue={pageIndex + 1}
                      onChange={(e) => {
                        const page = e.target.value
                          ? Number(e.target.value) - 1
                          : 0;
                        gotoPage(page);
                      }}
                      max={pageOptions.length}
                      min={1}
                    />
                  </span>{" "}
                  page
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <div className="px-4 text-sm text-gray-700">
                    <span className="font-medium">Show: </span>
                    <select
                      className="px-4 py-2"
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                      }}
                    >
                      {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          {pageSize}
                        </option>
                      ))}
                    </select>
                    <span className="font-medium">results </span>
                  </div>
                  <Link
                    to="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    <i className="fas fa-angle-double-left"></i>
                    <span className="sr-only">Previous</span>
                  </Link>
                  <Link
                    to="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    <i className="fas fa-angle-left"></i>
                  </Link>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"></span>
                  <Link
                    to="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    <i className="fas fa-angle-right"></i>
                  </Link>
                  <Link
                    to="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    <i className="fas fa-angle-double-right"></i>
                    <span className="sr-only">Next</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
