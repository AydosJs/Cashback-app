import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import ReactPaginate from "react-paginate";
import { Product } from "../api/companiesApi";

export function TableBodyWithPagination({ loader, products }: any) {
  const [currentItems, setCurrentItems] = useState<Product[] | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products?.items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products?.items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % products?.items.length;
    setItemOffset(newOffset);
  };

  // SEARCH
  const [query, setQuery] = useState("");

  // SORT
  const [sortedField, setSortedField] = useState<any>({
    name: null,
    date: null
  });

  return !loader ? (
    <div style={{ minWidth: 800 }}>
      <div className="p-4 w-full">
        <div className="relative mt-1 w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="bg-gray-50 border border-gray-300  text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
            placeholder="Search for products"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500 " style={{
        minWidth: 600
      }}>
        <thead className="bg-gray-100 text-xs text-gray-700 uppercase ">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 flex flex-row flex-nowrap whitespace-nowrap  items-center"
              onClick={() =>
                setSortedField({
                  ...sortedField,
                  name: Boolean(sortedField.name) ? null : true
                })
              }
            >
              Product name{" "}
              {Boolean(sortedField?.name) ? (
                <span className="border-gray-400 whitespace-nowrap font-bold ml-4 text-sm bg-gray-100 border p-1 cursor-pointer hover:bg-gray-200 rounded">
                  A-Z
                </span>
              ) : (
                <span className="border-gray-400 whitespace-nowrap font-bold ml-4 text-sm bg-gray-100 border p-1 cursor-pointer hover:bg-gray-200 rounded">
                  Z-A
                </span>
              )}
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Created at
            </th>
          </tr>
        </thead>

        {currentItems?.length !== 0 && products.total_count !== 0 && (
          <tbody>
            {currentItems
              ?.sort((a: any, b: any) => {
                if (sortedField?.name !== null) {
                  return a["name"]?.localeCompare(b["name"]);
                } else if (sortedField.name === null) {
                  return b["name"]?.localeCompare(a["name"]);
                }
              })
              .filter((product: Product) => {
                if (query === "") {
                  return product;
                } else if (
                  product?.name
                    .toLowerCase()
                    .includes(query.toLocaleLowerCase())
                ) {
                  return product;
                }
              })
              .map((item: Product, index) => (
                <tr
                  key={index}
                  className="border-b font-medium"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item?.name}
                  </th>
                  <td className="px-6 py-4"

                  >
                    <p className="line-clamp-1">
                      {item?.description}
                    </p>
                  </td>
                  <td className="px-6 py-4" style={{ minWidth: "150px" }}>
                    <span className="" >
                      {dayjs(item?.created_at).format("MM-DD-YYYY")}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        )}

      </table>
      {Boolean(currentItems) && products?.items.length > itemsPerPage && (
        <div className="bg-gray-100 min-w-full p-2">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousClassName="flex flex-row overflow-hidden"
            nextClassName="flex flex-row overflow-hidden border-gray-300  border-r"
            nextLinkClassName=" hover:rounded h-full text-sm py-4 px-6 text-gray-500 cursor-pointer hover:bg-blue-500 hover:text-white "
            previousLinkClassName=" hover:rounded h-full text-sm py-4 px-6 text-gray-500 cursor-pointer border-gray-300  border-r hover:bg-blue-500 hover:text-white"
            previousLabel="< previous"
            // renderOnZeroPageCount={null}
            pageLinkClassName="text-sm  py-4 px-6  cursor-pointer border-gray-300  border-r border-back hover:bg-blue-500 hover:text-white"
            pageClassName="flex justifuy-center"
            marginPagesDisplayed={2}
            activeClassName="bg-blue-500 text-white rounded"
            containerClassName="flex flex-row w-fit rounded border border-gray-300 font-semibold"
          />
        </div>
      )}
    </div>
  ) : (
    <div className="">Loading....</div>
  );
}