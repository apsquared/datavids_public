"use client"

import { createContext, useState,useEffect } from 'react';

export const DataContext = createContext({} as any);

const DataProvider = ({ children }: { children: React.ReactNode }) => {

  const [userCredits,updateUserCredits] =useState(0);
  useEffect(() => {
  
   // console.log("user effect in data proivder");
    updateCreditsContext();
  }, []);
  const updateCreditsContext = () =>
  {
  
    //console.log("update tokens in data proivder");

        fetch("/api/getusercredits", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => updateUserCredits(data.total));
    
  }
  

  return (
    <DataContext.Provider value={{userCredits:userCredits,updateCreditsContext}}>
      { children }
    </DataContext.Provider>
  )
}

export default DataProvider;