
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, fireDB } from '../firebase/FirebaseConfig';
import { Navigate } from 'react-router-dom';


export const ProtectedRouteAdmin = ({ children }) => {
 
     
        const [user, setUser ] = useState(null);
    
        const recentLoggedUser  = async (userid) => {
            const productAll = query(doc(fireDB, "user", userid));
            const querysnapshot = await getDoc(productAll);
            setUser (querysnapshot.data());
        };
    
        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    recentLoggedUser (user.uid);
                } else {
                    setUser (null); 
                }
            });
    
            return () => unsubscribe(); 
        }, []);
    
        if (user === null) {
            return null 
        }
    
        if (user.role) {
            return children;
           
        } else {
            return <Navigate to="/login" />; 
        }
    }
