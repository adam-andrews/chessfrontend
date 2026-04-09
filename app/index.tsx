import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ImageSourcePropType,
} from "react-native";

import React, { useState } from "react";

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

const pieceImages: PieceImages = {
  // White pieces
  K: require("../assets/pieces/K.png"),
  Q: require("../assets/pieces/Q.png"),
  R: require("../assets/pieces/R.png"),
  B: require("../assets/pieces/B.png"),
  N: require("../assets/pieces/N.png"),
  P: require("../assets/pieces/P.png"),
  // Black pieces (you had wrong image names here – fix if needed)
  k: require("../assets/pieces/wK.png"), // ← should probably be black king
  q: require("../assets/pieces/wQ.png"),
  r: require("../assets/pieces/wR.png"),
  b: require("../assets/pieces/wB.png"),
  n: require("../assets/pieces/wN.png"),
  p: require("../assets/pieces/wP.png"),
};

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

  const handlePress = (rowIndex: number, colIndex: number) => {
    const squareName = chessSquares[colIndex] + (8 - rowIndex);
    const pieceCode = chessboard[rowIndex][colIndex];

    if (!pieceCode && !selectedSquare) return;

    if (selectedSquare === squareName) {
      setSelectedSquare(null);
    } else {
      setSelectedSquare(squareName);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chess Board</Text>

      <View style={styles.board}>
        {chessboard.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((pieceCode, colIndex) => {
              const squareName = chessSquares[colIndex] + (8 - rowIndex);
              const isLightSquare = (rowIndex + colIndex) % 2 === 0;
              const isSelected = selectedSquare === squareName;

              return (
                <Pressable
                  key={colIndex}
                  style={[
                    styles.square,
                    isLightSquare ? styles.lightSquare : styles.darkSquare,
                    isSelected && styles.selectedSquare, // ← This makes it black when pressed
                  ]}
                  onPress={() =>
                    pieceImages[pieceCode] && handlePress(rowIndex, colIndex)
                  }
                >
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
});
