import axiosInstance from "../../app/axios";

export const loginApi = async (data) => {
    const response = await axiosInstance.post("/auth/login", data)
    return response.data.data;
};

export const registerApi = async (data) => {
    const response = await axiosInstance.post("/auth/register", data)
    return response.data.data;
};

export const refreshApi = async () => {
  const response = await axiosInstance.post("/auth/refresh");
  return response.data.data;
};

export const logoutApi = async () => {
    const response = await axiosInstance.post("/auth/logout")
    return response.data.data;
}