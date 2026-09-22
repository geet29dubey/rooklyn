import { createLegalRoute } from "@/lib/legal/route-page";

const route = createLegalRoute("cookies", "es");
export const generateMetadata = route.metadata;
export default route.Page;
