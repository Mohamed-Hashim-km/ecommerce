import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { Trash } from "lucide-react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { cartLengthHandler, loaderHandler, loggedHandler } from "../store/isWork";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [currentUser, setcurrentUser] = useState();
  const [currentUserEmail, setCurrentUserEmail] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAddress, setIsAddress] = useState(false);

  const CartListHandler = async () => {
    const snapShot = await getDocs(collection(fireDB, "user", currentUser, "productCart"));
    const res = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCart(res);
    dispatch(cartLengthHandler(res.length));
    CheckAdress();
  };

  useEffect(() => {
    if (currentUser) {
      CartListHandler();
    }
  }, [currentUser]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUserEmail(user.email);

      setcurrentUser(user.uid);
    });
  }, [auth]);

  const CheckAdress = async () => {
    const docRef = await getDocs(collection(fireDB, "user", currentUser, "Address"));
    const address = docRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (address.length > 0) {
      setIsAddress(true);
    } else {
      setIsAddress(false);
    }
  };

  const priceItem = cart.reduce((acc, value) => {
    return (acc += Number(value.price) * Number(value.quantity));
  }, 0);

  const dicount = cart.reduce((acc, value) => {
    return acc + (Number(value.price) - Number(value.currentPrice)) * Number(value.quantity);
  }, 0);

  const totalPrice = priceItem - dicount;

  const totalItem = cart.reduce((acc, value) => {
    return acc + value.quantity;
  }, 0);

  const CartRemoveHandler = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "user", currentUser, "productCart", id));
      CartListHandler();
      toast.success("Cart Deleted", {
        toastId: 1,
      });
      const snapShot = await getDocs(collection(fireDB, "user", currentUser, "productCart"));
      const length = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(cartLengthHandler(length.length));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const BuynowHandler = async (product) => {
    if (isAddress == false) {
      return navigate("/UserAdress");
    }

    var options = {
      key: "rzp_test_M1n7cG9Mgzq6WM",
      key_secret: "aN8hF5KVXSzu42QuupFDTiEd",
      amount: parseInt(product.price * product.quantity * 100),
      currency: "INR",
      order_receipt: "order_rcptid_",
      name: "SnapStore",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response);

        try {
          const date = new Date();
          addDoc(collection(fireDB, "user", currentUser, "buyedItems"), {
            uid: product.uid,
            description: product.description,
            price: product.price,
            currentPrice: product.currentPrice,
            productImageUrl: product.productImageUrl,
            quantity: product.quantity,
            category: product.category,
            title: product.title,
            orderId: Date.now(),
            status: "OrederConfirmed",
            date: date.toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
          });
          addDoc(collection(fireDB, "saleItmes"), {
            uid: product.uid,
            description: product.description,
            price: product.price,
            currentPrice: product.currentPrice,
            productImageUrl: product.productImageUrl,
            quantity: product.quantity,
            title: product.title,
            category: product.category,
            email: currentUserEmail,
            orderId: Date.now(),
            status: "OrederConfirmed",
            date: date.toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
          });
        } catch (error) {
          console.log(error);
        }

        toast.success("Payment Successful", {
          toastId: 1,
        });
        CartListHandler();

        try {
          deleteDoc(doc(fireDB, "user", currentUser, "productCart", product.id));
        } catch (error) {
          console.error("Error deleting product: ", error);
        }
      },

      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  const CheckOutHandlerDelete = async () => {
    try {
      const cartRef = collection(fireDB, "user", currentUser, "productCart");
      const cartSnapshot = await getDocs(cartRef);

      const deletePromises = cartSnapshot.docs.map((doc) => deleteDoc(doc.ref));

      await Promise.all(deletePromises);
      CartListHandler();
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const CheckOutHandler = async () => {
    if (isAddress == false) {
      return navigate("/UserAdress");
    }

    var options = {
      key: "rzp_test_M1n7cG9Mgzq6WM",
      key_secret: "aN8hF5KVXSzu42QuupFDTiEd",
      amount: parseInt(totalPrice * 100),
      currency: "INR",
      order_receipt: "order_rcptid_",
      name: "SnapStore",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response);
        try {
          if (cart.length > 0) {
            const date = new Date();
            cart.map((product) => {
              return addDoc(collection(fireDB, "user", currentUser, "buyedItems"), {
                uid: product.uid,
                description: product.description,
                price: product.price,
                currentPrice: product.currentPrice,
                productImageUrl: product.productImageUrl,
                quantity: product.quantity,
                title: product.title,
                category: product.category,
                orderId: Date.now(),
                status: "OrederConfirmed",
                date: date.toLocaleDateString(),
                email: currentUserEmail,
                time: new Date().toLocaleTimeString(),
              });
            });

            cart.map((product) => {
              return addDoc(collection(fireDB, "saleItems"), {
                uid: product.uid,
                description: product.description,
                price: product.price,
                currentPrice: product.currentPrice,
                productImageUrl: product.productImageUrl,
                quantity: product.quantity,
                title: product.title,
                category: product.category,
                date: date.toLocaleDateString(),
                orderId: Date.now(),
                status: "OrederConfirmed",
                email: currentUserEmail,
                time: new Date().toLocaleTimeString(),
              });
            });
          } else {
            toast.error("Cart Is Empty", {
              toastId: 1,
            });
          }
        } catch (error) {
          console.error("Error adding documents to Firestore:", error);
        }

        toast.success("Payment Successful", {
          toastId: 1,
        });
        CheckOutHandlerDelete();
      },

      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  const QuantityIncrementHandler = async (id) => {
    try {
      const docRef = await getDoc(doc(fireDB, "user", currentUser, "productCart", id));
      const products = { uid: docRef.id, ...docRef.data() };

      setDoc(doc(fireDB, "user", currentUser, "productCart", id), {
        ...products,
        quantity: products.quantity + 1,
      });
      CartListHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const QuantityDecrementHandler = async (id) => {
    try {
      const docRef = await getDoc(doc(fireDB, "user", currentUser, "productCart", id));
      const products = { uid: docRef.id, ...docRef.data() };

      if (products.quantity > 1) {
        setDoc(doc(fireDB, "user", currentUser, "productCart", id), {
          ...products,
          quantity: products.quantity - 1,
        });
        CartListHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="container mx-auto  max-w-7xl px-2 lg:px-0">
          <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"></h1>
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                <h2 id="cart-heading" className="sr-only"></h2>
                <ul role="list" className="divide-y divide-gray-200">
                  {cart.map((product) => (
                    <div key={product.uid} className="">
                      <li className="flex py-6 sm:py-6 ">
                        <div className="flex-shrink-0">
                          <img
                            onClick={() => navigate(`/productInfo/${product.uid}`)}
                            src={product.productImageUrl}
                            alt={product.title}
                            className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <a className="font-semibold text-black">{product.title}</a>
                                </h3>
                              </div>
                              <div className="mt-1 flex items-end">
                                <p className="text-xs  text-gray-500 font-bold line-through">{product.price}</p>
                                <p className="text-sm font-medium text-gray-900">&nbsp;&nbsp;{product.currentPrice}</p>
                              </div>
                              <button type="button" onClick={() => BuynowHandler(product)} className="mt-8 text-white py-1 text-sm px-4 bg-[#fea928] rounded-md">
                                Buynow
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <div className="mb-2 flex">
                        <div className="min-w-24 flex">
                          <button onClick={() => QuantityDecrementHandler(product.id)} type="button" className="h-7 w-7">
                            -
                          </button>
                          <input type="text" className="mx-1 h-7 w-9 rounded-md border text-center" value={product.quantity} />
                          <button onClick={() => QuantityIncrementHandler(product.id)} type="button" className="flex h-7 w-7 items-center justify-center">
                            +
                          </button>
                        </div>
                        <div className="ml-6 flex text-sm">
                          <button type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                            <Trash size={12} className="text-red-500" />
                            <span
                              onClick={() => {
                                CartRemoveHandler(product.id);
                              }}
                              className="text-xs font-medium text-red-500"
                            >
                              Remove
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="summary-heading" className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0">
                <h2 id="summary-heading" className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"></h2>
                <div>
                  <dl className=" space-y-1 px-2 py-2">
                    <div className="flex items-center justify-between py-4">
                      <dt className="flex items-center text-sm text-gray-800">
                        <span>Total Items</span>
                      </dt>
                      <dd className="text-sm font-medium text-black">{totalItem}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">Orginal Price</dt>
                      <dd className="text-sm font-medium text-gray-900">₹ {priceItem}</dd>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <dt className="flex items-center text-sm text-gray-800">
                        <span>Discount</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">{dicount}</dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="flex text-sm text-gray-800">
                        <span>Delivery Charges</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">Free</dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                      <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                      <dd className="text-base font-medium text-gray-900">₹ {priceItem - dicount}</dd>
                    </div>
                  </dl>
                  <div className="px-2 pb-4 font-medium text-green-700">
                    <div className="flex gap-4 mb-6">
                      <button
                        type="button"
                        onClick={() => navigate("/UserAdress")}
                        className="w-full px-4 py-3 text-center text-gray-100 bg-[#fea928] border border-transparent dark:border-gray-700   rounded-xl"
                      >
                        Add Address
                      </button>

                      <button type="button" onClick={CheckOutHandler} className="w-full px-4 py-3 text-center text-gray-100 bg-[#fea928] border border-transparent dark:border-gray-700   rounded-xl">
                        Check Out
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CartPage;
