import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_TOKEN, API_URL_LIST } from '../../constants/api';
import globalStyles from '../../constants/globalStyles';

export default function TabelDistribusiScreen() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(API_URL_LIST + '?lembaga_id=1&limit=5', {
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
    }, []);

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
        paddingBottom: 24,
    },
});
