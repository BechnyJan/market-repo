import React, {
  Dispatch,
  DispatchWithoutAction,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Input from "../../reusable-components/Input";
import { AuthContext } from "../../store/auth-context";
import classes from "./Auth.module.css";
import { API_KEY } from "../../Data/api";

type AuthTypeData = { email: string; password: string };
// export type TransferedData = { email: string; token: string };

const Auth = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [auth, setAuth] = useState<boolean>(true);
  const [error, setError] = useState<null | string | unknown>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //   useEffect(() => {
  //     console.log(authContext);
  //   }, [authContext]);

  const authHandler = () => {
    setAuth((prevState) => !prevState);
  };

  let link: string;
  //   console.log(password, email);
  const submitHandler = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    // if (email.trim().length < 14 ) {
    //   return;
    // }

    // if (password.length < 10) return;

    const authData: AuthTypeData = { email: email, password: password };
    if (!auth) {
      link = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }
    if (auth) {
      link = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    }
    let info: string;
    // fetch(link, {
    //   method: "POST",
    //   body: JSON.stringify({ ...authData, returnSecureToken: true }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   return ;

    // })
    // .then((data) => {
    //   // info = data;

    //   authContext.login(data?.idToken, data?.email);
    //   // console.log(authContext.token, data, info);
    // })
    // .catch((error) => {
    //   console.log(error);

    //   if (error) return;
    //   // if (error) return;
    // });
    const submitHandlerer = async () => {
      const response = await fetch(link, {
        method: "POST",
        body: JSON.stringify({ ...authData, returnSecureToken: true }),
        headers: { "Content-Type": "application/json" },
      });
      // .then((response) => {
      // {
      //             return response.json();
      //           } else

      if (!response.ok) {
        throw new Error("Somethng went wrong");
      }

      const data = await response.json();

      // })
      // .catch((error) => {
      //   console.log(error);

      //   setError(error.message);
      //   return;
      // })
      // .then((data) => {
      // setDataProfile(data.users);
      if (data) {
        const token = data?.idToken;
        const expirationTime = new Date(
          new Date().getTime() + +data?.expiresIn * 1000
        );
        console.log(expirationTime.toISOString());

        authContext.login(token, expirationTime.toISOString());
      }
      // vyfiltrovat podle mailu ? :)map(filter()) vyuyit druhy usestate jako dependency v useefectu k fetchnuti dat
      // })
      // .catch((error) => {
      //   setError(error);
      // });
    };

    submitHandlerer().catch((error) => {
      if (error) {
        console.log("ahoj");

        setError(error.message);
        setIsLoading(false);
      } else {
        navigate("/", { replace: true });
      }
    });

    // if (error) {
    // }
    // if (!error) {
    // }
    // console.log("ahoj", authContext);
  };

  let content;

  if (error) {
    content = <p className="Error">Thatssm</p>;
  }

  // console.log(error);

  return (
    <>
      {isLoading && (
        <p style={{ margin: "auto", color: "var(--white)" }}>
          Content is loading
        </p>
      )}
      {!isLoading && (
        <div className={classes.auth}>
          <form onSubmit={submitHandler} className={classes.auth__container}>
            <h2>{auth ? "Sign in" : "Sign up"}</h2>
            <label htmlFor="email">Email</label>
            <Input
              className={classes.auth__input}
              name={"email"}
              type="text"
              submit={true}
              state={email}
              setState={setEmail}
            />
            <label htmlFor="password">Password</label>
            <Input
              className={classes.auth__input}
              name={"password"}
              type="password"
              submit={true}
              state={password}
              setState={setPassword}
            />
            <button className={classes.auth__button} type="submit">
              {auth ? "Sign in" : "Sign up"}
            </button>
            <p className={classes.auth__info}>
              Dont you have an account?{" "}
              <span onClick={authHandler}> {auth ? "Sign-up" : "Sign-in"}</span>
              {/* do you have an account */}
            </p>
            {content}
          </form>
        </div>
      )}
    </>
  );
};

export default Auth;
