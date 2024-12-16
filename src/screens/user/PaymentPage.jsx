import React from 'react'

const PaymentPage = () => {
  return (
   <>

<div className="container mx-auto">
    <div className="flex items-center m-8">
        <h1 className="text-xl font-semibold text-slate-500 uppercase">Select Payment Method</h1>
    </div>
    <div className="flex lg:flex-row flex-col mx-auto lg:gap-12 gap-2 bg-white p-8 rounded-t-3xl border-t border-blue-100 w-full lg:w-3/4">
        <div className="flex-1">
            <label className="mb-4 flex items-center justify-between w-full has-[:checked]:bg-slate-100 has-[:checked]:text-slate-900 has-[:checked]:ring-slate-200 p-5 border-2 rounded-lg">
                <div className="flex items-center gap-4">
                    <i className="fa-brands fa-cc-visa text-xl"></i>
                    <p className="font-semibold">Credit or Debit Card</p>   
                </div>
                <input type="radio"  value="Credit or Debit Card" name="payment" className="checked:border-slate-500 ..." />
            </label>
            <label className=" mb-4 flex items-center justify-between w-full has-[:checked]:bg-slate-100 has-[:checked]:text-slate-900 has-[:checked]:ring-slate-200 p-5 border-2 rounded-lg">
                <div className="flex items-center gap-4">
                    <i className="fa-solid fa-building-columns text-xl"></i>
                    <p className="font-semibold">Net Banking</p>   
                </div>
                <input type="radio"  value="Net Banking" name="payment" className="checked:border-slate-500 ..." />
            </label>
            <label className=" mb-4 flex items-center justify-between w-full has-[:checked]:bg-slate-100 has-[:checked]:text-slate-900 has-[:checked]:ring-slate-200 p-5 border-2 rounded-lg">
                <div className="flex items-center gap-4">
                    <i className="fa-solid fa-mobile-screen text-xl"></i>
                    <p className="font-semibold">UPI</p>   
                </div>
                <input type="radio"  value="UPI" name="payment" className="checked:border-slate-500 ..." />
            </label>
        </div>
        <div className="flex-1">
            <label className=" mb-4 flex items-center justify-between w-full has-[:checked]:bg-slate-100 has-[:checked]:text-slate-900 has-[:checked]:ring-slate-200 p-5 border-2 rounded-lg">
                <div className="flex items-center gap-4">
                    <i className="fa-brands fa-paypal text-xl"></i>
                    <p className="font-semibold">Paypal</p>   
                </div>
                <input type="radio"  value="Paypal" name="payment" className="checked:border-slate-500 ..." />
            </label>
            <label className=" mb-4 flex items-center justify-between w-full has-[:checked]:bg-slate-100 has-[:checked]:text-slate-900 has-[:checked]:ring-slate-200 p-5 border-2 rounded-lg">
                <div className="flex items-center gap-4">
                    <i className="fa-solid fa-hand-holding-dollar text-xl"></i>
                    <p className="font-semibold">Cash On Delivery</p>   
                </div>
                <input type="radio" value="COD" name="payment" className="checked:border-slate-500 ..." />
            </label>
            <button  className="w-full p-5 border-2 border-slate-900 bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 rounded-lg">Proceed</button>
        </div>
    </div>
</div>
   
   </>
  )
}

export default PaymentPage