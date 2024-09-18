import { notFound } from "next/navigation";
import { getRequestConfig, unstable_setRequestLocale } from "next-intl/server";

export const locales = ["en", "zu", "de"];

export default getRequestConfig(async ({ locale }) => {
  console.log("Current locale:", locale);

  if (!locales.includes(locale as string)) {
    console.log("Locale not found:", locale);
    notFound();
  }

  unstable_setRequestLocale(locale);
  const messages = await import(`./messages/${locale}.json`);
  console.log("Messages loaded:", messages);

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
