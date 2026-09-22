import { createLegalRoute } from "@/lib/legal/route-page";

const route = createLegalRoute("cookies", "en-or-it");
export const generateMetadata = route.metadata;
export default route.Page;
