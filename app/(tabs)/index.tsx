import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScanResult = {
  success: boolean;
  message: string;
};

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      } else {
        setHasPermission(true);
      }
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://api.example.com/verify-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: data }),
      });

      const result = await response.json();
      setResult({
        success: result.success,
        message: result.message || 'QR code verified successfully',
      });
    } catch (error) {
      setResult({
        success: false,
        message: 'Failed to verify QR code. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QR Code Scanner</Text>
      </View>

      <View style={styles.scannerContainer}>
        {Platform.OS !== 'web' ? (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scanner}
          />
        ) : (
          <View style={styles.webPlaceholder}>
            <Camera size={48} color="#64748b" />
            <Text style={styles.webText}>
              Camera access is not available in web browser
            </Text>
          </View>
        )}
      </View>

      {loading && (
        <View style={styles.resultContainer}>
          <Text style={styles.loadingText}>Verifying QR code...</Text>
        </View>
      )}

      {result && !loading && (
        <View style={[styles.resultContainer, result.success ? styles.success : styles.error]}>
          {result.success ? (
            <CheckCircle2 size={24} color="#059669" />
          ) : (
            <AlertCircle size={24} color="#dc2626" />
          )}
          <Text style={[styles.resultText, result.success ? styles.successText : styles.errorText]}>
            {result.message}
          </Text>
        </View>
      )}

      {scanned && !loading && (
        <Text style={styles.tapText} onPress={() => {
          setScanned(false);
          setResult(null);
        }}>
          Tap to scan again
        </Text>
      )}
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
  scannerContainer: {
    flex: 1,
    marginVertical: 24,
    marginHorizontal: 16,
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
  },
  scanner: {
    flex: 1,
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  webText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    marginTop: 24,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  success: {
    backgroundColor: '#dcfce7',
  },
  error: {
    backgroundColor: '#fee2e2',
  },
  resultText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  successText: {
    color: '#059669',
  },
  errorText: {
    color: '#dc2626',
  },
  loadingText: {
    color: '#64748b',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  tapText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#0891b2',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
});