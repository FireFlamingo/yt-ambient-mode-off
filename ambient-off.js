(() => {
  // YouTube stores the enabled and explicitly configured flags in PREF's f7 field.
  const watchEnabled = 1 << 4;
  const watchConfigured = 1 << 6;
  const shortsEnabled = 1 << 15;
  const shortsConfigured = 1 << 16;

  const preference = document.cookie.match(/(?:^|;\s*)PREF=([^;]*)/)?.[1] ?? "";
  const fields = preference ? preference.split("&") : [];
  const flagIndex = fields.findIndex((field) => field.startsWith("f7="));
  const flagValue = fields[flagIndex]?.slice(3) ?? "";
  const flags = /^[0-9a-f]+$/i.test(flagValue) ? Number.parseInt(flagValue, 16) : 0;
  const offFlags = ((flags | watchConfigured | shortsConfigured) & ~(watchEnabled | shortsEnabled)) >>> 0;

  if (flags === offFlags) return;

  fields[flagIndex === -1 ? fields.length : flagIndex] = `f7=${offFlags.toString(16)}`;
  document.cookie = `PREF=${fields.join("&")}; Domain=youtube.com; Path=/; Max-Age=34560000; Secure`;
})();
