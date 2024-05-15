import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { toast } from "react-toastify";

export const addBusiness = createAsyncThunk(
  "appUser/addBusiness",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/company/add", data);
      console.log("response", response);
      toast.success("Business Added");
      window.location.href = "/login";
      return response.data;
    } catch (err) {
      console.log("err", err);
      toast.error(err.response.data.error);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBusinessInfo = createAsyncThunk(
  "appUser/getBusinessInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/company/business/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCompanyInfo = createAsyncThunk(
  "appUser/getCompanyInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/company/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPersonalInfo = createAsyncThunk(
  "appUser/getPersonalInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/company/personal/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCompanyInfo = createAsyncThunk(
  "appUser/updateCompanyInfo",
  async ({ companyId, data }, { rejectWithValue }) => {
    try {
      console.log("payload from store");
      console.log(data);
      const response = await api.put(`/company/update/${companyId}`, data);
      toast.success("Update Successful");
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const exportExcelInfo = createAsyncThunk(
  "appUser/exportExcelInfo",
  async ({ companyId, data }, { rejectWithValue }) => {
    try {
      console.log("payload from store");
      console.log(data);
      const response = await api.get("/business/excel");
      toast.success("Exported Successful");
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const deleteCompany = createAsyncThunk(
  "appUser/getPersonalInfo",
  async (deleteId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/company/delete/${deleteId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const appBusinessSlice = createSlice({
  name: "businessUser",
  initialState: {
    data: [],
    businessInfo: [],
    uploadData: [],
    companyData: [],
  },
  reducers: {
    setUploadData(state, action) {
      state.uploadData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBusiness.fulfilled, (state, action) => {
      state.data = action.payload; // Assuming the payload is the new company object
    });
    builder.addCase(addBusiness.rejected, (state, action) => {
      toast.error(action.payload);
    });
    builder.addCase(getBusinessInfo.fulfilled, (state, action) => {
      state.businessInfo = action.payload; // Assuming the payload is an array of business info objects
    });
    builder.addCase(getBusinessInfo.rejected, (state, action) => {
      toast.error(action.payload);
    });
    builder.addCase(getCompanyInfo.fulfilled, (state, action) => {
      state.companyData = action.payload; // Assuming the payload is an array of business info objects
    });
    builder.addCase(getCompanyInfo.rejected, (state, action) => {
      toast.error(action.payload);
    });
    builder.addCase(getPersonalInfo.fulfilled, (state, action) => {
      state.uploadData = action.payload; // Assuming the payload is an array of business info objects
    });
    builder.addCase(getPersonalInfo.rejected, (state, action) => {
      toast.error(action.payload);
    });
  },
});

export const { setUploadData } = appBusinessSlice.actions; // Ensure that setUploadData is exported

export default appBusinessSlice.reducer;
