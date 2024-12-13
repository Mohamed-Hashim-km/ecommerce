import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loaderHandler } from "../store/isWork";
import Loader from "../components/Loader";

export const ProtectedRouteUser = ({ children }) => {
  const [user, setUser] = useState(null);
  const isLoader = useSelector((state) => state.loaderState.isLoading);
  const dispatch = useDispatch();

  const recentLoggedUser = async (userid) => {
    dispatch(loaderHandler(true));
    const productAll = query(doc(fireDB, "user", userid));
    const querysnapshot = await getDoc(productAll);
    setUser(querysnapshot.data());
    dispatch(loaderHandler(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        recentLoggedUser(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoader) {
    return <Loader />;
  }

  if (user === null) {
    return null;
  }

  if (user.role) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};
