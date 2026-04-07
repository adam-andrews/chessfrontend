import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ImageSourcePropType,
} from "react-native";

// Import all piece images statically at the top
interface PieceImages {
  // White pieces (uppercase)
  K: ImageSourcePropType;
  Q: ImageSourcePropType;
  R: ImageSourcePropType;
  B: ImageSourcePropType;
  N: ImageSourcePropType;
  P: ImageSourcePropType;

  // Black pieces (lowercase)
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

  // Black pieces
  k: require("../assets/pieces/wK.png"),
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

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello 3</Text>

      <View style={styles.board}>
        {chessboard.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((pieceCode, colIndex) => {
              const isLightSquare = (rowIndex + colIndex) % 2 === 0;
              const isPressed = false;

              return (
                <View
                  key={colIndex}
                  style={[
                    styles.square,
                    isLightSquare ? styles.lightSquare : styles.darkSquare,
                    isPressed && styles.pressed,
                  ]}
                >
                  {pieceCode !== "" && pieceImages[pieceCode] && (
                    <Pressable>
                      <Image
                        source={pieceImages[pieceCode]}
                        style={styles.piece}
                        resizeMode="contain"
                      />
                    </Pressable>
                  )}
                </View>
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
  pressed: {
    backgroundColor: "#B1A7FC",
  },
});
