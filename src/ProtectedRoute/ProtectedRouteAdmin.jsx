import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { loaderHandler } from "../store/isWork";

export const ProtectedRouteAdmin = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();

  const recentLoggedUser = async (userid) => {
    setIsLoader(true);
    const productAll = query(doc(fireDB, "user", userid));
    const querysnapshot = await getDoc(productAll);
    setUser(querysnapshot.data());
    setIsLoader(false);
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
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
