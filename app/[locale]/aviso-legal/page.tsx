import { createLegalRoute } from "@/lib/legal/route-page";

const route = createLegalRoute("notice", "es");
export const generateMetadata = route.metadata;
export default route.Page;
