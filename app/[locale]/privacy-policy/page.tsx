import { createLegalRoute } from "@/lib/legal/route-page";

const route = createLegalRoute("privacy", "en");
export const generateMetadata = route.metadata;
export default route.Page;
