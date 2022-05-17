import React, { useEffect, useState } from "react";
import { Company, getCompanies } from "../../api/companiesApi";
import { Link } from "react-router-dom";

export default function CompaniesContainer() {
  const [items, setItem] = useState<Company[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getCompaniesList();
  }, []);

  async function getCompaniesList() {
    try {
      setLoader(true);
      const res = await getCompanies();
      setItem(res.data.items);
    } catch (error) {
      console.log("Error COMPANIES", error);
    } finally {
      setLoader(false);
    }
  }

  return (
    <div
      className="grid grid-cols-full gap-4 md:grid-cols-4"
    >
      {items?.length !== 0 && !loader ? (
        items.map((item, index) => (
          <Link
            to={`/companies/${item?.id}`}
            className="border rounded flex flex-col hover:shadow-lg"
            key={index}
          >
            <div key={index} className="p-6">
              <div className="mb-4">
                <p className="text-lg font-semibold">{item.name}</p>
              </div>
              <div className="mb-4">
                <p
                  className="fontSize-sm text-gray-600 line-clamp-2 whitespace-normal"
                >
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="">Loading....</div>
      )}
    </div>
  );
}
