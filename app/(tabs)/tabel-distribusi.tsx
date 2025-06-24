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
                            onPress={() => router.push({ pathname: '/detail-distribusi', params: { id: row.id } })}
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
        padding: 20,
        backgroundColor: '#f5f7fa',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 28,
        color: '#1976d2',
        letterSpacing: 1,
    },
    cardList: {
        alignItems: 'center',
        paddingBottom: 24,
    },
    card: {
        width: 340,
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
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 14,
        color: '#1976d2',
        letterSpacing: 0.5,
    },
    cardRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        width: 90,
        color: '#555',
        fontSize: 15,
    },
    value: {
        color: '#222',
        fontSize: 15,
        backgroundColor: '#f8fafc',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    detailButton: {
        marginTop: 16,
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
    },
    detailButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.5,
    },
});
