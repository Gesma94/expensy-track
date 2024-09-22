import { enResourceLanguage, defaultNS } from "./config";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof enResourceLanguage;
  }
}
