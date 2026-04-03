"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useStore, UserProfile, MealLog } from "@/lib/store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setCurrentUserUid, setProfile, setLogs, setAuthLoaded, clearState } = useStore();
  
  useEffect(() => {
    let unSubProfile: (() => void) | null = null;
    let unSubLogs: (() => void) | null = null;

    const cleanupListeners = () => {
      if (unSubProfile) unSubProfile();
      if (unSubLogs) unSubLogs();
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      cleanupListeners();

      if (user) {
        setCurrentUserUid(user.uid);
        
        unSubProfile = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            setProfile(null);
          }
        });

        const q = query(collection(db, "users", user.uid, "logs"), orderBy("timestamp", "desc"));
        unSubLogs = onSnapshot(q, (snapshot) => {
          const logsData: MealLog[] = [];
          snapshot.forEach((doc) => {
            logsData.push({ id: doc.id, ...doc.data() } as MealLog);
          });
          setLogs(logsData);
        });
        
        setAuthLoaded(true);
      } else {
        clearState();
      }
    });

    return () => {
      cleanupListeners();
      unsubscribeAuth();
    };
  }, [setCurrentUserUid, setProfile, setLogs, setAuthLoaded, clearState]);

  return <>{children}</>;
}
