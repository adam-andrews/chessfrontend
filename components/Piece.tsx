import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

// White Pawn SVG
export const WhitePawn = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={37}
    height={39}
    fill="none"
    viewBox="0 0 39 39"
    {...props}
  >
    <Path
      fill="#34364C"
      d="M11.825 22.01c-.245.348-.536.711-.876 1.085a17.189 17.189 0 0 1-3.617 2.97l-.16.095a2.16 2.16 0 0 0-1.031 1.858v5.162c0 1.182.916 2.14 2.046 2.14h19.958c1.13 0 2.046-.958 2.046-2.14v-5.162a2.16 2.16 0 0 0-1.03-1.858l-.16-.096a17.186 17.186 0 0 1-3.618-2.97c-.34-.373-.631-.736-.875-1.085.898-.226 1.565-1.072 1.565-2.08v-3.485c0-.696-.323-1.348-.866-1.75l-.87-.64a7.688 7.688 0 0 0 .786-3.402c0-4.11-3.186-7.441-7.115-7.441-3.93 0-7.116 3.331-7.116 7.441a7.68 7.68 0 0 0 .872 3.571l-.639.472a2.172 2.172 0 0 0-.866 1.749v3.484c0 1.01.667 1.855 1.566 2.081Z"
    />
    <Path
      fill="#F4F7FA"
      d="M23.076 10.652a5.4 5.4 0 0 1-1.625 3.89l2.575 1.902v3.484h-2.521c.121 1.615 1.112 3.232 2.395 4.642a19.234 19.234 0 0 0 4.085 3.353l.16.095v5.162H8.188v-5.162l.16-.095a19.237 19.237 0 0 0 4.084-3.353c1.283-1.41 2.274-3.027 2.395-4.642h-2.521v-3.484l2.399-1.771a5.392 5.392 0 0 1-1.766-4.02c0-2.928 2.27-5.301 5.069-5.301s5.068 2.373 5.068 5.3Z"
    />
  </Svg>
);

const pieceMap: Record<string, any> = {
  P: WhitePawn,
};
interface PieceProps {
  src?: string;
}

// Pieces returns the corresponding Piece
export const Pieces = ({ src = "P" }: PieceProps) => {
  const SvgPiece = pieceMap[src];
  return <SvgPiece />;
};
