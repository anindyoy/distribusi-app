import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  // Card style
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 22,
    marginBottom: 18,
    shadowColor: '#1976d2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 6,
    borderLeftColor: '#1976d2',
    width: '100%',
  },
  // Card title
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#1976d2',
    letterSpacing: 0.5,
  },
  // Card row
  cardRow: {
    flexDirection: 'row',
    marginBottom: 2
  },
  // Label
  label: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: 15,
    width: 90,
  },
  // Value
  value: {
    color: '#222',
    fontSize: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  // Button
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignSelf: 'flex-end',
    shadowColor: '#1976d2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  // Container (optional global)
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  // Title (global for page headings)
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 28,
    color: '#1976d2',
    letterSpacing: 1,
    textAlign: 'center',
  },
});

export default globalStyles;
