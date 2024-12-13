import catchAsynch from "../../../shared/catchAsynch";
import { paymentServices } from "./payment.services";

const confirmationController = catchAsynch(async (req, res) => {
  const { transactionId, status } = req.query;
  console.log(req.params);
  const result = await paymentServices.confirmationService(
    transactionId as string,
    status as string
  );
  res.send(result);
});

export const PaymentControllers = {
  confirmationController,
};
