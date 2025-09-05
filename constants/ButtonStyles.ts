import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10
  },
  primaryText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 18
  },
  secondary: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: "center"
  },
  smaller: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 16,
    alignItems: "center"
  },
  secondaryText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 18
  },
  accent: {
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: "center"
  },
  accentText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 18
  },
  disabled: {
    backgroundColor: Colors.disabled,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: "center"
  },
  disabledText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 18
  }
});
