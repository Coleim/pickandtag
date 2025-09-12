
import * as Linking from 'expo-linking';
import { Text, TouchableOpacity } from "react-native";

export function ShareTwitter({ xp }: { xp: number }) {

  function shareOnTwitter() {
    const text = encodeURIComponent(`🌱 J'ai gagné ${xp} XP sur Pick & Tag ! #EcoChallenge`);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    Linking.openURL(url);
  }

  return (
    <TouchableOpacity onPress={() => shareOnTwitter()}>
      <Text> Share on Twitter </Text>
    </TouchableOpacity>
  );
};
