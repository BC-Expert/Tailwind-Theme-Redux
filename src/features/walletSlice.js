import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
  name: 'WalletInfo',
  initialState: {
    walletAddr:'',
    balance:'',
    walletChange:false,
  },
  reducers: {
    inputAddr :(state, action) =>{
      state.walletAddr = action.payload;
    },
    setBalance:(state, action)=>{
      console.log("state",state,"action:",action)
      state.balance = action.payload;
    },
    walletChange:(state, action) =>{
      console.log("state:",state, "action:",action);
      if (state.walletChange){state.walletChange = false}
      else {state.walletChange = true}
    }
  },
})

// Action creators are generated for each case reducer function
export const { inputAddr,walletChange,setBalance } = walletSlice.actions

export default walletSlice.reducer