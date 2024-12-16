import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { useRef } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, fireDB } from '../../firebase/FirebaseConfig'
import { toast } from 'react-toastify'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const UserAdress = () => {

    const [user,setcurrentUser]=useState(null)
    const navigate=useNavigate()
   
    const name=useRef("")
    const address=useRef("")
    const phone=useRef()
    const city=useRef("")
    const zipCode=useRef()
    const state=useRef("")
    const country=useRef("")


   
        onAuthStateChanged(auth, (user) => {
          setcurrentUser(user.uid);
        });

        console.log(user);
        

      const adressSubmitHandler=()=>{
        
        if(name.current.value==""|| address.current.value==""|| phone.current.value==""|| city.current.value==""|| zipCode.current.value==""|| state.current.value==""|| country.current.value==""){
          return  toast.error("Fill All Fields",{
            toastId:1
          });
        }

      

      
      
       

        addDoc(collection(fireDB, "user", user, "Adress"), {
           name:name.current.value,
           address:address.current.value,
           phone:phone.current.value,
           city:city.current.value,
           zipCode:zipCode.current.value,
           state:state.current.value,
           country:country.current.value,
        })
        toast.success("Address Added Successfully",{
            toastId:1
        });
        navigate("/cartPage")

      }  
      



  return (
   <>
   <Layout>
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label for="full_name">Full Name</label>
                      <input ref={name} type="text"  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder='FullName'  />
                    </div>

                    <div className="md:col-span-5">
                      <label for="email">Email Address</label>
                      <input ref={phone} type="number"  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="Number" />
                    </div>

                    <div className="md:col-span-3">
                      <label for="address">Address / Street</label>
                      <input ref={address} type="text"  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
                    </div>

                    <div className="md:col-span-2">
                      <label for="city">City</label>
                      <input ref={city} type="text"  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
                    </div>

                    <div className="md:col-span-2">
                      <label for="country">Country / region</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input ref={country}  placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                        
                        
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label for="state">State / province</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input ref={state}  placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                        
                       
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <label for="zipcode">Zipcode</label>
                      <input ref={zipCode} type="number"  className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder=""  />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button type='button' onClick={adressSubmitHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Layout>
   </>
  )
}

export default UserAdress