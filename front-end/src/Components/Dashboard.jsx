// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { updateDoc, collection, getDocs, where, query } from "firebase/firestore";
import { db, logout } from "../auth/firebase";
import { auth } from "../auth/firebase";
import axios from 'axios'

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState({
    name: "",
    favoriteAuthors: [],
    favoriteGenres: [],
  });
  const navigate = useNavigate();
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  const fetchUserData = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setUserData({
        name: data.name,
        favoriteAuthors: data.favoriteAuthors || [],
        favoriteGenres: data.favoriteGenres || [],
      });
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  const handleSavePreferences = async () => {

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("uid", "==", user?.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("User document not found!");
        return;
      }

      const doc = querySnapshot.docs[0];
      const existingAuthors = doc.data().favoriteAuthors || [];
      const existingGenres = doc.data().favoriteGenres || [];

      await updateDoc(doc.ref, {
        favoriteAuthors: [...existingAuthors, ...userData.favoriteAuthors],
        favoriteGenres: [...existingGenres, ...userData.favoriteGenres],
      });

      console.log("Data saved to the database successfully");

      const response = await axios.post("http://localhost:3001/api/user/preferences", userData);

      const recommendedBooksArray = response.data.recommendedBooks;
      setRecommendedBooks(recommendedBooksArray);
      alert("Preferences saved successfully!");
      console.log("Success");
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving preferences");
    }
  };


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserData();
  }, [user, loading]);

  console.log("user", userData)

  return (
    <div className="bg-black text-white">
      {/* <div className="">
        <Navbar name={userData.name} />
      </div> */}

      <div className="border border-red-500 h-screen p-20 flex flex-col ">
        <form className="flex flex-col">
          <label className="flex gap-3 ">
            Favorite Authors:
            <input
              type="text"
              value={userData.favoriteAuthors.join(",")}
              className="text-black  h-12 w-96 rounded-lg bg-white p-2"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  favoriteAuthors: e.target.value.split(","),
                })
              }
            />
          </label>
          <br />
          <label className="flex gap-3">
            Favorite Genres:
            <input
              type="text"
              value={userData.favoriteGenres.join(",")}
              className="text-black  h-12 w-96 rounded-lg bg-white p-2"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  favoriteGenres: e.target.value.split(","),
                })
              }
            />
          </label>
          <br />
          <button type="button" className='flex items-center justify-center bg-blue-500 text-black w-36 h-7 text-center rounded-lg' onClick={handleSavePreferences}>
            Save Preferences
          </button>

        </form>
        <div className="mt-2">
          <button onClick={logout} className="bg-red-600 flex items-center justify-center rounded-lg w-36 h-7">LOGOUT</button>
        </div>


        <div>
          {recommendedBooks.map((book, index) => (
            <div key={index}>
              <h3>{book.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
