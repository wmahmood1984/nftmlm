import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { erc20abi, erc20Add, mlmabi, mlmcontractaddress, web3 } from "../config";

// Init thunk: create contract and save in state
export const init = createAsyncThunk("contract/init", async (_, thunkApi) => {
  try {
    const rContract = new web3.eth.Contract(mlmabi, mlmcontractaddress);
    const uContract = new web3.eth.Contract(erc20abi, erc20Add);

    thunkApi.dispatch(setContract(rContract));
    thunkApi.dispatch(setUSDTContract(uContract));

    return rContract;
  } catch (err) {
    console.error("❌ [init] Error initializing contracts:", err);
    throw new Error(`Init failed: ${err.message}`);
  }
});

// Read contract name + user data
export const readName = createAsyncThunk(
  "contract/readName",
  async (a, thunkApi) => {
    const state = thunkApi.getState();
    const contract = state.contract.contract;
    const uContract = state.contract.usdtContract;

    if (!contract) throw new Error("Contract not initialized");

    try {
      const safeCall = async (label, fn) => {
        try {
          return await fn();
        } catch (err) {
          console.error(`❌ [readName:${label}] Error:`, err);
          throw new Error(`Failed at ${label}: ${err.message}`);
        }
      };

      const name = await safeCall("name", () => contract.methods.name().call());
      const nfts = await safeCall("getNFTs", () => contract.methods.getNFTs().call());
      const packages = await safeCall("getPackages", () => contract.methods.getPackages().call());
      const admin = await safeCall("admin", () => contract.methods.owner().call());
      const NFTque = await safeCall("getNFTque", () => contract.methods.getNFTque().call());
      const registered = await safeCall("userRegistered", () => contract.methods.userRegistered(a.address).call());
      
      const NFTMayBeCreated = await safeCall("NFTMayBeCreated", () => contract.methods.NFTMayBeCreated().call());
      const nextTokenId = await safeCall("_nextTokenId", () => contract.methods._nextTokenId().call());
      const nftused = await safeCall("nftused(0)", () => contract.methods.getNFTused().call());
   

      let Package = null;
      let uplines = [];
      let downlines = null;
      let allowance = 0;
      let directReferrals = [];
      let limitUtilized = 0;
      let myNFTs = [];
      let NFTQueBalance=0

      if (a.address && registered) {
        Package = await safeCall("userPackage", () => contract.methods.userPackage(a.address).call());
        uplines = await safeCall("getUplines", () => contract.methods.getUplines(a.address).call());
        downlines = await safeCall("getDownlines", () => contract.methods.getUser(a.address).call());
        allowance = await safeCall("allowance", () => uContract.methods.allowance(a.address, mlmcontractaddress).call());
  //      directReferrals = await safeCall("getDirectReferrals", () => contract.methods.getDirectReferrals(a.address).call());
        limitUtilized = await safeCall("userLimitUtilized", () => contract.methods.userLimitUtilized(a.address).call());
        myNFTs = await safeCall("getNFTs(address)", () => contract.methods.getNFTs(a.address).call());
        NFTQueBalance = await safeCall("NFTQueBalance", () => contract.methods.NFTQueBalance(a.address).call());
      
      }
      
  

      console.log("✅ [readName] All calls succeeded",downlines);

      return {
        name,
        nfts,
        Package,
        packages,
        uplines,
        downlines,
        registered,
        admin,
        allowance,
        directReferrals,
        limitUtilized,
        NFTque,
        NFTQueBalance,
        myNFTs,
        NFTMayBeCreated,
        nextTokenId,
        nftused,
      };
    } catch (err) {
      console.error("❌ [readName] General error:", err);
      throw new Error(`readName failed: ${err.message}`);
    }
  }
);

const contractSlice = createSlice({
  name: "contract",
  initialState: {
    contract: null,
    usdtContract: null,
    name: null,
    nfts: [],
    Package: null,
    packages: [],
    uplines: [],
    downlines: [],
    registered: null,
    admin: null,
    allowance: 5,
    directReferrals: [],
    limitUtilized: 0,
    NFTque: [],
    NFTQueBalance: 0,
    myNFTs: [],
    NFTMayBeCreated: false,
    nextTokenId: 0,
    nftused: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setContract: (state, action) => {
      state.contract = action.payload;
    },
    setUSDTContract: (state, action) => {
      state.usdtContract = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(readName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(readName.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(readName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setContract, setUSDTContract } = contractSlice.actions;
export default contractSlice.reducer;
