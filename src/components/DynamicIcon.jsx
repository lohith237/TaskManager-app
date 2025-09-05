import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ICON_SETS = {
  MaterialIcons,
  EvilIcons,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  Feather,
  Entypo,
  AntDesign,
};

export default function DynamicIcon({ type = "Feather", name, size = 24, color = "black", ...props }) {
  const IconComponent = ICON_SETS[type] || Feather;
  return <IconComponent name={name} size={size} color={color} {...props} />;
}
