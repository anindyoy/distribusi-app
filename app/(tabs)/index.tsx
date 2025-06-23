import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { Button, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Data Distribusi"
        onPress={() => navigation.navigate('tabel-distribusi')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
