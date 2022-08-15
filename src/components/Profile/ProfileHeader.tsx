import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { PROFILE__DATA } from "../../Data/ProfileData";
import classes from "./ProfileHeader.module.css";

type ProfileHeaderProps = { displayHandler: (e: number) => void };

const ProfileHeader: FC<ProfileHeaderProps> = ({ displayHandler }) => {
  return (
    <div>
      <ul className={classes.profileheader}>
        {PROFILE__DATA.map((i,index) => (
          <li onClick={() => displayHandler(i.id)} key={index}>
            <NavLink
              className={(NavData) => {
                return NavData.isActive ? classes.profileheader__active : "";
              }}
              to={`/profile${i.link}`}>
              {i.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileHeader;
