import React, { useState } from "react";
import "../css/Profile.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EditPhoto from "./EditPhoto";

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("https://via.placeholder.com/150");

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleUploadSuccess = (fileUrl) => {
    setProfilePicture(fileUrl);
    closeModal();
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h1>Profil Pengguna</h1>
        <div className="profile-details">
          <img src={profilePicture} alt="Profile" className="profile-picture" />

          <div className="profile-info">
            <p>
              <strong>Nama:</strong> Nama Pengguna
            </p>
            <p>
              <strong>Email:</strong> email@domain.com
            </p>
            <p>
              <strong>Alamat:</strong> Alamat Pengguna
            </p>
            <button className="edit-button" onClick={openModal}>
              Edit Profile
            </button>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>Edit Profil</h2>
              <form>
                <label>
                  Nama:
                  <input type="text" name="name" defaultValue="Nama Pengguna" />
                </label>
                <br />
                <label>
                  Email:
                  <input type="email" name="email" defaultValue="email@domain.com" />
                </label>
                <br />
                <label>
                  Alamat:
                  <input type="text" name="address" defaultValue="Alamat Pengguna" />
                </label>
                <br />
                <EditPhoto onUploadSuccess={handleUploadSuccess} />
                <button type="submit" className="edit-button">
                  Simpan Perubahan
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
