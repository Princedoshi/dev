// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";

const Navbar = ({name}) => {
  const [user] = useAuthState(auth);
  console.log(user)

  return (
    <nav className="border-2 border-red-600">
      <ul className="flex">
        <li>
          {user && (
            <>
              <span className="">{name}</span>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
