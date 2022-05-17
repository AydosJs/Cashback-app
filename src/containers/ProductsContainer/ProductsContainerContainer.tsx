import React, { useEffect, useState } from "react";
import { getCompaniesProducts, Product } from "../../api/companiesApi";
import { MainLayout } from "../../Layout/MainLayout";
import { useParams } from "react-router-dom";
import { TableBodyWithPagination } from "../../components/ProductsComponent";

export interface IResponse {
  items: Product[],
  total_count: number
}



export default function ProductsContainer() {
  const [loader, setLoader] = useState<Boolean>(false);
  const [products, setProducts] = useState<IResponse>({
    items: [],
    total_count: 0
  });

  const params = useParams();

  useEffect(() => {
    getCompaniesProductsList();
  }, []);

  async function getCompaniesProductsList() {
    try {
      setLoader(true);
      const payload = params?.id;
      // console.log('params',params)
      const res = await getCompaniesProducts(payload);
      setProducts({
        items: res.data.items,
        total_count: res.data.total_count
      });
      // console.log("PRODUSCTS", res.data);
    } catch (error) {
      console.log("Error COMPANIES", error);
    } finally {
      setLoader(false);
    }
  }
  // console.log("products", products);

  return (
    <MainLayout>
      <>
        {products.total_count !== 0 && !loader && products.items.length && (
          <div className="w-full border sm:rounded-lg h-fit max-w-full overflow-x-auto " style={{ height: "fit-content" }}>
            <TableBodyWithPagination loader={loader} products={products} />
          </div>
        )}

        {products.total_count === 0 &&
          products.items.length === 0 &&
          !loader && <div>This company has No produsts yet !</div>}
      </>
    </MainLayout>
  );
}
