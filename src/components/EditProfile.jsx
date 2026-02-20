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
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#0f172a] text-gray-200 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Form */}
          <div>
            <div className="mb-10">
              <h1 className="text-3xl font-semibold tracking-tight">
                Profile Settings
              </h1>
              <p className="text-sm text-gray-400 mt-2">
                Update your personal information and preview changes in
                real-time.
              </p>
            </div>

            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-8 space-y-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-gray-400 block mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-2">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-gray-400 block mb-2">
                    Age
                  </label>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-2">
                    Gender
                  </label>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-2">
                  About
                </label>
                <textarea
                  value={about}
                  rows="4"
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition resize-none"
                />
              </div>

              {error && (
                <div className="text-sm text-red-400 bg-red-900/20 border border-red-500/30 px-4 py-2 rounded-lg">
                  {error}
                </div>
              )}

              <button
                onClick={saveProfile}
                className="w-full bg-sky-600 hover:bg-sky-500 transition py-3 rounded-lg text-sm font-medium text-white"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Right - Preview */}
          <div>
            <h2 className="text-lg font-medium mb-6 text-gray-300">
              Live Preview
            </h2>

            <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 flex justify-center shadow-lg">
              <UserCard
                user={{ firstName, lastName, photoUrl, age, gender, about }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
          <div className="px-6 py-3 rounded-lg bg-[#1f2937] border border-sky-500 text-sky-400 text-sm font-medium shadow-lg">
            Profile updated successfully
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
