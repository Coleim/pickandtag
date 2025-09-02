import { titlesStyles } from "@/constants/TitlesStyles";
import { Text } from "react-native";

export function Title({ text }: { text: string }) {

  return (
    <Text style={titlesStyles.title}>
      {text}
    </Text>

  )
}

export function SubTitle({ text }: { text: string }) {

  return (
    <Text style={titlesStyles.subtitle}>
      {text}
    </Text>

  )
}


export function BodyText({ text }: { text: string }) {

  return (
    <Text style={titlesStyles.body}>
      {text}
    </Text>

  )
}


export function NoteText({ text }: { text: string }) {

  return (
    <Text style={titlesStyles.note}>
      {text}
    </Text>

  )
}


