import { setupWorker } from "msw/browser";
import { handlers } from "./mocks/handlers";

const worker = setupWorker(...handlers);

worker.start({
  onUnhandledRequest: "bypass",
});

export default worker;
