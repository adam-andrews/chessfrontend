import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ImageSourcePropType,
  TextInput,
} from "react-native";

import React, { useState } from "react";
import Pieces from "../components/Piece";
import { Chess } from "chess.js";
interface PieceImages {
  K: ImageSourcePropType;
  Q: ImageSourcePropType;
  R: ImageSourcePropType;
  B: ImageSourcePropType;
  N: ImageSourcePropType;
  P: ImageSourcePropType;
  k: ImageSourcePropType;
  q: ImageSourcePropType;
  r: ImageSourcePropType;
  b: ImageSourcePropType;
  n: ImageSourcePropType;
  p: ImageSourcePropType;
}

import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={45}
    height={45}
    viewBox="0 0 45 45"
    fill="none"
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

//Uppercase (capital) letters = White pieces
// Lowercase letters = Black pieces
const pieceImages: PieceImages = {
  // White pieces
  K: require("../assets/pieces/wK.png"),
  Q: require("../assets/pieces/wQ.png"),
  R: require("../assets/pieces/wR.png"),
  B: require("../assets/pieces/wB.png"),
  N: require("../assets/pieces/wN.png"),
  P: require("../assets/pieces/wP.png"),

  // Black pieces
  k: require("../assets/pieces/K.png"),
  q: require("../assets/pieces/Q.png"),
  r: require("../assets/pieces/R.png"),
  b: require("../assets/pieces/B.png"),
  n: require("../assets/pieces/N.png"),
  p: require("../assets/pieces/P.png"),
};

function fenToBoard(chessFen: string) {
  const chessPieces = chessFen.split(" ")[0];

  const board = chessPieces.replace(/[1-8]/g, (m) => {
    const num = parseInt(m);
    return " ".repeat(num);
  });
  return board;
}

const chessSquares = ["a", "b", "c", "d", "e", "f", "g", "h"];

const chess = new Chess();

export default function Index() {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [board, setBoard] = useState(
    "rnbqkbnr/pppppppp/        /        /        /        /PPPPPPPP/RNBQKBNR",
  );
  const [text, setText] = useState("");

  const submitMove = (square) => {
    console.log("Input submitted:", text);
    if (chess.isGameOver()) return;
    try {
      chess.move(selectedSquare + "-" + square);
      const moves = chess.moves();
      console.log(moves);
      setText("");
      const newBoard = fenToBoard(chess.fen());
      setBoard(newBoard);
      setSelectedSquare(null);
      setPossibleMoves([]);
    } catch {
      setText("Illegal Move");
    }
  };

  const submit = () => {
    console.log("Input submitted:", text);
    if (chess.isGameOver()) return;
    try {
      chess.move(text);
      const moves = chess.moves();
      console.log(moves);
      setText("");
      const newBoard = fenToBoard(chess.fen());
      setBoard(newBoard);
    } catch {
      setText("Illegal Move");
    }
  };
  const handlePress = (rowIndex: number, colIndex: number) => {
    // Gets the name of the square e.g E4
    const squareName = chessSquares[colIndex] + (8 - rowIndex);
    console.log("Yellow", rowIndex, colIndex);
    console.log(board);
    // Gets the correct index of the piece from board (Also adds slashes)
    let pieceIndex = rowIndex * 8 + colIndex;
    pieceIndex += Math.floor(pieceIndex / 8); // 8
    console.log(pieceIndex, "Piece Index?");
    const pieceCode = board[pieceIndex];

    if (!pieceCode && !selectedSquare) return;

    // Deselects the square if user presses on it again
    if (selectedSquare === squareName) {
      setSelectedSquare(null);
    } else {
      //Gets the verbose move, and returns the square they are moving to
      const pieceMoves = chess.moves({ square: squareName, verbose: true });
      const squareMoves = pieceMoves.map((move) => move.to);
      console.log(squareMoves);
      console.log(pieceMoves);
      setSelectedSquare(squareName);
      setPossibleMoves(squareMoves);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chess Board</Text>
      <SvgComponent width={70} height={70} />
      <Pieces />

      <View style={styles.board}>
        {board.split("/").map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.split("").map((pieceCode, colIndex) => {
              const squareName = chessSquares[colIndex] + (8 - rowIndex);
              const isLightSquare = (rowIndex + colIndex) % 2 === 0;
              const isSelected = selectedSquare === squareName;

              return (
                <Pressable
                  key={colIndex}
                  style={[
                    styles.square,
                    isLightSquare ? styles.lightSquare : styles.darkSquare,
                    isSelected && styles.selectedSquare,
                  ]}
                  onPress={() => {
                    if (possibleMoves.includes(squareName)) {
                      submitMove(squareName);
                    } else if (pieceImages[pieceCode]) {
                      handlePress(rowIndex, colIndex);
                    } else {
                    }
                  }}
                >
                  {!pieceImages[pieceCode] &&
                    possibleMoves.includes(squareName) && (
                      <View style={styles.purpleDot} />
                    )}
                  {pieceImages[pieceCode] && (
                    <Image
                      source={pieceImages[pieceCode]}
                      style={styles.piece}
                      resizeMode="contain"
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        ))}

        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Enter move here..."
          returnKeyType="done"
          onSubmitEditing={submit}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B7C0D8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  board: {
    width: 400,
    height: 400,
    overflow: "hidden",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  square: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  piece: {
    width: 45,
    height: 45,
  },
  lightSquare: {
    backgroundColor: "#E8EDF9",
  },
  darkSquare: {
    backgroundColor: "#B7C0D8",
  },
  selectedSquare: {
    backgroundColor: "#B1A7FC",
  },
  squareText: {
    position: "absolute",
    top: 4,
    left: 4,
    fontSize: 10,
    color: "#888",
  },
  purpleDot: {
    height: 13,
    width: 13,
    backgroundColor: "#B1A7FC",
    borderRadius: 6,
  },
});
