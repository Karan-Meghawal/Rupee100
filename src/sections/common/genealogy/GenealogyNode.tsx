import { type GenealogyUser } from "@/pages/u/network/genealogy";
import { getFileSrc } from "@/utils/fns";

const GenealogyNode = ({ avatar, userName, userId }: GenealogyUser) => (
  <div
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      width: 220,
      height: 140,
    }}
  >
    <div
      style={{
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        display: "inline-flex",
        width: 220,
        height: 140,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          zIndex: 9,
          border: `4px solid var(--neutral)`,
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          style={{
            textAlign: "center",
            objectFit: "cover",
            width: "56px",
            height: "56px",
          }}
          src={getFileSrc(avatar)}
          alt={userName}
        />
      </div>
      <div
        style={{
          boxShadow: "var(--box-shadow)",
          background: "var(--neutral)",
          transition: "var(--padding)",
          backgroundImage: "none",
          overflow: "hidden",
          position: "relative",
          zIndex: 0,
          borderRadius: "12px",
          textTransform: "capitalize",
          width: "100%",
          height: "100%",
          marginTop: "28px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            top: "0px",
            left: "0px",
            width: "100%",
            height: "4px",
            position: "absolute",
            borderRadius: "12px",
            backgroundColor: "var(--border-color)",
          }}
        ></div>
        <div
          style={{
            margin: "0px",
            lineHeight: 1.57143,
            fontSize: "0.875rem",
            fontFamily: "var(--font-family)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "center",
            color: "var(--border-color)",
            fontWeight: 400,
          }}
        >
          {userName}
        </div>
        <div
          style={{
            margin: "0px",
            lineHeight: 1.5,
            fontSize: "0.75rem",
            fontFamily: "var(--font-family)",
            fontWeight: 400,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "var(--color)",
            textAlign: "center",
          }}
        >
          {userId}
        </div>
      </div>
    </div>
  </div>
);
export default GenealogyNode;
