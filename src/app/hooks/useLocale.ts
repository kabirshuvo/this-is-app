import { usePathname, useSearchParams } from "next/navigation";

export function useLocale() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const locale = pathname.split("/")[1] || searchParams.get("locale");
  return locale;
}
