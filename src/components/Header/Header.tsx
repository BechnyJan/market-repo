import React, {
  DetailedHTMLProps,
  Dispatch,
  FC,
  FormHTMLAttributes,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useMatch } from "react-router-dom";
import Input from "../../reusable-components/Input";
import { AuthContext } from "../../store/auth-context";
import { CartContext } from "../../store/cart-context";
import { DataType } from "../Products/Products";
import classes from "./Header.module.css";

type HeaderProps = {
  posts: DataType[];
  setSearchResults: Dispatch<SetStateAction<any[] | null>>;
};

const Header: FC<HeaderProps> = ({ posts, setSearchResults }) => {
  // const [search,setSearch] =
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [inputStr, setInputStr] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  //   const match = useMatch<ParamParseKey<Path>, string>();
  console.log(inputStr);
  // let ;
  let resultsArray: React.MutableRefObject<DataType[] | null> = useRef<
    DataType[] | null
  >([]);
  useEffect(() => {
    setTotalAmount(cartContext.amount);
  }, [cartContext.amount]);
  // console.log(totalAmount);

  const refreshHandler = () => {
    setInputStr("");
    displayArrayHandler();
    // resultsArray.current = posts; Not sure how to hande it at the moment
  };

  const changeHandler = (data: string) => {
    console.log(data);
  };

  const singoutHandler = () => {
    authContext.logout();
    cartContext.remove();
  };

  let dataArray: any[] = [];
  for (let i = 0; i < posts.length; i++) {
    // data.concat(...posts[i]);
    let toLowerCaseName = posts[i].name.toLowerCase();
    let toLowerCaseDescription = posts[i].description.toLowerCase();
    let toLowerCaseCompany = posts[i].company.toLowerCase();
    let object = {
      ...posts[i],
      description: toLowerCaseDescription,
      name: toLowerCaseName,
      company: toLowerCaseCompany,
    };
    // dataArray.push(array);
    dataArray.push(object);
    // console.log(object);
  }
  console.log(dataArray);

  const displayArrayHandler = () => {
    console.log(!!inputStr);

    resultsArray.current = dataArray.filter(
      (post) =>
        post.name.includes(inputStr) ||
        post.description.includes(inputStr) ||
        post.company.includes(inputStr)
    );
    console.log(resultsArray, "ahoj");

    setSearchResults(resultsArray.current);
    setShow(!!inputStr);
  };

  return (
    <>
      <div className={classes.header}>
        <Link to="/" className={classes.header__left}>
          <h2>Logo</h2>
        </Link>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            displayArrayHandler();
          }}
          className={classes.header__searchbar}>
          <Input
            name="search"
            type="text"
            state={inputStr}
            setState={setInputStr}
            className={classes.header__input}
          />
          {!show && (
            <button className={`${classes.header__show}`} type="submit">
              {"P"}
            </button>
          )}
          {/* Add Refresh Button To Filter */}
          {show && (
            <button className={classes.header__show} onClick={refreshHandler}>
              X
            </button>
          )}
        </form>
        <div className={classes.header__right}>
          {/* {authContext.isLoggedIn && ( */}
            <div className={`${classes.header__option}`}>
              <Link to="/profile">Profile</Link>
            </div>
          {/* )} */}
          <div className={classes.header__option}>
            <h4>{cartContext.amount ? `${totalAmount}$` : "0$"}</h4>
          </div>
          <div className={`${classes.header__cart} ${classes.header__option}`}>
            <Link to="/checkout">Cart</Link>
          </div>
          <div className={classes.header__option}>
            {/* <p>Hello, {!auth ? "guest" : "user??"}</p> */}
            {!authContext.isLoggedIn ? (
              <Link to={"/authorization"}>
                <div onClick={singoutHandler}>
                  {!authContext.isLoggedIn ? "Sign In" : "Sign Out"}
                </div>
              </Link>
            ) : (
              <div onClick={singoutHandler}>
                {!authContext.isLoggedIn ? "Sign In" : "Sign Out"}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
