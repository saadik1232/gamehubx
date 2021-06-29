import { Save } from "@material-ui/icons";
import React, {useState } from "react";
import "./Settings.css";
import axios from "axios";
import { Button, Modal} from "react-bootstrap";

function Settings({ width }) {
  const [state, setState] = React.useState({
    username: "",
    email: "",
    phoneext: "",
    phone: "",
    currntpass: "",
    pass: "12",
    confpass: "",
    cross: "/icons/tick.png",
    btnstate: "true",
  });

  const [cross, setcross] = useState("/icons/cancel.png");
  
  const [show, setShow] = useState(false);
  const [modaltext, setmodaltext] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [curntpass, setcurntpass] = useState("");
  const [pass, setpass] = useState("");
  const [conpass, setconpass] = useState("");

  async function usersave() {
    console.log("userbutton working");
    
    var tok = localStorage.getItem("token");
    var id = localStorage.getItem("userdata");
    const headers = {
      "Authorization": "Token "+tok,
      "Content-Type": "application/json;charset=UTF-8",
    };
    var data = JSON.stringify({
        "username": state.username
      });
    await axios
      .patch("https://gamehubx.com/api/v1/user-profile/" + id + "/", data, {
        headers: headers,
      })
      .then((response) => {
        setmodaltext("successfully changed username")
        setShow(true)
        // alert("successfully changed username")
        // console.log(response);
      })
      .catch((error) => {
        setmodaltext("couldn't change password")
        setShow(true)
        // console.log(error);
        // alert("unable to change username")
      });
  }

  async function emailsave() {
    console.log("userbutton working");
    var tok = localStorage.getItem("token");
    var id = localStorage.getItem("userdata");
  const headers = {
      "Authorization": "Token "+tok,
      "Content-Type": "application/json;charset=UTF-8",
    };
    var data = JSON.stringify({
        "email": state.email
      });
    await axios
      .patch("https://gamehubx.com/api/v1/user-profile/" + id + "/", data, {
        headers: headers,
      })
      .then((response) => {
        alert("successfully changed email")
        console.log(response);
      })
      .catch((error) => {
        alert("unable to change email")
        console.log(error);
      });
  }

  async function phonesave() {
    console.log("userbutton working");
    var tok = localStorage.getItem("token");
    var id = localStorage.getItem("userdata");
  const headers = {
      "Authorization": "Token "+tok,
      "Content-Type": "application/json;charset=UTF-8",
    };
    var data = JSON.stringify({
        "phone_number": state.phoneext+state.phone
      });
    await axios
      .patch("https://gamehubx.com/api/v1/user-profile/" + id + "/", data, {
        headers: headers,
      })
      .then((response) => {
        setmodaltext("successfully changed phone")
        setShow(true)
      })
      .catch((error) => {
        setmodaltext("unable to change phone")
        setShow(true)
      });
  }

  async function savepass(){
    console.log("change pass btn",curntpass ,pass, conpass);
    var tok = localStorage.getItem("token");
    var id = localStorage.getItem("userdata");
  const headers = {
      "Authorization": "Token "+tok,
      "Content-Type": "application/json",
    };
    var data = JSON.stringify({
      "old_password": state.currntpass,
      "new_password1": state.pass,
      "new_password2": state.confpass
    });
    // await axios
    //   .post("https://gamehubx.com/api/v1/auth/password/change/",data , {
    //     headers: headers,
    //   })
    //   .then((response) => {
    //     setmodaltext("successfully changed password")
    //     setShow(true)
    //   })
    //   .catch((error) => {
    //     setmodaltext("couldn't changed password")
    //     setShow(true)
    //   });

      await axios({
        method: "post",
        url: "https://gamehubx.com/api/v1/auth/password/change/",
        headers: headers,
        data: {
          old_password: curntpass,
          new_password1: pass,
          new_password2: conpass
        },
      })
        .then((response) => {
          setmodaltext("successfully changed password")
          setShow(true)
        })
        .catch((error) => {
          setmodaltext("couldn't changed password")
          setShow(true)
        });
  }

  //   useEffect(() => {
  //     console.log(state);
  //   }, [state.pass]);

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
    console.log(state);
  }

  React.useEffect(
    function effectFunction() {
      console.log("in use effect pass",pass);
      //var pass = state.pass;
      // eslint-disable-next-line
      var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,32}$/;
      // eslint-disable-next-line
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      //console.log("length of pass", pass.length);
      var test = reg.test(pass);

      if (pass !== undefined) {
        if (test & format.test(pass) & (pass.length > 9)) {
          console.log("contains symbol and length of pass",pass.length);
          setState({ btnstate: false });
          setcross("/icons/tick.png");
          console.log("pass3");
        } else {
          console.log("fail3");
          setState({ cross: "/icons/cancel.png" });
          setState({ btnstate: true });
          setcross("/icons/cancel.png");
        }
      }

      if (pass !== undefined) {
        if (pass.length < 5) {
          setState({ passstate: "weak" });
        }
        if ((pass.length >= 5) & (pass.length < 10)) {
          setState({ passstate: "medium" });
        }
        if (pass.length >= 10) {
          setState({ passstate: "Strong" });
        }
      }
    },
    [pass]
  );

  function handleChange2(evt) {
    const value = evt.target.value;
    setcurntpass(value)
  }

  function handleChange3(evt) {
    const value = evt.target.value;
    setpass(value)
  }

  function handleChange4(evt) {
    const value = evt.target.value;
    setconpass(value)
  }

  return (
    <div className="settings-cont">
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>{modaltext}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
            </Modal>
      <div className="title">ACCOUNT SETTINGS</div>
      <div className="settings-sec">
        <form className="setting-form">
          <div className="subtitle">ACCOUNT INFO</div>
          <div
            className="flex"
            style={
              width < "800" ? { alignItems: "unset" } : { alignItems: "center" }
            }
          >
            <div className="col">
              <label className="label">Username</label>
              <div
                className="flex"
                style={
                  width < "800"
                    ? { flexDirection: "row", alignItems: "center" }
                    : null
                }
              >
                <input
                  placeholder="Username"
                  name="username"
                  value={state.username}
                  onChange={handleChange}
                  className="input"
                  style={width < "800" ? { width: "80vw" } : null}
                ></input>
                <Save
                  onClick={() => usersave()}
                  style={
                    width < "800"
                      ? { marginRight: "0px", color: "white" }
                      : { color: "white", marginRight: "10px" }
                  }
                ></Save>
              </div>
            </div>
            <div className="col">
              <label className="label">Email</label>
              <div
                className="flex"
                style={
                  width < "800"
                    ? { flexDirection: "row", alignItems: "center" }
                    : null
                }
              >
                <input
                  className="input"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  placeholder="email"
                  style={width < "800" ? { width: "80vw" } : null}
                ></input>
                <Save   style={{ color: "white" }}
                onClick={() => emailsave()}
                ></Save>
              </div>
            </div>
          </div>
          <div className="col">
            <label className="label">Phone Number</label>
            <div
              className="flex"
              style={
                width < "800"
                  ? { flexDirection: "row", alignItems: "center" }
                  : null
              }
            >
              <input
                className="input"
                type="tel"
                placeholder="+1"
                name="phoneext"
                value={state.phoneext}
                onChange={handleChange}
                style={
                  width < "800"
                    ? {
                        width: "10vw",
                        marginRight: "0px",
                        borderRight: "1px solid white",
                      }
                    : {
                        width: "10%",
                        marginRight: "0px",
                        borderRight: "1px solid white",
                      }
                }
              ></input>
              <input
                className="input"
                type="tel"
                name="phone"
                value={state.phone}
                onChange={handleChange}
                placeholder="e.g. 1324568974555"
                style={width < "800" ? { width: "70vw" } : null}
              ></input>
              {width > "800" ? (
                <div className="btn" onClick={() => phonesave()}>Save Phone</div>
              ) : (
                <Save style={{ color: "white" }}></Save>
              )}
            </div>
          </div>
          <hr className="hr"></hr>
          <div className="subtitle">CHANGE PASSWORD</div>
          <div
            className="flex"
            style={{ alignItems: "flex-start", marginTop: "10px" }}
          >
            <input
              className="input"
              type="password"
              name="currntpass"
              value={curntpass}
              onChange={handleChange2}
              placeholder="current Password"
              style={width > "800" ? { width: "25%" } : null}
            ></input>
            <div className="col">
              <input
                className="input"
                type="password"
                placeholder="Create Password"
                name="pass"
                value={pass}
                onChange={handleChange3}
                style={width > "800" ? { width: "98%" } : null}
              ></input>
              {cross !== undefined && (
                <div className="issues">
                  <div className="warning">
                    <img src={cross} alt="cancel"></img>
                    <div style={{ marginLeft: "10px" }}>10 characters</div>
                  </div>
                  <div className="warning">
                    <img src={cross} alt="cancel"></img>
                    <div style={{ marginLeft: "10px" }}>Upper Case</div>
                  </div>
                  <div className="warning">
                    <img src={cross} alt="cancel"></img>
                    <div style={{ marginLeft: "10px" }}>Lower Case</div>
                  </div>
                  <div className="warning">
                    <img src={cross} alt="cancel"></img>
                    <div style={{ marginLeft: "10px" }}>Numbers</div>
                  </div>
                  <div className="warning">
                    <img src={cross} alt="cancel"></img>
                    <div style={{ marginLeft: "10px" }}>Symbols</div>
                  </div>
                </div>
              )}
              
            </div>
            <input
              className="input"
              type="password"
              name="confpass"
              value={conpass}
              onChange={handleChange4}
              placeholder="confirm Password"
              style={width > "800" ? { width: "25%" } : null}
            ></input>
            <div className="btn" onClick={() => savepass()}>Change Password</div>
          </div>
          <hr></hr>
          <div className="subtitle" style={{ marginTop: "15px" }}>
            LOCATION
          </div>
          <div className="flex">
            <div className="col">
              <label className="label">Area</label>
              <select className="input">
                <option value="Eastern">Eastern</option>
              </select>
            </div>
            <div className="col">
              <label className="label">Region</label>
              <input className="input"></input>
            </div>
            {width > "800" ? (
              <div className="btn">Change Timezone</div>
            ) : (
              <div className="save-btn">Save</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
