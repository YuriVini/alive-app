import { StackRoutesParams } from "../../routes/stackRoutes.routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackRoutesParams {}
  }
}
