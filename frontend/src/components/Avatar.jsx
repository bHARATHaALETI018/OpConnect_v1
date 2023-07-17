import React from "react";
import { string } from "prop-types";

const Avatar = (props) => {
  const getInitials = (name) => {
    if (name) {
      const initials = name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("");
      return initials.toUpperCase();
    }
    return "";
  };
  // Generate a random color for the avatar background
  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-purple-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div
      className={
        props.pic
          ? `flex items-center justify-center h-12 w-12 p-15 rounded-full`
          : `flex items-center justify-center h-12 w-12 p-15 rounded-full ${getRandomColor()}`
      }
    >
      <span className="text-white text-lg font-bold">
        {props.pic ? (
          <img
            src={props.pic}
            className="w-full h-full rounded-full"
            alt="Avatar"
          />
        ) : (
          getInitials(props.name)
        )}
      </span>
    </div>
  );
};

Avatar.propTypes = {
  name: string.isRequired,
};

export default Avatar;
