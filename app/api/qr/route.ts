import { NextResponse } from "next/server";
import QRCode from "qrcode";

/**
 * QR code as an SVG.
 *
 *   /api/qr?data=https%3A%2F%2Fwww.poshpork.com%2Fv%2Json-mir
 *
 * Generated here rather than through an external service, so a lobby
 * screen cannot fail because someone else's API is down on the night.
 *
 * Requires: npm install qrcode @types/qrcode
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const data = searchParams.get("data");

  if (!data || data.length > 512) {
    return NextResponse.json({ error: "No data" }, { status: 400 });
  }

  try {
    const svg = await QRCode.toString(data, {
      type: "svg",
      errorCorrectionLevel: "M",
      margin: 0,
      color: {
        dark: "#0a0a0a",
        light: "#00000000",
      },
    });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Could not generate" }, { status: 500 });
  }
}