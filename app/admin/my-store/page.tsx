"use client";
import AddProductButton from "@/components/dashboard/Store/AddProductButton";
import { useEffect, useState } from "react";
import { Card } from "antd";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Loader from "@/components/dashboard/common/Loader";

type DigitProduct = {
  id: number;
  email: string;
  productImgLink: string;
  heading: string;
  subheading: string;
  pricing: number;
  buttonTitle: string;
  downloadable: boolean;
  description: string;
  fileUrl: string;
};

type DataType = {
  DigitProducts: DigitProduct[];
};

export default function Page() {
  const { user } = useAuth();
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Products = async () => {
      const res = await fetch(
        `https://creators-platform-backend-production.up.railway.app/api/v1/users/${user?.data.id}/products`
      );
      const jsonData = await res.json();
      console.log(jsonData);
      setData(jsonData.data);
      setLoading(false);
   
    };
    Products();
    
  }, [user]);

  async function handleProductDelete(e:any){
    const productId = Number(e.currentTarget.getAttribute('data-product-id'))
    await fetch(
      `https://creators-platform-backend-production.up.railway.app/api/v1/digital_download/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="text-center flex flex-col items-center">
      <div className="w-full">
        <Card title="Products">
          {data &&
            data.DigitProducts.map((product: DigitProduct) => (
              <div key={product.id}>
                <Card
                  style={{ marginTop: 8 }}
                  type="inner"
                  title={product.heading}
                  extra={<div className="space-x-4">
                    <a href="/edit-product/" className="bg-green-400 px-4 py-2 rounded-lg  ">Edit</a><button data-product-id={product.id} onClick={(e) =>handleProductDelete(e)} className="bg-red-500 px-4 py-2 rounded-lg " >Delete</button>
                  </div>}
                >
                  <div className="flex items-start sm:gap-8">
                    <div
                      className="hidden sm:h-52 sm:w-36 sm:grid  sm:shrink-0 sm:place-content-center sm:border sm:border-gray-200 sm:rounded-lg"
                      aria-hidden="true"
                    >
                      <Image
                        src={product.productImgLink}
                        alt="Product Image"
                        width={144}
                        height={144}
                      />
                    </div>

                    <div>
                      <h3 className="mt-4 text-lg font-medium sm:text-xl">
                        {product.heading}
                      </h3>

                      <p className="mt-1 text-sm text-gray-700">
                        {product.subheading}
                      </p>

                      <p className="mt-1 text-sm text-gray-700">
                        {product.description}
                      </p>

                      <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                        <div className="flex items-center gap-1 text-gray-500">
                          <p className="text-xs font-medium">
                            Price: {product.pricing}
                          </p>
                        </div>

                        <span className="hidden sm:block" aria-hidden="true">
                          &middot;
                        </span>

                        <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                          File Link:
                          <a
                            href={product.fileUrl}
                            className="underline hover:text-gray-700"
                          >
                            {product.fileUrl}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
        </Card>
      </div>
      <AddProductButton />
    </div>
  );
}
