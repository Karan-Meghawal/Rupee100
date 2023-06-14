import getConfig from "./getConfig";
import getRecords from "./getRecords";
import getWallet from "./getWallet";
import searchUser from "./searchUser";
import transfer from "./transfer";

const transferPaymentController = {
  transfer,
  getRecords,
  getConfig,
  searchUser,
  getWallet,
};

export default transferPaymentController;
