import Image from "next/image";

export function Logo({ dark = false, height = 28 }: { dark?: boolean; height?: number }) {
  const ratio = 1851 / 274;
  return (
    <Image
      src={dark ? "/brand/logo-horizontal-dark.svg" : "/brand/logo-horizontal.svg"}
      alt="DigiPass:Europe"
      width={Math.round(height * ratio)}
      height={height}
      priority
      unoptimized
    />
  );
}
