"use client";

type Film = {
  lang: string;
  label: string;
};

export default function LanguageSwitcher({
  films,
  current,
}: {
  films: Film[];
  current: string;
}) {
  if (films.length < 2) return null;

  return (
    <div style={{
      maxWidth: "1100px",
      margin: "0 auto 4px",
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "12px",
      flexWrap: "wrap",
    }}>
      <span style={{
        fontFamily: "Cinzel, serif",
        fontSize: "11px",
        letterSpacing: ".22em",
        textTransform: "uppercase",
        color: "#f2ece1",
        opacity: .45,
      }}>
        Language
      </span>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        border: "1px solid rgba(212,175,55,.3)",
        borderRadius: "4px",
        overflow: "hidden",
      }}>
        {films.map((f, i) => {
          const on = f.lang === current;
          return (
            <a
              key={f.lang}
              href={`/watch?lang=${f.lang}`}
              lang={f.lang}
              aria-current={on ? "true" : undefined}
              style={{
                padding: "7px 14px",
                fontFamily: "Cinzel, serif",
                fontSize: "12px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                borderRight: i < films.length - 1 ? "1px solid rgba(212,175,55,.2)" : "none",
                background: on ? "rgba(212,175,55,.18)" : "transparent",
                color: on ? "#d4af37" : "#f2ece1",
                opacity: on ? 1 : .6,
              }}
            >
              {f.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
