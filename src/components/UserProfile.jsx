import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { logOut } from "../features/auth/authSlice";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import {
  useGetPinSavedByUserMutation,
  useGetPinByUserMutation,
} from "../features/pin/pinApiSlice";
import { useLogOutApiMutation } from "../features/auth/authApiSlice";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(useSelector(selectCurrentUser));
  const [pins, setPins] = useState();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();
  const dispatch = useDispatch();

  const User = useSelector(selectCurrentUser);

  const [logOutApi] = useLogOutApiMutation();
  const [pinSaveByUser] = useGetPinSavedByUserMutation();
  const [pinByUser] = useGetPinByUserMutation();
  useEffect(() => {
    // const query = userQuery(userId);
    // client.fetch(query).then((data) => {
    //   setUser(data[0]);
    // });
  }, [userId]);

  useEffect(() => {
    console.log(user.id);
    if (text === "Created") {
      try {
        pinByUser({ userId: user.id }).then((response) => {
          console.log({ response });
          const pin = response.data;
          setPins(pin);
        });
        console.log({ pins });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        pinSaveByUser({ userId: user.id }).then((response) => {
          console.log({ response });

          const pin = response.data;
          setPins(pin);
        });
        console.log({ pins });
      } catch (error) {
        console.log(error);
      }
    }
  }, [text, user.id]);

  const logout = async () => {
    await logOutApi();
    dispatch(logOut());
    

    navigate("/login");
  };

  if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.avatarUrl}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user.username}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            <button
              type="button"
              className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
              onClick={logout}
              disabled={null}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>

        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
