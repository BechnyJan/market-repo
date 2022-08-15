// import { stringify } from "querystring";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./components/Authentication/Auth";
import Checkout from "./components/Checkout/Checkout";
import Header from "./components/Header/Header";
import Products, { DataType } from "./components/Products/Products";
import Profile from "./components/Profile/Profile";
// import { API_KEY } from "./Data/api";
import { AuthContext } from "./store/auth-context";
// import { CartContext } from "./store/cart-context";

function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [searchResults, setSearchResults] = useState<any[] | null>([]);

  const [dataProfile, setDataProfile] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string | unknown>();
  const authContext = useContext(AuthContext);
  console.log(searchResults);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://shop-62ffc-default-rtdb.europe-west1.firebasedatabase.app/data.json"
      );
      // .then((response) => {
      //   return response.json();
      // })
      if (!response.ok) {
        throw new Error("Somethhing went wrong!");
      }

      const responseData = await response.json();
      // console.log(responseData);

      

        // console.log(restoreData);


      // .catch((error) => {
      // throw new Error(error);
      //   setError(error.message);
      // })
      setData(responseData);
      setSearchResults(responseData);
      // .then((data) => setData(data))
      //  .catch((error) => {
      // setError(error);
      // if (error) return;
      setIsLoading(false);
    };
    // fetchData();
    fetchData().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  // eslint-disable-next-line array-callback-return
  // let restoreData: any = searchResults?.map((item: any, i: number) => {
  //  restoreData = item[i];
  // });
  // console.log(data);

  // let link = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

  // useEffect(() => {
  //   // if (authContext.token && authContext?.email) {
  //   const fetchData = async () => {
  //     const response = await fetch(link, {
  //       method: "POST",
  //       body: JSON.stringify({ idToken: authContext.token }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Somethhing went wrong!");
  //     }
  //     // .then((response) => {
  //     //   return response.json();
  //     // })
  //     const responseData = await response.json();
  //     // .catch((error) => alert("Something has failed.!"))
  //     // .then((data) => {
  //     setDataProfile(responseData.users);
  //     // vyfiltrovat podle mailu ? :)map(filter()) vyuyit druhy usestate jako dependency v useefectu k fetchnuti dat
  //     // })
  //     // .catch((error) => {
  //     //   if (error) return;
  //     // });
  //     // };
  //   };
  //   fetchData().catch((error) => {
  //     setIsLoading(false);
  //     setError(error.message);
  //   });
  // }, [authContext.token, link]);

  // console.log(dataProfile);
  let content;
  if (error) {
    content = (
      <p className="Error">There has been an issue we are working on it.</p>
    );
  }

  return (
    <div className="">
      <Header posts={data} setSearchResults={setSearchResults} />
      {/* error && <p>There has been an issue we are working on it.</p> */}
      {/* {!isLoading && <h2>{data?.name}</h2>} */}
      {/* {content} */}
      {isLoading && <p>Content is loading</p>}

      <Routes>
        <Route
          path="/"
          element={<Products data={searchResults} error={content} />}
        />
        <Route
          path="/authorization"
          element={!authContext.token ? <Auth /> : <Navigate to="/" />}
        />
        {/* {!authContext?.isLoggedIn ? (
          <Route
            path="/profile/*"
            element={
              <h2 className="error">
                You are not logged in?{" "}
                <span>
                  You may try to <Link to='/authorization'>create an account?</Link>
                </span>
              </h2>
            }></Route>
        ) : ( */}
        <Route path="/checkout" element={<Checkout />} />
        {/* {authContext.token && ( */}
        <Route path="/profile/*" element={<Profile data={dataProfile} />} />
        {/* )} */}

        <Route path="/profile/" element={<Profile data={dataProfile} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
