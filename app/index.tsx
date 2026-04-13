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
const chessboard = [
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "n", "b", "q", "k", "b", "n", "r"],
];

const chessSquares = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function Index() {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[] | null>([
    "e4",
    "e3",
  ]);
  const [board, setBoard] = useState(
    "rnbqkbnr/pppppppp/        /        /        /        /PPPPPPPP/RNBQKBNR",
  );
  const [text, setText] = useState("");
  const chess = new Chess();

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
    // Gets the name of tge square e.g E4
    const squareName = chessSquares[colIndex] + (8 - rowIndex);
    const pieceCode = chessboard[rowIndex][colIndex];

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
