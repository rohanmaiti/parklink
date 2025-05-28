6import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set)=>{

    return {
        authUser : null,
        isSigningUp : false,
        isLoggingIng : false,
        isUpdatingProfile:false,
        isCheckingAuth : true,

        hasParkingSlot:undefined,
        

        // CHECKING AUTH
        checkAuth : async()=>{
            try {
                const res = await axiosInstance.get("/auth/check");
                set({authUser:res.data});
            } catch (error) {
                console.log("Error in checkAuth ", error.message);
                set({authUser:null});
            }
            finally{
                set({isCheckingAuth:false})
            }
        },

        // HANDLING SIGNUP
        signup: async(data, navigate)=>{
          // alert("useAuthStore, "+JSON.stringify(data));
         try {
            set({ isSigningUp: true });
            const res = await axiosInstance.post("/auth/signup", data);
            // alert(JSON.stringify(res.data));
            set({ authUser: res.data });
            toast.success("Account created successfully");
            navigate("/");
          } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
          } finally {
            set({ isSigningUp: false });
          }
        },

        // HANDLING LOGIN
        login: async (data , navigate)=>{
            try { 
              set({isLoggingIng : true})
              const res = await axiosInstance.post("/auth/login",data);
              set({ authUser: res.data });
              toast.success("Logged in successfully");
              navigate("/");
            } catch (error) {
              toast.error(error.response.data.message);
            }
            finally{
              set({isLoggingIng : false})
            }
        },
      
        // HANDLING LOGOUT
        logout: async () => {
            try {
              await axiosInstance.post("/auth/logout");
              set({ authUser: null });
              toast.success("Logged out successfully");
            } catch (error) {
              toast.error(error.response.data.message);
            }
          },


        // HANDLING UPDATE PROFILE
        updateProfile: async (data) => {
          set({ isUpdatingProfile: true });
          try {
            console.log(data);
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
          } catch (error) {
            console.log("error in update profile:", error);
            toast.error("error in update profile:");
          } finally {
            set({ isUpdatingProfile: false });
          }
        },  

        // CHECKING PARKING STATUS
    checkParkingStatus: async (name) => {
    try {
      const data = {name : name};
      const res = await axiosInstance.post('/parking/status',data);
      console.log("checkParkingStatus", res);
      if(res.data.active){
        set({hasParkingSlot:name});
      }
      return res.data;
    } catch (error) {
      console.error('Error checking parking status:', error);
      return { active: false };
    }
    },

    // setting parking stol alocated
    setParkingSlot : async (name) => {
      set({hasParkingSlot:name});
    }
    }
})
