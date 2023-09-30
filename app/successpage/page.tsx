export default function Page({
    searchParams,
  }: {
    searchParams: {
      url: string;
    };
  }) {
    return (
<div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
                <div className="max-w-lg mx-auto space-y-3 text-center">
                <a
            href="javascript:void(0)"
            className="inline-flex items-center gap-2 text-xl font-bold text-black md:text-1xl"
            aria-label="logo"
          >
            <img
              src="https://res.cloudinary.com/dsdieyzkw/image/upload/v1695366242/zello/twokac3pyfcy4zl9h7xy.png"
              width={40}
              height={40}
              alt="logo"
            />
            CreatorCard
          </a>
                    <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
                        Your purchase was success
                    </p>
                    <p className="text-gray-700">
                        Mail sent to your email address with the details of your purchase.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <a href={searchParams.url} className="block py-2 px-4 text-white font-medium bg-green-500 duration-150 hover:bg-green-600  rounded-lg">
                            Download here
                        </a>
                        
                    </div>
                </div>
            </div>
    )
}
