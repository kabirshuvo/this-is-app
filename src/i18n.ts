import { notFound } from "next/navigation";
import { getRequestConfig, unstable_setRequestLocale } from "next-intl/server";

export const locales = ["en", "zu", "de"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as string)) notFound();

  unstable_setRequestLocale(locale);

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
