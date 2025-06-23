import { ScrollView, StyleSheet, Text, View } from 'react-native';

// Data statis distribusi
const dataDistribusi = [
	{
		id: 1,
		nomor: 'D-001',
		judul: 'Pengiriman Dokumen',
		nama_barang: 'Dokumen Penting',
		tanggal: '2025-06-01',
		jenis: 'biasa',
		status: 'selesai',
		penerima: 12,
	},
	{
		id: 2,
		nomor: 'D-002',
		judul: 'Distribusi Barang',
		nama_barang: 'Laptop',
		tanggal: '2025-06-02',
		jenis: 'ekspres',
		status: 'proses',
		penerima: 8,
	},
	{
		id: 3,
		nomor: 'D-003',
		judul: 'Pengiriman Surat',
		nama_barang: 'Surat Resmi',
		tanggal: '2025-06-03',
		jenis: 'biasa',
		status: 'pending',
		penerima: 15,
	},
];

export default function TabelDistribusiScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tabel Distribusi</Text>
			<ScrollView contentContainerStyle={styles.cardList}>
				{dataDistribusi.map((row) => (
					<View style={styles.card} key={row.id}>
						<Text style={styles.cardTitle}>{row.judul}</Text>
						<View style={styles.cardRow}>
							<Text style={styles.label}>Nama Barang:</Text>
							<Text style={styles.value}>{row.nama_barang}</Text>
						</View>
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
						<View style={styles.cardRow}>
							<Text style={styles.label}>Penerima:</Text>
							<Text style={styles.value}>{row.penerima}</Text>
						</View>
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
});
