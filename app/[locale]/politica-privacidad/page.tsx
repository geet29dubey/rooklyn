import { createLegalRoute } from "@/lib/legal/route-page";

const route = createLegalRoute("privacy", "es");
export const generateMetadata = route.metadata;
export default route.Page;
