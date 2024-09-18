import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged, signInWithGooglePopup, signOut, db, doc, setDoc, getDoc } from '../config/firebase';
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    address: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          // User exists, display profile
          setUser(currentUser);
          setUserDetails(userSnapshot.data());
          setShowProfile(true);
        } else {
          // User does not exist, show form
          setUser(currentUser);
          setShowForm(true);
        }
      } else {
        // No user is logged in
        setUser(null);
        setShowProfile(false);
        setShowForm(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await signInWithGooglePopup();
      const user = response.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        // User exists, display profile
        setUser(user);
        setUserDetails(userSnapshot.data());
        setShowProfile(true);
        setShowForm(false);
      } else {
        // User does not exist, show form
        setUser(user);
        setShowForm(true);
        setShowProfile(false);
      }
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile); // Toggle showing profile
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        console.log('Saving user data:', formData);
        await setDoc(userDocRef, formData); // Save data with user UID as the document ID
        setUserDetails(formData);
        setShowForm(false); // Hide form after saving data
        setShowProfile(true); // Show profile after submission
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setUserDetails(null);
    setShowProfile(false);
    setShowForm(false);
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        {user ? (
          <>
            <button onClick={handleProfileClick}>
              {showProfile ? 'Hide Profile' : 'Profile'}
            </button>
            {showForm && (
              <>
                <h1>Complete Your Profile</h1>
                <form onSubmit={handleSubmit} className="loginsignup-fields">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="submit">Save Profile</button>
                </form>
              </>
            )}
            {showProfile && userDetails && (
              <div>
                <h1>Profile</h1>
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Phone Number:</strong> {userDetails.phone_number}</p>
                <p><strong>Address:</strong> {userDetails.address}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </>
        ) : (
          <button onClick={handleLogin}>Login with Google</button>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
