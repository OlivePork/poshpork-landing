"use client";

import { useState } from "react";

/**
 * A Google map of the venue that only loads when the visitor asks for it.
 *
 * Google Maps sets its own cookies the moment it loads. Under EU rules
 * that needs the visitor's say-so first, so the page shows a placeholder
 * with a button, and the real map appears only after they press it.
 */
export default function VenueMap({
  query,
  label,
  zoom = 14,
}: {
  query: string;   // what Google should search for, e.g. the full address
  label: string;   // shown to screen readers as the map's title
  zoom?: number;   // 14 shows the venue with the streets of Campos around it
}) {
  const [show, setShow] = useState(false);

  const src =
    "https://www.google.com/maps?q=" +
    encodeURIComponent(query) +
    `&z=${zoom}&output=embed`;

  return (
    <div style={{
      position: "relative",
      width: "100%",
      aspectRatio: "16 / 10",
      border: "1px solid rgba(212,175,55,.35)",
      background: "#1a1a1a",
      overflow: "hidden",
    }}>
      {show ? (
        <iframe
          src={src}
          title={label}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, width: "100%", height: "100%", display: "block" }}
          allowFullScreen
        />
      ) : (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          padding: "24px",
          textAlign: "center",
        }}>
          <button
            type="button"
            onClick={() => setShow(true)}
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "15px",
              letterSpacing: ".06em",
              color: "#0f0f0f",
              background: "#d4af37",
              border: 0,
              padding: "12px 22px",
              cursor: "pointer",
            }}
          >
            Show the map
          </button>
          <p style={{ fontSize: "13px", lineHeight: 1.5, color: "#a8a29a", margin: 0, maxWidth: "40ch" }}>
            The map comes from Google, which sets its own cookies when it loads.
          </p>
        </div>
      )}
    </div>
  );
}