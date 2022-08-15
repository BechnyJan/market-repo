import React, { FC, useContext, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { API_KEY } from "../../Data/api";
import { PROFILE__DATA } from "../../Data/ProfileData";
import { AuthContext } from "../../store/auth-context";
import classes from "./Profile.module.css";
import ProfileDetail, { FetchedDataType } from "./ProfileOptions/ProfileDetail";
import ProfileHeader from "./ProfileHeader";
import ProfileOrders from "./ProfileOptions/ProfileOrders";

type ProfileProps = {
  data: any[];
};

const Profile: FC<ProfileProps> = ({}) => {
  // className={navData => navData.isActive ? classes.profile__active : ''}
  const [state, setState] = useState<number>(0);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const location = useLocation();
  const authContext = useContext(AuthContext);

  let link = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

  useEffect(() => {
    // if (authContext.token) {
      const fetchData = async () => {
        const response = await fetch(link, {
          method: "POST",
          body: JSON.stringify({ idToken: authContext.token }),
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Somethhing went wrong!");
        }
        // .then((response) => {
        //   return response.json();
        // })
        const responseData = await response.json();
        // .catch((error) => alert("Something has failed.!"))
        // .then((data) => {
        console.log(responseData.users);
        setData(responseData.users);
        // vyfiltrovat podle mailu ? :)map(filter()) vyuyit druhy usestate jako dependency v useefectu k fetchnuti dat
        // })
        // .catch((error) => {
        //   if (error) return;
        // });
        // };
      };
      fetchData().catch((error) => {
        setLoading(false);
        setError(error.message);
      });
    // }
  }, [authContext.token, link]);

  console.log(authContext.token);
  const displayHandler = (id: number) => {
    setState(id);
  };
  // udelat loading welcome ==> konec pakRoute state = 0 uvest

  return (
    <div className={classes.profile}>
      <ul className={classes.profile__container}>
        <ProfileHeader displayHandler={displayHandler} />
      </ul>
      {location.pathname === "/profile" && (
        <div className={classes.profile__entrance}>
          <h3>Welcome in your profile space.</h3>
          <p>
            You can customise your profile here, check your orders or ask our
            support your trickiest questions.
          </p>
        </div>
      )}
      {/* Moznost udelat display pres vyvolane id, who knows? */}
      {/* {!authContext.token ?  */}
      <Routes>
        <Route
          path="/personal_info"
          element={
            <>
              {authContext.token ? (
                data?.map((item: FetchedDataType, index: number) => (
                  <ProfileDetail key={index} data={item} profilePage={state} />
                ))
              ) : (
                <div style={{ position: "relative" }}>
                  <p
                    style={{ }}
                    className={`${classes.profile__error} Error`}>
                    You are not logged in. Consider to{" "}
                    <Link to="/authorization">do it.</Link>
                  </p>
                  <ProfileDetail profilePage={state} />
                </div>
              )}
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <div>
              {/* {data ? (
                data?.map((item: FetchedDataType, index: number) => (
                  <ProfileOrders key={index} data={item} profilePage={state} />
                ))
              ) : ( */}
              {/* profilePage={state} */}
              <ProfileOrders />
              {/* )} */}
            </div>
          }
        />
      </Routes>
      {/* Adding address, Mobile phone */}
      {/* Favourited items */}
      {/* Past Purchases */}
      {/* Password Change */}
      {/* Reklamace */}
      {/* Support */}
    </div>
  );
};

export default Profile;
