import { StyleSheet, Text, View, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Volume2, Vibrate, Bell } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scanner Options</Text>
        
        <View style={styles.option}>
          <View style={styles.optionIcon}>
            <Volume2 size={24} color="#64748b" />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Sound Effects</Text>
            <Text style={styles.optionDescription}>Play sound on successful scan</Text>
          </View>
          <Switch value={true} onValueChange={() => {}} />
        </View>

        <View style={styles.option}>
          <View style={styles.optionIcon}>
            <Vibrate size={24} color="#64748b" />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Vibration</Text>
            <Text style={styles.optionDescription}>Vibrate on scan completion</Text>
          </View>
          <Switch value={true} onValueChange={() => {}} />
        </View>

        <View style={styles.option}>
          <View style={styles.optionIcon}>
            <Bell size={24} color="#64748b" />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Notifications</Text>
            <Text style={styles.optionDescription}>Show scan results as notifications</Text>
          </View>
          <Switch value={false} onValueChange={() => {}} />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#0f172a',
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#64748b',
    marginHorizontal: 16,
    marginVertical: 8,
    textTransform: 'uppercase',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#0f172a',
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginTop: 2,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
  },
});