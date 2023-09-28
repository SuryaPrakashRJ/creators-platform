const page = () => {
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
                    <p className="text-red-600 text-2xl font-semibold sm:text-5xl">
                        Please verify your email address to get access
                    </p>
                    <p className="text-gray-700">
                        Mail sent to your given email address.
                    </p>
                    <div className="flex flex-wrap items-center text-green-500 justify-center gap-3">
                    Verified?
                        <a href="/admin" className="block py-2 px-4 text-white font-medium bg-green-500 duration-150 hover:bg-green-600  rounded-lg">
                             Login here
                        </a>
                        
                    </div>
                </div>
            </div>
    )
}

export default page;