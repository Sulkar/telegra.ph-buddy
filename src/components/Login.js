import React, { useState, useContext } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { MyContext } from "./MyContext";
import axios from "axios";
import QrScannerVideo from "./QrScannerVideo";

export default function Login() {
  // Declare a new state variable, which we'll call "count"

  const [myValues, setMyValues] = useContext(MyContext);
  const [loginUrl, setLoginUrl] = useState("");

  var compStyle = {
    video: { maxWidth: "500px", marginBottom: "10px" },
    inputGroup: { maxWidth: "300px" },
    navbar: {
      borderRadius: "20px",
    },
    button: {
      margin: "2px",
    },
  };

  //let access_token =  "b968da509bb76866c35425099bc0989a5ec3b32997d55286c657e6994bbb";

  async function handleLogin() {
    const telegraphAccountInfo =
      "https://api.telegra.ph/getAccountInfo?access_token=";

    const telegraphFields = '&fields=["short_name","auth_url"]';
    const apiCallGetAccountInfo =
      telegraphAccountInfo + myValues.currentAccessToken + telegraphFields;

    axios
      .post(apiCallGetAccountInfo)
      .then(function (response) {
        console.log(response);
        if (response.data.ok) {
          console.log(response.data.result.auth_url);
          setLoginUrl(response.data.result.auth_url);
          setMyValues((oldValues) => ({ ...oldValues, loggedIn: true }));
          //redirect to logged in telegra.ph page in new tab/window
          window.open(response.data.result.auth_url, "_blank");
        } else {
          console.log(response.data.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleLoginLink() {
    setLoginUrl("");
  }

  function onInputchange(event) {
    setMyValues((oldValues) => ({
      ...oldValues,
      currentAccessToken: event.target.value,
    }));
  }

  return (
    <>
      <h2>Login </h2>
      <QrScannerVideo />

      <InputGroup className="mb-3" style={compStyle.inputGroup}>
        <FormControl
          placeholder="Access Token"
          aria-label="Access Token"
          aria-describedby="basic-addon2"
          value={myValues.currentAccessToken}
          onChange={onInputchange}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={() => handleLogin()}
        >
          get Login Link
        </Button>
      </InputGroup>
      {loginUrl !== "" ? (
        <a href={loginUrl} target="_blank" onClick={handleLoginLink}>
          Login to telegra.ph
        </a>
      ) : (
        ""
      )}
    </>
  );
}