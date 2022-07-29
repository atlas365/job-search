import { useNavigation } from "@react-navigation/native"
import { Button } from "react-native"

const HeaderButton = ({destination, title}) => {

  const { navigate } = useNavigation()

  const onPress = () => {
    navigate(destination)
  }

  return (
    <Button
      title={`${title}`}
      onPress={onPress}
    />
  )
}

export default HeaderButton