import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const API_URL = 'https://distribusi.sidonat.com/api/distribusi/';
const TOKEN = '3|y7P1BwUxeyEody1JDmQmULVh0XVNMXlNUeo7pkRy2937740e';

const TABS = [
  { key: 'barang', label: 'Barang' },
  { key: 'penerima', label: 'Penerima' },
  { key: 'petugas', label: 'Petugas' },
];

export default function DetailDistribusiScreen() {
  const params = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('barang');

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL + params.id, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        const result = await response.json();
        setData(result || null);
      } catch (e) {
        setData(null);
      }
      setLoading(false);
    };
    if (params.id) fetchDetail();
  }, [params.id]);

  if (loading) {
    return (
      <View style={styles.container}><ActivityIndicator size="large" color="#333" /></View>
    );
  }
  if (!data) {
    return (
      <View style={styles.container}><Text style={{color:'red'}}>Data tidak ditemukan</Text></View>
    );
  }

  // Tab count
  const barangCount = Array.isArray(data.barang) ? data.barang.length : 0;
  const penerimaCount = Array.isArray(data.penerima) ? data.penerima.length : 0;
  const petugasCount = Array.isArray(data.petugas) ? data.petugas.length : 0;

  // Tab content
  let tabContent = null;
  if (activeTab === 'barang') {
    tabContent = (
      <View style={styles.sectionCard}>
        {Array.isArray(data.barang) && data.barang.length > 0 ? data.barang.map((b: any, idx: number) => (
          <View key={b.id || idx} style={styles.subCard}>
            <Text style={styles.value}><Text style={styles.labelInline}>Nama:</Text> {b.nama_barang}</Text>
            <Text style={styles.value}><Text style={styles.labelInline}>Jumlah:</Text> {b.jumlah}</Text>
          </View>
        )) : <Text style={styles.value}>-</Text>}
      </View>
    );
  } else if (activeTab === 'penerima') {
    tabContent = (
      <View style={styles.sectionCard}>
        {Array.isArray(data.penerima) && data.penerima.length > 0 ? data.penerima.map((p: any, idx: number) => (
          <View key={p.nama_penerima+idx} style={styles.subCard}>
            <Text style={styles.value}><Text style={styles.labelInline}>Instansi:</Text> {p.nama_instansi}</Text>
            <Text style={styles.value}><Text style={styles.labelInline}>Nama:</Text> {p.nama_penerima}</Text>
            <Text style={styles.value}><Text style={styles.labelInline}>Kota:</Text> {p.kota || '-'}</Text>
            <Text style={styles.value}><Text style={styles.labelInline}>HP:</Text> {p.hp || '-'}</Text>
            <Text style={styles.value}><Text style={styles.labelInline}>Alamat:</Text> {p.alamat || '-'}</Text>
          </View>
        )) : <Text style={styles.value}>-</Text>}
      </View>
    );
  } else if (activeTab === 'petugas') {
    tabContent = (
      <View style={styles.sectionCard}>
        {Array.isArray(data.petugas) && data.petugas.length > 0 ? data.petugas.map((p: any, idx: number) => (
          <View key={p.nama+idx} style={styles.subCard}>
            <Text style={styles.value}><Text style={styles.labelInline}>Nama:</Text> {p.nama}</Text>
            <Text style={styles.value}><Text style={styles.labelInline}>Tugas:</Text> {p.tugas}</Text>
          </View>
        )) : <Text style={styles.value}>-</Text>}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detail Distribusi</Text>
      <View style={styles.mainCard}>
        <Text style={styles.label}>Nomor:</Text>
        <Text style={styles.value}>{data.nomor}</Text>
        <Text style={styles.label}>Judul:</Text>
        <Text style={styles.value}>{data.judul}</Text>
        <Text style={styles.label}>Tanggal:</Text>
        <Text style={styles.value}>{data.tanggal}</Text>
        <Text style={styles.label}>Jenis:</Text>
        <Text style={styles.value}>{data.jenis}</Text>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{data.status}</Text>
      </View>
      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'barang' && styles.tabButtonActive]}
          onPress={() => setActiveTab('barang')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'barang' && styles.tabButtonTextActive]}>Barang ({barangCount})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'penerima' && styles.tabButtonActive]}
          onPress={() => setActiveTab('penerima')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'penerima' && styles.tabButtonTextActive]}>Penerima ({penerimaCount})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'petugas' && styles.tabButtonActive]}
          onPress={() => setActiveTab('petugas')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'petugas' && styles.tabButtonTextActive]}>Petugas ({petugasCount})</Text>
        </TouchableOpacity>
      </View>
      {tabContent}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#e9ecef',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2d3748',
    letterSpacing: 1.2,
    textShadowColor: '#bfc9d1',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 22,
    marginBottom: 24,
    width: 370,
    shadowColor: '#1976d2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 4,
    borderLeftWidth: 6,
    borderLeftColor: '#1976d2',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
    alignSelf: 'center',
    marginLeft: 0,
    marginTop: 8,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
    width: 370,
    shadowColor: '#1976d2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    marginTop: 10,
    color: '#4a5568',
    alignSelf: 'flex-start',
    letterSpacing: 0.5,
  },
  labelInline: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  value: {
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
  },
  subCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    width: '100%',
    shadowColor: '#4a5568',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#38b2ac',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
    gap: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
  },
  tabButtonActive: {
    backgroundColor: '#1976d2',
  },
  tabButtonText: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabButtonTextActive: {
    color: '#fff',
  },
});
