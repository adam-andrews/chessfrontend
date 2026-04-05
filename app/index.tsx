import { Text, View, StyleSheet, Image, Pressable, Alert } from "react-native";
const chessboard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B7C0D8",
      }}
    >
      <View>
        <Text> Hello World 2</Text>
        <Image
          source={require("../assets/pieces/Piece=King, Side=Black.png")}
        />
      </View>
      <View style={styles.board}>
        {chessboard.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((square, colIndex) => {
              const isLightSquare = (rowIndex + colIndex) % 2 === 0;

              return (
                <View
                  key={colIndex}
                  style={[
                    styles.square,
                    isLightSquare ? styles.lightSquare : styles.darkSquare,
                  ]}
                >
                  {square && (
                    <Pressable
                      onPress={() => {
                        Alert.alert(
                          "Piece Clicked",
                          `at row ${chessboard[rowIndex][colIndex]}`,
                        );
                      }}
                    >
                      <Image
                        style={styles.piece}
                        source={require("../assets/pieces/Piece=King, Side=Black.png")}
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
    height: 44,
    width: 44,
  },
  lightSquare: {
    backgroundColor: "#E8EDF9",
  },
  darkSquare: {
    backgroundColor: "#B7C0D8",
  },
});
