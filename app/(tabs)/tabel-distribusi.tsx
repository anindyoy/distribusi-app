import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_TOKEN, API_URL_LIST } from '../../constants/api';
import globalStyles from '../../constants/globalStyles';

export default function TabelDistribusiScreen() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(5);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(API_URL_LIST + `?lembaga_id=1&limit=${limit}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${API_TOKEN}`,
                    },
                });
                const result = await response.json();
                setData(Array.isArray(result) ? result : []);
            } catch (error) {
                setData([]);
            }
            setLoading(false);
        };
        fetchData();
    }, [limit]);

    if (loading) {
        return (
            <View style={globalStyles.container}>
                <ActivityIndicator size="large" color="#333" />
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Data Distribusi</Text>
            <View style={{ marginBottom: 16, height: 20, borderRadius: 10, backgroundColor: '#f0f4fa', justifyContent: 'center', borderWidth: 1, borderColor: '#b5c6e0' }}>
                <Picker
                    selectedValue={limit}
                    onValueChange={(itemValue: number) => setLimit(itemValue)}
                    mode="dropdown"
                    style={{ fontSize: 18 }}
                    itemStyle={{ fontSize: 18, height: 54 }}
                >
                    <Picker.Item label="5 data" value={5} />
                    <Picker.Item label="10 data" value={10} />
                    <Picker.Item label="20 data" value={20} />
                </Picker>
            </View>
            {data.length === 0 && (
                <Text style={{ color: 'red', marginBottom: 16 }}>Data tidak ditemukan atau format data salah.</Text>
            )}
            <ScrollView contentContainerStyle={styles.cardList}>
                {data.map((row) => {
                    // Format barang: "Beras (155), Paket Mushaf (150)"
                    const barangList = Array.isArray(row.barang)
                        ? row.barang.map((b: any) => `${b.nama_barang} (${b.jumlah})`).join(', ')
                        : '-';
                    // Format kendaraan
                    const kendaraan = row.kendaraan
                        ? `${row.kendaraan.merk} ${row.kendaraan.warna} | ${row.kendaraan.nopol}`
                        : '-';
                    return (
                        <View style={globalStyles.card} key={row.id}>
                            <Text style={globalStyles.cardTitle}>{row.judul}</Text>
                            <View style={globalStyles.cardRow}>
                                <Text style={globalStyles.label}>Nomor:</Text>
                                <Text style={globalStyles.value}>{row.nomor ?? '-'}</Text>
                            </View>
                            <View style={globalStyles.cardRow}>
                                <Text style={globalStyles.label}>Tanggal:</Text>
                                <Text style={globalStyles.value}>{row.tanggal}</Text>
                            </View>
                            <View style={globalStyles.cardRow}>
                                <Text style={globalStyles.label}>Jenis:</Text>
                                <Text style={globalStyles.value}>{row.jenis}</Text>
                            </View>
                            <View style={globalStyles.cardRow}>
                                <Text style={globalStyles.label}>Status:</Text>
                                <Text style={globalStyles.value}>{row.status}</Text>
                            </View>
                            <View style={globalStyles.cardRow}>
                                <Text style={globalStyles.label}>Penerima:</Text>
                                <Text style={globalStyles.value}>{row.jumlah_penerima ?? '-'}</Text>
                            </View>
                            <View style={globalStyles.cardRow}>
                                <Text style={globalStyles.label}>Barang:</Text>
                                <Text style={globalStyles.value}>{barangList}</Text>
                            </View>
                            <View style={globalStyles.cardRow}>
                                <Text style={globalStyles.label}>Kendaraan:</Text>
                                <Text style={globalStyles.value}>{kendaraan}</Text>
                            </View>
                            {row.resi ? (
                                <View style={globalStyles.cardRow}>
                                    <Text style={globalStyles.label}>Resi:</Text>
                                    <Text style={globalStyles.value}>{row.resi}</Text>
                                </View>
                            ) : null}
                            {/* Tombol detail */}
                            <TouchableOpacity
                                style={globalStyles.button}
                                onPress={() => router.push({ pathname: '/detail-distribusi', params: { id: row.id } })}
                            >
                                <Text style={globalStyles.buttonText}>Detail</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    cardList: {
        alignItems: 'center',
        paddingBottom: 10,
    },
});
