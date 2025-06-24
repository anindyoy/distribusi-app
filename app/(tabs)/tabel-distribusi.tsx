import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_TOKEN, API_URL_LIST } from '../../constants/api';
import globalStyles from '../../constants/globalStyles';

export default function TabelDistribusiScreen() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(5);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showFilter, setShowFilter] = useState(false);
    const [jenis, setJenis] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = API_URL_LIST + `?lembaga_id=1&limit=${limit}`;
                if (startDate) {
                    url += `&tanggal_awal=${startDate.toISOString().slice(0, 10)}`;
                }
                if (endDate) {
                    url += `&tanggal_akhir=${endDate.toISOString().slice(0, 10)}`;
                }
                if (jenis) {
                    url += `&jenis=${encodeURIComponent(jenis)}`;
                }
                const response = await fetch(url, {
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
    }, [limit, startDate, endDate, jenis]);

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
            <TouchableOpacity
                style={{backgroundColor: '#1976d2', borderRadius: 10, paddingHorizontal: 24, paddingVertical: 10, marginBottom: 18, alignSelf: 'center'}}
                onPress={() => setShowFilter(true)}
            >
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>Filter & Jumlah Data</Text>
            </TouchableOpacity>
            <Modal
                visible={showFilter}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowFilter(false)}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{flex:1, backgroundColor:'rgba(0,0,0,0.25)', justifyContent:'center', alignItems:'center'}}
                    onPress={() => setShowFilter(false)}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{backgroundColor:'#fff', borderRadius:16, padding:24, minWidth:320, maxWidth:400, alignItems:'center', shadowColor:'#000', shadowOpacity:0.15, shadowRadius:10, elevation:5}}
                        onPress={e => e.stopPropagation()}
                    >
                        <Text style={{fontSize:18, fontWeight:'bold', color:'#1976d2', marginBottom:12}}>Filter & Jumlah Data</Text>
                        <Text style={{fontSize:15, color:'#555', marginBottom:8, alignSelf:'center'}}>Filter tanggal distribusi:</Text>
                        <View style={{flexDirection: 'row', gap: 10, marginBottom: 16}}>
                            {Platform.OS === 'web' ? (
                                <>
                                    <input
                                        type="date"
                                        style={{
                                            background: '#e2e8f0',
                                            borderRadius: 8,
                                            padding: 8,
                                            border: '1px solid #b5c6e0',
                                            fontSize: 15,
                                            color: '#1976d2',
                                            marginRight: 8,
                                        }}
                                        value={startDate ? startDate.toISOString().slice(0,10) : ''}
                                        max={endDate ? endDate.toISOString().slice(0,10) : new Date().toISOString().slice(0,10)}
                                        onChange={e => {
                                            const val = e.target.value ? new Date(e.target.value) : null;
                                            if (val && endDate && val > endDate) return;
                                            setStartDate(val);
                                        }}
                                    />
                                    <input
                                        type="date"
                                        style={{
                                            background: '#e2e8f0',
                                            borderRadius: 8,
                                            padding: 8,
                                            border: '1px solid #b5c6e0',
                                            fontSize: 15,
                                            color: '#1976d2',
                                        }}
                                        value={endDate ? endDate.toISOString().slice(0,10) : ''}
                                        min={startDate ? startDate.toISOString().slice(0,10) : undefined}
                                        max={new Date().toISOString().slice(0,10)}
                                        onChange={e => {
                                            const val = e.target.value ? new Date(e.target.value) : null;
                                            if (val && startDate && val < startDate) return;
                                            if (val && val > new Date()) return;
                                            setEndDate(val);
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <TouchableOpacity
                                        style={{backgroundColor: '#e2e8f0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#b5c6e0'}}
                                        onPress={() => setShowStartPicker(true)}
                                    >
                                        <Text style={{fontSize: 15, color: '#1976d2'}}>
                                            {startDate ? `Dari: ${startDate.toISOString().slice(0,10)}` : 'Pilih Tanggal Awal'}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{backgroundColor: '#e2e8f0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#b5c6e0'}}
                                        onPress={() => setShowEndPicker(true)}
                                    >
                                        <Text style={{fontSize: 15, color: '#1976d2'}}>
                                            {endDate ? `Sampai: ${endDate.toISOString().slice(0,10)}` : 'Pilih Tanggal Akhir'}
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                        <Text style={{fontSize:15, color:'#555', marginBottom:8, alignSelf:'center'}}>Limit data:</Text>
                        <View style={{ marginBottom: 16, borderRadius: 10, backgroundColor: '#f0f4fa', justifyContent: 'center', borderWidth: 1, borderColor: '#b5c6e0', width: 220 }}>
                            <Picker
                                selectedValue={limit}
                                onValueChange={(itemValue: number) => setLimit(itemValue)}
                                mode="dropdown"
                                style={{ fontSize: 16, width: 220, backgroundColor: '#f0f4fa', borderRadius: 10 }}
                                itemStyle={{ fontSize: 16, height: 44 }}
                            >
                                <Picker.Item label="5 data" value={5} />
                                <Picker.Item label="10 data" value={10} />
                                <Picker.Item label="20 data" value={20} />
                            </Picker>
                        </View>
                        <Text style={{fontSize:15, color:'#555', marginBottom:8, alignSelf:'center'}}>Jenis distribusi:</Text>
                        <View style={{ marginBottom: 16, borderRadius: 10, backgroundColor: '#f0f4fa', justifyContent: 'center', borderWidth: 1, borderColor: '#b5c6e0', width: 220 }}>
                            <Picker
                                selectedValue={jenis}
                                onValueChange={(itemValue: string) => setJenis(itemValue)}
                                mode="dropdown"
                                style={{ fontSize: 16, width: 220, backgroundColor: '#f0f4fa', borderRadius: 10 }}
                                itemStyle={{ fontSize: 16, height: 44 }}
                            >
                                <Picker.Item label="Semua Jenis" value="" />
                                <Picker.Item label="Diantarkan" value="Diantarkan" />
                                <Picker.Item label="Diambil" value="Diambil" />
                                <Picker.Item label="Dipaketkan" value="Dipaketkan" />
                            </Picker>
                        </View>
                        <Text style={{fontSize:15, color:'#1976d2', marginBottom:12, fontWeight:'bold'}}>Jumlah data: {data.length}</Text>
                        <TouchableOpacity
                            style={{backgroundColor:'#1976d2', borderRadius:8, paddingHorizontal:24, paddingVertical:10, marginTop:8}}
                            onPress={() => setShowFilter(false)}
                        >
                            <Text style={{color:'#fff', fontWeight:'bold', fontSize:16}}>Tutup</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
            {/* DateTimePicker hanya untuk mobile */}
            {Platform.OS !== 'web' && showStartPicker && (
                <DateTimePicker
                    value={startDate || new Date()}
                    mode="date"
                    display="default"
                    maximumDate={endDate ? endDate : new Date()}
                    onChange={(event: any, selectedDate?: Date) => {
                        setShowStartPicker(false);
                        if (selectedDate) {
                            if (endDate && selectedDate > endDate) return;
                            setStartDate(selectedDate);
                        }
                    }}
                />
            )}
            {Platform.OS !== 'web' && showEndPicker && (
                <DateTimePicker
                    value={endDate || new Date()}
                    mode="date"
                    display="default"
                    minimumDate={startDate || undefined}
                    maximumDate={new Date()}
                    onChange={(event: any, selectedDate?: Date) => {
                        setShowEndPicker(false);
                        if (selectedDate) {
                            if (startDate && selectedDate < startDate) return;
                            if (selectedDate > new Date()) return;
                            setEndDate(selectedDate);
                        }
                    }}
                />
            )}
            {data.length === 0 && (
                <Text style={{ color: 'red', marginBottom: 16 }}>Data tidak ditemukan.</Text>
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
