import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface TBlogSlice {
  _id: string;
}

const InitialBlogSliceType: TBlogSlice = {
  _id: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState: InitialBlogSliceType,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
  },
});

export const { setId } = blogSlice.actions;
export const blogId = (state: RootState) => state.blog._id;

export default blogSlice.reducer;
