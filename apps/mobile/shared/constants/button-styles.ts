import { Colors } from "@pickandtag/domain";
import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
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
  },
  fabWithTextPrimary: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Colors.primary,
    bottom: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 32,
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  fabText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  fab: {
    position: "absolute",
    bottom: 14,
    alignSelf: "center",
    backgroundColor: Colors.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },


});

