import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { toast } from "react-toastify";

export const addLead = createAsyncThunk(
  "appLead/addLead",
  async (data, { rejectWithValue }) => {
    try {
      const respone = await api.post("/lead/add", data);
      toast.success("Leaded Added SuccessFully");
      return respone.data;
    } catch (error) {
      console.log("err", error);
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLead = createAsyncThunk(
  "appLead/getLead",
  async ({ date, role, username }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/lead/bydate?date=${date}&role=${role}&username=${username}`
      );
      return response.data;
    } catch (error) {
      console.log("err", error);
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllLead = createAsyncThunk(
  "appLead/getAllLead",
  async ({ role, username }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/lead?role=${role}&username=${username}`);
      return response.data;
    } catch (error) {
      console.log("err", error);
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getWinnerLead = createAsyncThunk(
  "appLead/getWinnerLead",
  async ({ role, username }, { rejectWithValue }) => {
    try {
      const respone = await api.get(
        `/lead/winner-lead?role=${role}&username=${username}`
      );
      return respone.data;
    } catch (error) {
      console.log("err", error);
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLead = createAsyncThunk(
  "appLead/UpdateLead",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/lead/${id}`, data); // Assuming you want to use PUT method for updating
      toast.success("Lead Updated Successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLead = createAsyncThunk(
  "appLead/DeleteLead",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/lead/${id}`, data);
      toast.success("Lead Deleted Successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addChat = createAsyncThunk(
  "appLead/addChat",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/lead/${id}/add-chat`, data);
      toast.success("Lead Update Successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getByFollowUp = createAsyncThunk(
  "appLead/getByFollowUp",
  async ({ role, username }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/lead/byfollowup?followUp=true&role=${role}&username=${username}`
      );
      // toast.success("Lead Update Successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const appLeadSlice = createSlice({
  name: "businessLead",
  initialState: {
    data: [],
    leadData: [],
    leadAllData: [],
    leadWinData: [],
    updateData: [],
    newChat: [],
    followUp: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addLead.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(addLead.rejected, (state, action) => {
      toast.error(action.payload);
    });
    builder.addCase(getLead.fulfilled, (state, action) => {
      state.leadData = action.payload;
    });
    builder.addCase(getLead.rejected, (state, action) => {
      toast.error(action.payload);
    });
    builder.addCase(getAllLead.fulfilled, (state, action) => {
      state.leadAllData = action.payload;
    });
    builder.addCase(getAllLead.rejected, (state, action) => {
      toast.error(action.payload);
    });
    builder.addCase(getWinnerLead.fulfilled, (state, action) => {
      state.leadWinData = action.payload;
    });
    builder.addCase(getWinnerLead.rejected, (state, action) => {
      toast.error(action.payload);
    });
    builder.addCase(updateLead.fulfilled, (state, action) => {
      state.updateData = action.payload;
    });
    builder.addCase(updateLead.rejected, (state, action) => {
      toast.error(action.payload);
    });
    builder.addCase(addChat.fulfilled, (state, action) => {
      state.newChat = action.payload;
    });
    builder.addCase(addChat.rejected, (state, action) => {
      toast.error(action.payload);
    });
    builder.addCase(getByFollowUp.fulfilled, (state, action) => {
      state.followUp = action.payload;
    });
    builder.addCase(getByFollowUp.rejected, (state, action) => {
      toast.error(action.payload);
    });
  },
});
