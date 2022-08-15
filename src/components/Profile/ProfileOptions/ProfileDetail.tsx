import React, { FC, FormEvent, useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import classes from "./ProfileDetail.module.css";
import { AuthContext } from "../../../store/auth-context";
import Input from "../../../reusable-components/Input";
import { API_KEY } from "../../../Data/api";

type ProfileDetailProps = {
  profilePage: number;
  data?: FetchedDataType;
};
export type FetchedDataType = {
  displayName: string;
  photoUrl: string;
  email: string;
};
const ProfileDetail: FC<ProfileDetailProps> = ({ profilePage, data }) => {
  // console.log(data);
  let recreateName = data?.displayName.split(" ");
  // console.log(recreateName, data);
  let empty: string[] = [];
  if (!recreateName) {
    empty = ["", ""];
  } else {
    empty = [recreateName[0], recreateName[1]];
  }

  let photoData: string = "";
  if (!data) {
    photoData = "";
  } else {
    photoData = data.photoUrl;
  }

  let email: string = "";
  if (!data) {
    email = "";
  } else {
    email = data.email;
  }
  // const location = useLocation();
  const authContext = useContext(AuthContext);
  // const [data, setData] = useState<{ [name: string]: any }>([]);
  const [response, setResponse] = useState<{ [data: string]: any }>([]);
  const [changedValueEmail, setChangedValueEmail] = useState<string | null>(
    email
  );

  const [changedLastName, setChangedLastName] = useState<string | null>(
    empty[0]
  );
  const [photo, setPhoto] = useState<string | null>(photoData);
  const [changedFirstName, setChangedFirstName] = useState<string | null>(
    empty[1]
  );
  const [changedPhone, setChangedPhone] = useState<string | null>("");

  let emailLink = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
  let updateLink = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

  let updatedData = { displayName: "", photoUrl: "" };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //  Validace vytvorit :)

    updatedData = {
      displayName: `${changedFirstName} ${changedLastName}`,
      photoUrl: photo || "",
    };

    console.log(updatedData);

    fetch(updateLink, {
      method: "POST",
      body: JSON.stringify({
        idToken: authContext.token,
        returnSecureToken: true,
        deleteAttribute: [],
        ...updatedData,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return new Error("Fuck we are screwed!");
        }
      })
      .catch((error) => alert("Something has failed.!"))
      .then((data) => {
        setResponse(data);
        console.log(data, response);
        // vyfiltrovat podle mailu ? :)map(filter())
      })
      .catch((error) => {
        if (error) return;
      });
    // setChangedFirstName('');
    // setChangedLastName('')

    // dat zpravu o tom, ze vse uspesne probehlo
  };

  // console.log(data[0]);
  // console.log(data[0]?.photoUrl);
  let check: string | null | undefined;
  // useEffect(() => {
  //   // if (location.pathname === "/profile/personal_info" && authContext?.email) {
  //   fetch(updateLink, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       idToken: authContext.token,
  //       returnSecureToken: true,
  //       deleteAttribute: [],
  //       ...updatedData,
  //     }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .catch((error) => alert("Something has failed.!"))
  //     .then((data) => {
  //       setData(data);
  //       console.log(data);
  //       // vyfiltrovat podle mailu ? :)map(filter())
  //     })
  //     .catch((error) => {
  //       if (error) return;
  //     });
  //   // }
  // }, [authContext.token, updateLink, updatedData]);
  // link, location.pathname, authContext.email, ;
  const fetchedName: string | null = response?.users;
  // console.log(fetchedName);

  return (
    <>
      <div className={classes.detail}>
        <div className={classes.detail__top}>
          <h2 className={classes.detail__header}>
            Hello, {authContext.isLoggedIn ? "Guest" : "Pepeg"}
          </h2>
          <p className={classes.detail__paragraph}>
            {authContext.isLoggedIn
              ? "These are your personal data."
              : "Your personal info would appear here."}
          </p>
        </div>
        {/* {isLoggedIn ? ( */}
        {/* <div></div> */}
        {/* ) : ( */}
        <div className={classes.detail__container}>
          <div className={classes.detail__heading}>
            <h4>{authContext.isLoggedIn ? "My" : "Your"} profile</h4>
          </div>
          <form onSubmit={submitHandler}>
            <div className={classes.detail__box}>
              <Input
                placeholder="Email"
                name="email"
                className={classes.detail__input}
                type="email"
                value={changedValueEmail}
                setState={setChangedValueEmail}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className={classes.detail__box}>
              <Input
                name="first"
                placeholder="First name"
                className={classes.detail__input}
                type="text"
                value={changedFirstName}
                setState={setChangedFirstName}
              />
              <label htmlFor="first">First name</label>
            </div>
            <div className={classes.detail__box}>
              <Input
                name="last"
                className={classes.detail__input}
                type="text"
                placeholder="Last name"
                value={changedLastName}
                setState={setChangedLastName}
              />
              <label htmlFor="last">Last name</label>
            </div>
            <div className={classes.detail__box}>
              <Input
                name="photo"
                placeholder="Photo"
                className={classes.detail__input}
                type="text"
                value={photo}
                setState={setPhoto}
              />
              <label htmlFor="photo">Photo</label>
            </div>
            <div className={classes.detail__box}>
              <Input
                name="phone"
                className={classes.detail__input}
                placeholder="Phone number"
                type="text"
                value={changedPhone}
                setState={setChangedPhone}
              />
              <label htmlFor="phone">Phone number</label>
            </div>
            <div className={classes.detail__button}>
              <button className={classes.detail__btn} type="submit">
                Save
              </button>
            </div>
          </form>
          {/* <img src={data.photoUrl} alt="" /> */}
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default ProfileDetail;
