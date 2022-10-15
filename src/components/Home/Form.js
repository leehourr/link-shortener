import React, { useRef, useState, Fragment } from "react";
import { getLink } from "../../api/api-call";
import Copy from "../../assets/copy.svg";
import Tick from "../../assets/tick.svg";
import Loader from "../../assets/loader.svg";
import Input from "../Ui/Input";
import { Button } from "../Ui/Button";

export const Form = (props) => {
  const input = useRef();
  const [disabledBtn, setDisableBtn] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isInvalid, setIsinvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const inputHandler = () => {
    const link = input.current.value;
    link !== "" ? setDisableBtn(true) : setDisableBtn(false);
    // link === "" ? setIsTouched(false) : <></>;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const link = input.current.value;
    validURL(link);
    setIsTouched(true);
    setTimeout(() => {
      setIsTouched(false);
    }, 2500);
    console.log(link);
    getShortLink();
  };

  let btnDisbale;
  disabledBtn
    ? (btnDisbale =
        "bg-cyan-500 shadow-lg shadow-cyan-400/50 group w-full flex justify-center py-4 px-5 border border-transparent text-lg font-medium rounded-md text-white hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400")
    : (btnDisbale =
        "cursor-not-allowed group disabled w-full flex justify-center py-4 px-5 border border-transparent text-lg font-medium rounded-md text-black bg-gray-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500");

  const validURL = (string) => {
    const pattern = new RegExp(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-]*)?\??(?:[-+=&;%@.\w]*)#?\w*)?)/gm
    );
    let isValidURL = !!pattern.test(string);
    if (!isValidURL) {
      setIsinvalid(true);
      setLoading(false);
      return;
    } else {
      setIsinvalid(false);
      setLoading(true);
    }
  };

  const getShortLink = async () => {
    const formatStr = input.current.value.toString().toLowerCase().trim();
    const shortenedLink = await getLink(formatStr);
    setLoading(false);
    setLink(shortenedLink);
    console.log(link);
  };

  const copyHandler = () => {
    if (link !== "") {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  };
  const errorMsg = isTouched && isInvalid;

  let loadingBtn;

  loading
    ? (loadingBtn = (
        <img
          src={Loader}
          className="animate-spin h-6 w-6 mx-auto"
          alt="loading ..."
        />
      ))
    : (loadingBtn = "Generate link");

  let isLink;
  if (link !== "" && !isInvalid) {
    isLink = link;
  } else {
    isLink = "copy to clipboard";
  }

  return (
    <Fragment>
      {errorMsg && (
        <div className="px-5 py-3 flex bg-red-200 items-center text-red-600 absolute w-full top-0 left-0 right-0 z-10 tran duration-75 animate-bounce ">
          {/* // <img  className="h-5 w-5 mr-2" /> */}
          Link is invalid!
        </div>
      )}
      {copied && (
        <div className="px-5 py-3 flex bg-cyan-400 items-center text-cyan-800 absolute w-full top-0 left-0 right-0 z-10 tran duration-75 animate-bounce ">
          <img src={Tick} className="h-5 w-5 mr-2" alt="copied" />
          Awesome! Your link has been copied.
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8">
          <h2 className="mt-6 text-left text-3xl font-extrabold text-cyan-400">
            Short URL Generator
          </h2>
          <p className="mt-2 text-left text-1xl text-gray-400">
            URL shortener built to generate short links that creates better
            click impression.
          </p>

          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={submitHandler}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <Input
                id="link-text"
                name="text"
                type="text"
                ref={input}
                autoComplete="text"
                required
                label="link text"
                //  value={link}
                onChange={inputHandler}
                className="appearance-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 text-base"
                placeholder="Paste your long link here"
              />
            </div>
            <Button type="submit" className={btnDisbale}>
              {loadingBtn}
            </Button>
          </form>
          <Button
            type="button"
            className="w-full bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 py-3 sm:px-6 border border-gray-200 rounded-sm flex flex-row items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200 hover:bg-green-50 hover:border-green-300"
            onClick={copyHandler}
          >
            <span className="text-gray-900">
              <span className="sm:inline text-gray-500 ">{isLink}</span>
            </span>
            <img src={Copy} className="h-5 w-5" alt="copy link" />
          </Button>
        </div>
      </div>
    </Fragment>
  );
};
