import  ResetPassword  from "@/components/form/ResetPassword";
const page = () => {
    return (
        <div className='flex flex-col items-center justify-center py-28'>
        <h1>Enter your Email</h1>
        <ResetPassword />
        </div>
    );
}

export default page;