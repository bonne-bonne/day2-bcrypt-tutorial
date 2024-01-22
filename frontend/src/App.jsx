import { useState } from "react";
import "./App.css";

function App() {
  const [emailLogin, setEmailLogin] = useState(); // stores the text from the email input box on change
  const [passwordLogin, setPasswordLogin] = useState(); // stores the text from the password input box on change
  const [messageToRender, setMessageToRender] = useState(); // this will store the success or failure message and display it on the page

  function handleLogin(e) {
    e.preventDefault();

    fetch(`http://localhost:4000/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailLogin, password: passwordLogin }),
    }).then((res) => {
      if (res.status === 200) {
        console.log("success");
        const message = <span>Hacked the system!!</span>;
        setMessageToRender(message);
      } else if (res.status === 404) {
        console.log("failed");
        const message = <span>User not found!</span>;
        setMessageToRender(message);
        throw new Error(`No user was found with those details, check your email and password are correct`)
      }
    })
    .catch((err) => console.log(err)) 
  }

  function handleSignup(event) {
    event.preventDefault();
    console.log("signup");
  }

  function handleChange(event) {
    console.log(event.target.name);

    if (event.target.name === "email") {
      setEmailLogin(event.target.value); // If the email text box onChange triggered this event save the value of that text box into the emailLogin state
    } else if (event.target.name === "password") {
      setPasswordLogin(event.target.value); // If the password text box onChange triggered this event save the value of that text box into the passwordLogin state
    }
  }

  return (
    <div className="App">
      <h1>Login Form</h1>

      <form>
        <label>Email:</label>
        <input type="email" className="textbox" name="email" onChange={handleChange} />
        <br />

        <label>Password:</label>
        <input type="password" className="textbox" name="password" onChange={handleChange} />
        <br />

        {/* This will display on the page when a status code is received from the backend */}
        {messageToRender}
        <br />

        <button name="login" type="submit" onClick={handleLogin}>Login</button>
        <br />
        <button name="signup" type="submit" onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
}

export default App;
