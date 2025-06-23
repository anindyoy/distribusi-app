import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const API_URL = 'https://distribusi.sidonat.com/api/distribusi/get_data';
const TOKEN = '3|y7P1BwUxeyEody1JDmQmULVh0XVNMXlNUeo7pkRy2937740e';

export default function TabelDistribusiScreen() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(API_URL + '?lembaga_id=1&limit=5', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                const result = await response.json();
                // result sudah array of distribusi
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
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#333" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Data Distribusi</Text>
            {data.length === 0 && (
                <Text style={{ color: 'red', marginBottom: 16 }}>Data tidak ditemukan atau format data salah.</Text>
            )}
            <ScrollView contentContainerStyle={styles.cardList}>
                {data.map((row) => (
                    <View style={styles.card} key={row.id}>
                        <Text style={styles.cardTitle}>{row.judul}</Text>
                        <View style={styles.cardRow}>
                            <Text style={styles.label}>Nomor:</Text>
                            <Text style={styles.value}>{row.nomor}</Text>
                        </View>
                        <View style={styles.cardRow}>
                            <Text style={styles.label}>Tanggal:</Text>
                            <Text style={styles.value}>{row.tanggal}</Text>
                        </View>
                        <View style={styles.cardRow}>
                            <Text style={styles.label}>Jenis:</Text>
                            <Text style={styles.value}>{row.jenis}</Text>
                        </View>
                        <View style={styles.cardRow}>
                            <Text style={styles.label}>Status:</Text>
                            <Text style={styles.value}>{row.status}</Text>
                        </View>
                        {/* Tombol detail */}
                        <TouchableOpacity
                            style={styles.detailButton}
                            onPress={() => router.push({ pathname: '/(tabs)/detail-distribusi', params: { id: row.id } })}
                        >
                            <Text style={styles.detailButtonText}>Detail</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    cardList: {
        alignItems: 'center',
        paddingBottom: 24,
    },
    card: {
        width: 320,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    cardRow: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    label: {
        fontWeight: 'bold',
        width: 90,
        color: '#555',
    },
    value: {
        color: '#222',
    },
    detailButton: {
        marginTop: 12,
        backgroundColor: '#1976d2',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
    detailButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
