import { Colors } from '@pickandtag/domain';
import { StyleSheet } from "react-native";

export const titlesStyles = StyleSheet.create({
  title: {
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 26,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 38
  },
  subtitle: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 24,

  },
  body: {
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 17,
    color: Colors.text,
    marginBottom: 39
  },
  note: {
    fontSize: 11,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  }
});

