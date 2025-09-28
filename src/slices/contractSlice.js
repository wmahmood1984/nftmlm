import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { erc20abi, erc20Add, mlmabi, mlmcontractaddress, web3 } from "../config";

// Init thunk: create contract and save in state
export const init = createAsyncThunk("contract/init", async (_, thunkApi) => {
  const rContract = new web3.eth.Contract(mlmabi, mlmcontractaddress);
  const uContract = new web3.eth.Contract(erc20abi, erc20Add);

  thunkApi.dispatch(setContract(rContract));       // save in redux
  thunkApi.dispatch(setUSDTContract(uContract));   // ✅ fixed

  return rContract;
});

// Read contract name + user data
export const readName = createAsyncThunk(
  "contract/readName",
  async (a, thunkApi) => {
    const state = thunkApi.getState();
    const contract = state.contract.contract;
    const uContract = state.contract.usdtContract;

    if (!contract) throw new Error("Contract not initialized");

    const name = await contract.methods.name().call();
    const nfts = await contract.methods.getNFTs().call();
    const packages = await contract.methods.getPackages().call();
    const admin = await contract.methods.admin().call();
    const NFTque = await contract.methods.getNFTque().call()
    const registered = await contract.methods.userRegistered(a.address).call();
    const NFTQueBalance = await contract.methods.NFTQueBalance().call()
    const NFTMayBeCreated = await contract.methods.NFTMayBeCreated().call()
    const nextTokenId = await contract.methods._nextTokenId().call()
    const nftused = await contract.methods.nftused().call()

    let Package = null;
    let uplines = [];
    let downlines = [];
    let allowance = 0;
    let directReferrals = []
    let limitUtilized = 0;
    let myNFTs = []

    if (a.address && registered) {
      Package = await contract.methods.userPackage(a.address).call();
      uplines = await contract.methods.getUplines(a.address).call();
      downlines = await contract.methods.getDownlines(a.address).call();
      allowance = await uContract.methods
        .allowance(a.address, mlmcontractaddress)
        .call();
      directReferrals = await contract.methods.getDirectReferrals(a.address).call()
      limitUtilized = await contract.methods.userLimitUtilized(a.address).call()
      myNFTs = await contract.methods.getNFTs(a.address).call()
    }

    console.log("called")

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
    directReferrals:[],
    limitUtilized:0,
    NFTque:[],
    NFTQueBalance:0,
    myNFTs:[],
    NFTMayBeCreated:false,
    nextTokenId:0,
    nftused:null,
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
      })
      .addCase(readName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name = action.payload.name;
        state.nfts = action.payload.nfts;
        state.Package = action.payload.Package;
        state.packages = action.payload.packages;
        state.uplines = action.payload.uplines;
        state.downlines = action.payload.downlines;
        state.registered = action.payload.registered;
        state.admin = action.payload.admin;
        state.allowance = action.payload.allowance;
        state.directReferrals = action.payload.directReferrals;
        state.limitUtilized = action.payload.limitUtilized;
        state.NFTque = action.payload.NFTque;
        state.NFTQueBalance = action.payload.NFTQueBalance;
        state.myNFTs = action.payload.myNFTs;
        state.NFTMayBeCreated = action.payload.NFTMayBeCreated;
        state.nextTokenId = action.payload.nextTokenId;
        state.nftused = action.payload.nftused;
      })
      .addCase(readName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setContract, setUSDTContract } = contractSlice.actions;
export default contractSlice.reducer;
