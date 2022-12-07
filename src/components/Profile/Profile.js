import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  FormControl,
  Image,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "../../hooks/useAuth";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MyPhotos from "../MyPhotos/MyPhotos";
import avatarImage from "../../images/avatar.png";
import MyProfile from "../MyProfile/MyProfile";

const Profile = () => {
  const { logout, user, deleteUserAccount } = useAuth();

  const [avatar, setAvatar] = useState(null);
  const [success, setSuccess] = React.useState("no");
  const [load, setLoad] = React.useState(false);
  const [profile, setProfile] = useState({});
  const [image, setImage] = useState([]);
  const [disabled, setDisabled] = useState(true);

  React.useEffect(() => {
    fetch(`https://photo-album-server.up.railway.app/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });
  }, []);

  React.useEffect(() => {
    fetch(`https://photo-album-server.up.railway.app/image/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      });
  }, []);

  const handleUpload = (e) => {
    const email = user.email;

    if (avatar) {
      setLoad(true);
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("email", email);

      fetch("https://photo-album-server.up.railway.app/users", {
        method: "PUT",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setSuccess("yes");
          setLoad(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setSuccess("no");
      setLoad(false);
    }
  };

  const handleDeleteUser = (id) => {
    console.log(disabled);

    if (!disabled) {
      image.map((item) => {
        fetch(`https://photo-album-server.up.railway.app/image/${item._id}`, {
          method: "DELETE",
        }).then((res) => res.json());
      });

      fetch(`https://photo-album-server.up.railway.app/users/${id}`, {
        method: "DELETE",
      }).then((res) => res.json());

      deleteUserAccount();

      if (user.email) {
        deleteUserAccount();
      } else {
        window.location.reload();
      }
    }
  };

  const handleSetAvatar = (e) => {
    setAvatar(e);
  };

  return (
    <Container className="my-5 py-5">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col lg={3} className="mb-3">
            <Card className="p-3 shadow" style={{ border: "none" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {profile?.avatar ? (
                  <Image
                    style={{ height: "100px", width: "100px" }}
                    roundedCircle
                    src={`data:image/png;base64,${profile.avatar}`}
                    alt=""
                  />
                ) : (
                  <Image
                    style={{ height: "100px", width: "100px" }}
                    roundedCircle
                    src={avatarImage}
                    alt=""
                  />
                )}
              </div>

              <Nav variant="pills" className="flex-column my-2">
                <Nav.Item className="my-3">
                  <Nav.Link eventKey="first">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      <div>
                        <PersonIcon />
                      </div>
                      <div style={{ marginLeft: "50px" }}>My Profile</div>
                    </div>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item className="mb-3">
                  <Nav.Link eventKey="second">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      <div>
                        <PhotoLibraryIcon />
                      </div>
                      <div style={{ marginLeft: "50px" }}>My Photo</div>
                    </div>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link onClick={logout}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      <div>
                        <LogoutIcon />
                      </div>
                      <div style={{ marginLeft: "50px" }}>Logout</div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card>
          </Col>
          <Col lg={9}>
            <Card className="p-3 shadow" style={{ border: "none" }}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <MyProfile
                    avatar={avatar}
                    success={success}
                    load={load}
                    profile={profile}
                    handleUpload={handleUpload}
                    handleSetAvatar={handleSetAvatar}
                    handleDeleteUser={handleDeleteUser}
                    disabled={disabled}
                    setDisabled={setDisabled}
                  ></MyProfile>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <MyPhotos></MyPhotos>
                </Tab.Pane>
              </Tab.Content>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Profile;
