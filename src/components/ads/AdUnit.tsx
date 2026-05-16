"use client";
import { useEffect } from "react";

type Props = {
  adSlot?: string;
  className?: string;
  style?: React.CSSProperties;
  adFormat?: string;
};

export default function AdUnit({
  adSlot,
  className,
  style,
  adFormat = "auto",
}: Props) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // ignore
    }
  }, []);

  const client =
    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID ||
    "ca-pub-4621643742071237";

  return (
    <ins
      className={`adsbygoogle ${className || ""}`}
      style={{ display: "block", ...(style || {}) }}
      data-ad-client={client}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
    />
  );
}
