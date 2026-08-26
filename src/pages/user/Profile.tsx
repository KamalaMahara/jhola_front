import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMyProfile, updateProfile } from "../../store/authSlice";
import Navbar from "../../globals/types/components/Navbar/navbar";
import { User, Mail, Camera, Save, X, Calendar } from "lucide-react";
import { Status } from "../../globals/types/types";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
      if (user.profileImageUrl) {
        setPreviewImage(`http://localhost:8000/${user.profileImageUrl}`);
      }
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    if (imageFile) {
      data.append("profileImage", imageFile);
    }

    try {
      // unwrap is not available if not returning promise from createAsyncThunk, 
      // but since we dispatch manually, we just await it.
      await dispatch(updateProfile(data));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      username: user.username || "",
      email: user.email || "",
    });
    setImageFile(null);
    setPreviewImage(user.profileImageUrl ? `http://localhost:8000/${user.profileImageUrl}` : null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#111827] text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="bg-[#1F2937] rounded-3xl p-8 shadow-2xl border border-gray-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-6">
              <h1 className="text-3xl font-bold text-white">My Profile</h1>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#F59E0B] text-gray-900 px-6 py-2 rounded-xl font-semibold hover:bg-amber-400 transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={status === Status.LOADING}
                    className="flex items-center gap-2 bg-[#F59E0B] text-gray-900 px-4 py-2 rounded-xl font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" /> {status === Status.LOADING ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-12">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-700 bg-gray-800 flex items-center justify-center">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-20 h-20 text-gray-500" />
                    )}
                  </div>
                  
                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-2 bg-[#F59E0B] text-gray-900 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="text-center">
                  <span className="px-4 py-1.5 bg-gray-800 border border-gray-700 rounded-full text-sm font-medium text-amber-500 uppercase tracking-wider">
                    {user.role || 'customer'}
                  </span>
                </div>
              </div>

              {/* Form Section */}
              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent disabled:opacity-70 disabled:bg-gray-800/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent disabled:opacity-70 disabled:bg-gray-800/50 transition-all"
                    />
                  </div>
                </div>

                {!isEditing && user.createdAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Joined Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        value={new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        disabled
                        className="block w-full pl-11 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-400 cursor-not-allowed"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
