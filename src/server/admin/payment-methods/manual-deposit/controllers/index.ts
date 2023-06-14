import create from "./create";
import getRecord from "./getRecord";
import getRecords from "./getRecords";
import remove from "./remove";
import updateStatus from "./updateStatus";

const manualDepositMethodController = {
  getRecords,
  getRecord,
  create,
  updateStatus,
  remove,
};
export default manualDepositMethodController;
