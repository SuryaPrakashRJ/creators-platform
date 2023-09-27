"use client";
import AddProductButton from "@/components/dashboard/Store/AddProductButton";
import { useEffect, useState } from "react";
import { Card } from "antd";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Loader from "@/components/dashboard/common/Loader";
import Link from "next/link";

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
    setLoading(true)
    const productId = e.currentTarget.getAttribute('data-product-id')
    await fetch(
      `https://creators-platform-backend-production.up.railway.app/api/v1/digital_download/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await fetch(
      `https://creators-platform-backend-production.up.railway.app/api/v1/users/${user?.data.id}/products`
    );
    const jsonData = await res.json();
    setData(jsonData.data);
  
    setLoading(false);
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
              <div key={product.id} className="">
                <Card 
                  style={{ marginTop: 8 }}
                  // type="inner"
                  // title={product.heading}
                  // extra={<div className="space-x-4">
                  //   <Link href={`my-store/edit-product/${product.id}`} className="bg-green-400 px-4 py-2 rounded-lg  ">Edit</Link><button data-product-id={product.id} onClick={(e) =>handleProductDelete(e)} className="bg-red-500 px-4 py-2 rounded-lg " >Delete</button>
                  // </div>}
                >



                  {/* <div className="flex items-start sm:gap-8">
                    <div
                      className="hidden sm:h-52 sm:w-36 sm:grid  sm:shrink-0 sm:place-content-center sm:border sm:border-[#087789] sm:rounded-lg"
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
                      <h3 className="mt-4 text-xl text-start font-medium sm:text-xl">
                        {product.heading}
                      </h3>

                      <p className="mt-1 text-lg text-start text-gray-700">
                        {product.subheading}
                      </p>

                      <p className="mt-1 text-lg text-gray-700">
                        {product.description}
                      </p>

                      <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                        <div className="flex items-start gap-1 text-gray-500">
                          <p className="text-lg font-medium">
                            Price: {product.pricing}
                          </p>
                        </div>

                        <span className="hidden sm:block" aria-hidden="true">
                          &middot;
                        </span>

                        
                      </div>
                    </div>
                  </div> */}


        <div className="md:flex items-start -mx-10">
            <div className="w-full md:w-1/3 px-10  ">
                <div className="relative">
                    <img src={`${product.productImgLink}`} className="w-full relative z-10" alt=""/>
                    <div className="border-4 border-yellow-200 absolute top-2 left-10 right-10 z-0"></div>
                </div>
            </div>
            <div className="w-full md:w-1/2 px-10 ">
                <div className="mb-10">
                    <h1 className="font-bold text-start uppercase text-2xl mb-5">{`${product.heading}`}</h1>
                    <h1 className="font-bold text-start text-xl">{`${product.subheading}`}</h1>
                    <p className="text-sm text-start">{`${product.description}`} </p>
                    <h1 className="font-bold text-start uppercase text-xl mt-2">{`${product.pricing}`}</h1>
                </div>
                <div className="flex flex-col item-start space-y-2 justify-start sm:flex-row sm:space-x-2 sm:space-y-0 sm:item-start sm:justify-start">
                    <div className=" flex px-1">
                    <Link href={`my-store/edit-product/${product.id}`} className="bg-white opacity-75 border border-green-600 hover:bg-green-600 text-green-600 hover:text-white rounded-lg px-10 py-2 font-semibold ">Edit</Link>
                    </div>
                    <div className="flex px-1 ">
                        <button data-product-id={product.id} onClick={(e) =>handleProductDelete(e)} className="bg-white hover:bg-red-600 text-red-500 hover:text-white border border-red-600 rounded-lg font-semibold px-10 py-2" >Delete</button>
                    </div>
                </div>
            </div>
        </div>
    


<div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
    <div>
        <a title="Buy me a beer" href="https://www.buymeacoffee.com/scottwindon" target="_blank" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
            <img className="object-cover object-center w-full h-full rounded-full" src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"/>
        </a>
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
