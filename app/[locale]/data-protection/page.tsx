import { permanentRedirect } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { fullLegalPath } from "@/lib/legal/routes";

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  permanentRedirect(fullLegalPath((await params).locale, "privacy"));
}
