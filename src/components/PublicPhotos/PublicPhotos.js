import React from "react";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import PublicPhoto from "../PublicPhoto/PublicPhoto";
import HomeSkeleton from "../HomeSkeleton/HomeSkeleton";

const PublicPhotos = () => {
  const [publicPhoto, setPublicPhoto] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetch("https://photo-album-server.up.railway.app/image")
      .then((res) => res.json())
      .then((data) => {
        setPublicPhoto(data);
        if (data) {
          setLoad(false);
        }
      });
  }, []);

  return (
    <div>
      <div>
        <Container
          maxWidth="sm"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          {load ? (
            <div>
              <HomeSkeleton /> <HomeSkeleton />
            </div>
          ) : (
            <div>
              {publicPhoto.reverse().map((photo) => (
                <PublicPhoto key={photo._id} photo={photo}></PublicPhoto>
              ))}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default PublicPhotos;
