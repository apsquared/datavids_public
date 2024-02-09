"use client"

import { stringify } from "querystring";
import { useEffect } from "react";
import { useState } from "react";

const Subscribe = () => {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success,setSuccess] = useState(false);

  useEffect(() => {
    setError("");
  },[email]);

  const validateAndSubmit =  async () => {
    setSuccess(false);
    setError("");
    if (!email) {
      setError("Invalid email address");
      return;
    }
    if (!isValidEmail(email)){
      setError("Invalid email address");
      return;
    }
    const valresponse = await fetch("/api/addtowaitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:email}) 
    });
    if (valresponse.status==200){
      const rjson = await valresponse.json();
      if (rjson.resp.status == 'OK'){
        setSuccess(true);
      } else {
        setError("Error from server: "+rjson.resp.status);
      }
    } else {
      setError("Error from server "+valresponse.status);
    }
    
  }

  function isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  return (
    <div
      className="wow fadeInUp relative z-10 rounded-md bg-primary/[3%] p-8 dark:bg-primary/10 sm:p-11 lg:p-8 xl:p-11"
      data-wow-delay=".2s"
    >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mb-4 w-full rounded-md border border-body-color border-opacity-10 py-3 px-6 text-base font-medium text-body-color placeholder-body-color outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#242B51] focus:dark:border-opacity-50"
        />
        <input
          type="submit"
          value="Subscribe"
          onClick={() =>  validateAndSubmit()}
          className="duration-80 mb-4 w-full cursor-pointer rounded-md border border-transparent bg-primary py-3 px-6 text-center text-base font-medium text-white outline-none transition ease-in-out hover:bg-opacity-80 hover:shadow-signUp focus-visible:shadow-none"
        />
        <p className="text-center text-base font-bold leading-relaxed text-body-color">
          Signup now for early access and a nice discount.
        </p>

        { error && (
          <p className="font-bold text-center text-xl text-red-500">{error}</p>
        )}

        { success && (
          <p className="font-bold text-center text-xl text-green-500">You have been added to our waitlist!</p>
        )}

    </div>
  );
};

export default Subscribe;
