import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Side - Edit Form */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Edit Your Profile ✨
            </h2>

            <div className="space-y-5">
              {/* First Name */}
              <input
                type="text"
                value={firstName}
                placeholder="First Name"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 
              border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setFirstName(e.target.value)}
              />

              {/* Last Name */}
              <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 
              border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setLastName(e.target.value)}
              />

              {/* Photo URL */}
              <input
                type="text"
                value={photoUrl}
                placeholder="Photo URL"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 
              border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />

              {/* Age + Gender Row */}
              <div className="flex gap-4">
                <input
                  type="text"
                  value={age}
                  placeholder="Age"
                  className="w-1/2 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 
                border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  onChange={(e) => setAge(e.target.value)}
                />

                <input
                  type="text"
                  value={gender}
                  placeholder="Gender"
                  className="w-1/2 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 
                border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>

              {/* About */}
              <textarea
                value={about}
                placeholder="Write something about yourself..."
                rows="3"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 
              border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                onChange={(e) => setAbout(e.target.value)}
              />

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm font-medium text-center">
                  {error}
                </p>
              )}

              {/* Save Button */}
              <button
                onClick={saveProfile}
                className="w-full py-3 rounded-xl font-semibold text-lg text-white 
              bg-indigo-500 hover:bg-indigo-600 transition duration-300 
              shadow-lg hover:shadow-indigo-500/50"
              >
                Save Profile 🚀
              </button>
            </div>
          </div>

          {/* Right Side - Live Preview */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <h2 className="text-xl font-semibold text-gray-300 mb-4 text-center">
                Live Preview 👇
              </h2>

              <UserCard
                user={{ firstName, lastName, photoUrl, age, gender, about }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="px-6 py-3 rounded-xl bg-green-500 text-white font-semibold shadow-xl">
            ✅ Profile saved successfully!
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
