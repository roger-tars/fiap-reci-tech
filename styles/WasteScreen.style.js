import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#111111',
  },
  container: {
    width: '100%',
    backgroundColor: '#111111',
    padding: 16,
    borderRadius: 5,
  },
  logo: {
    width: 150,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
  },
  fieldLabel: {
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Roboto_400Regular',
  },
  cityText: {
    color: '#ccc',
    marginTop: 5,
    fontFamily: 'Roboto_400Regular',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default styles;


