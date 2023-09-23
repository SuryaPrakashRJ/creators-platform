
import { useSearchParams } from "next/navigation";

export default function page(
  {searchParams}:{searchParams:{
    heading:string,
    subheading:string,
    description:string,
    pricing:string
}}
) 
{
    return(
        
<section className="text-gray-700 body-font overflow-hidden bg-white">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{searchParams.heading}</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{searchParams.subheading}</h1> 
          
        <p className="py-3 leading-relaxed">{searchParams.description}</p>

        <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">


      <div className="sm:col-span-2">
        <label  className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Name</label>
        <input required name="company" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
      </div>

      <div className="sm:col-span-2">
        <label  className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
        <input required name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring " />
      </div>
    </form>





        <div className="flex py-6">
          <span className="title-font font-medium text-2xl text-gray-900">${searchParams.pricing}</span>
          <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded">{`Get Now`}</button>
            
        </div>
      </div>
    </div>
  </div>
</section>
    )
}
