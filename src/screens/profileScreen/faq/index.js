import React from 'react';
import { View, Text, ScrollView, WebView } from 'react-native';

import Style from '../../../style/defaultStyle';
import color from '../../../style/color';
import { NavigationBar } from '../../../components';

let videoTag = `<html>
        <head>
          <style>
          .intrinsic-container{position:relative;height:0;overflow:hidden}.intrinsic-container-16x9{padding-bottom:56.25%}.intrinsic-container-4x3{padding-bottom:75%}.intrinsic-container iframe{position:absolute;top:0;left:0;width:100%;height:100%}          
          </style>
        </head>
        <body>
          <div class="intrinsic-container intrinsic-container-16x9"><iframe width="560" height="315" 
          src="https://www.youtube.com/embed/9IvNVFvR8Zw" 
          frameborder="0" allow="autoplay; encrypted-media" 
          allowfullscreen></iframe></div>
        </body>
      </html>`

const FaqScreen = props => (
  <View style={styles.containerStyle}>
    <NavigationBar onPress={() => props.navigator.pop()} title={'F.A.Q'} />
    {/* <WebView
         style={{flex:1}}
         javaScriptEnabled={true}
         source={{html: videoTag}} /> */}
    <ScrollView>
      <View style={{ padding: Style.PADDING }}>
        <Text style={[styles.questionStyle, { paddingTop: Style.PADDING }]}>
          1. Bagaimana cara registrasi akun Teman Diabetes (TD) ?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          Registrasi Teman Diabetes dapat dilakukan melalui 3 cara:{'\n'}
          {'\n'}
          - Email : Untuk register melalu email, pilih “Buat Akun”, kemudian ikuti langkah registrasi (Masukan Nama Lengkap, Email, Buat Password & Tipe User). {'\n'}
          {'\n'}
          - Facebook : untuk register melalui Facebook, pilih masuk melalui Facebook, kemudian
          ikuti langkah registrasinya.{'\n'}
          {'\n'}
          - Google+ : untuk register melalui Google+, pilih masuk melalui Google+, kemudian ikuti
          langkah registrasinya. {'\n'}
          {'\n'}
          Setelah proses registrasi Anda selesai, Anda akan mendapat email yang berisi keterangan
          bahwa Anda telah melakukan registrasi di Teman Diabetes dan akun Anda secara otomatis
          sudah aktif. Saat ini TD hanya bisa didownload di Playstore Android. {'\n'} {'\n'}
          Note : Jika Anda mendapat email dan Anda merasa tidak pernah melakukan pendaftaran di
          Aplikasi Teman Diabetes, maka Anda dapat melakukan pelaporan melalui link “Laporkan” yang
          ada di dalam email. {'\n'}
          {'\n'}
        </Text>
        <Text style={styles.questionStyle}>
          2. Siapa saja yang disarankan menggunakan aplikasi TD?
          {'\n'}
        </Text>
        <Text style={styles.answerStyle}>
            - Diabetisi: Orang dengan diabetes. {'\n'}
            - Non Diabetisi / Inner Circle : Orang yang memiliki teman atau kerabat dengan Diabetes. {'\n'}
            - Dokter atau Ahli : yang berperan sebagai advisor diharuskan mengisi nomor SIP. {'\n'}
            - Non Diabetisi & Dokter nantinya dapat menjalankan peran sebagai "Inner Circle". {'\n'}
          {'\n'}
        </Text>
        <Text style={styles.questionStyle}>
        3. Bagaimana cara saya memilih tipe user (Diabetisi, Non Diabetisi, Ahli)? Apakah saya bisa mengubah tipe user saya?
          {'\n'}
        </Text>
        <Text style={styles.answerStyle}>
        Untuk menentukan tipe user dapat dilakukan saat proses registrasi, Anda akan diminta untuk memilih salah satu tipe user yaitu Diabetisi, Non Diabetisi atau Ahli. {'\n'} {'\n'}
        Jika Anda ingin mengubah tipe user setelah proses registrasi selesai, Anda dapat mengirimkan email ke <Text style={styles.textBold}>info@temandiabetes.com</Text> untuk melakukan perubahan tipe user dengan menyertakan username yang sudah Anda daftarkan ke Teman Diabetes.
          {'\n'}
          {'\n'}
        </Text>
        <Text style={styles.questionStyle}>
        4. Apakah itu Inner Circle dan bagaimana cara mengundang mereka?
          {'\n'}
        </Text>
        <Text style={styles.answerStyle}>
            Inner Circle ialah Keluarga / kerabat / dokter Diabetisi yang dapat membantu memberikan support untuk Diabetisi. 
            Anda dapat mengundang teman, keluarga bahkan dokter Anda untuk menggunakan aplikasi Teman Diabetes dengan mengirimkan link untuk download melalui email dan Whatsapp.
          {'\n'}
          {'\n'}
        </Text>
        <Text style={styles.questionStyle}>
          5. Berapa banyak orang yang dapat saya undang untuk menjadi Inner Circle saya (termasuk dokter saya)?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          10 orang, masing masing orang yang diundang harus memiliki akun Teman Diabetes sebagai Ahli atau Inner circle.  {'\n'} {'\n'}
        </Text>
        <Text style={styles.questionStyle}>
          6. Apakah tombol darurat itu dan bagaimana cara kerjanya ?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          Tombol Darurat berfungsi sebagai bantuan di saat Anda dalam keadaan darurat, klik Tombol Darurat saat Anda membutuhkan bantuan sesuai dengan level kondisi Anda (Rendah, Sedang, Parah) maka, aplikasi akan segera mengirimkan notifikasi kepada Inner Circle Anda sebagai informasi bahwa Anda membutuhkan bantuan darurat. {'\n'} {'\n'}
        </Text>
        <Text style={styles.questionStyle}>
          7. Apakah saya dapat melakukan pembelian obat melalui GoApotik?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
         Bisa, melalui menu katalog yang ada di dalam aplikasi  {'\n'} {'\n'}
        </Text>
        <Text style={styles.questionStyle}>
          8. Apakah saya harus registrasi GoApotik agar dapat bertransaksi ?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          Ya, untuk dapat melakukan transaksi di GoApotik, terlebih dahulu Anda harus melakukan registrasi user / memiliki akun.  {'\n'} {'\n'}
        </Text>
        <Text style={styles.questionStyle}>
          9. Bagaimana mengatur pill reminder, consent (rekam medis) dan Inner Circle ? {'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          a. Pill Reminder: Untuk menggunakan Pill Reminder, klik “Pengingat Obat” di halaman Riwayat dan Estimasi, kemudian tambahkan Nama Obat dan waktu remindernya (jam, sebelum makan, sesudah makan), Simpan perubahan Anda, aktifkan notifikasi dengan menggeser button menjadi hijau. {'\n'}{'\n'}
          b. Rekam Medis: Anda dapat memasukkan data Rekam Medis melalui menu Masukkan Pelacak, rekam medis yang dapat Anda masukkan adalah data sbb: {'\n'}
          - Gula Darah: Untuk gula darah, Anda dapat memasukkan data secara manual sesuai hasil tes Anda atau cek darah otomatis dengan menggunakan Dnurse.{'\n'}
          - HbA1c: Untuk memasukkan HbA1c, Anda cukup klik pada HbA1c dan masukkan angka hasil tes HbA1c Anda. Tes HbA1c sendiri bisa dilakukan di lab.{'\n'}
          - Menu Makan: Untuk menu makan Anda dapat memasukkan data sarapan, makan siang, makan malam & snack, selain itu Anda dapat mengatur tanggal dan jam terkait dengan inputan menu makan Anda. Detail kalori pada jenis menu makan yang Anda masukan hanya merupakan data kalori dalam hitungan 1 porsi sedang, jumlah kaolri merupakan rata rata tergantung dari seberapa besar porsi yang Anda makan. {'\n'} 
          - Aktivitas: Pilih aktivitas yang Anda lakukan Ringan, Sedang atau Berat. Kategori aktivitas tergantung penilaian anda dari banyaknya gerakan fisik yang Anda lakukan pada hari itu. {'\n'}
          - Berat Badan: Masukkan data berat badan Anda dengan menuliskan angka berat badan Anda (dalam kilogram){'\n'}{'\n'}
            
          c. Inner Circle: Untuk mengatur Inner Circle Anda dapat dilakukan melalui menu “Pengaturan – Daftar Inner Circle”. {'\n'}{'\n'}
          d. Tambah Inner Circle: Cari nama pengguna yang Anda ingin tambahkan dan klik tanda + {'\n'}{'\n'}
          e. Menghapus Inner Circle: Melalui menu Pengaturan - pilih Daftar Inner Circle - di tab Inner Circle pilih nama yang akan dihapus kemudian klik tanda X untuk menghapus Inner Circle Anda. {'\n'}{'\n'}
          f. Menerima & Menolak Permintaan: Untuk dapat menerima permintaan Inner Circle, buka menu Inner Circle di Pengaturan – pilih tab Permintaan - klik di tanda V untuk menerima permintaan Inner Circle, klik X untuk menolak permintaan. {'\n'}{'\n'}
          g. Melihat list permintaan tertunda : Buka menu Pengaturan – pilih Daftar Inner Circle – pilih tab Pending, maka Anda dapat melihat list permintaan Anda yang tertunda di menu tersebut.{'\n'}{'\n'}
        </Text> 
        <Text style={styles.questionStyle}>
          10. Bagaimana dan mengapa saya perlu memberitahu lokasi saya ?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          Lokasi Anda diperlukan di fitur Emergency Button (untuk mengetahui titik lokasi provider kesehatan terdekat dari lokasi Anda) dan di fitur Belanja (untuk mengetahui lokasi apotik terdekat dari lokasi Anda){'\n'}
        {'\n'} 
        </Text>
        <Text style={styles.questionStyle}>
          11. Apa itu Dnurse ?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
        Dnurse adalah alat tes gula darah (glucometer) yang terintegrasi dengan aplikasi Teman diabetes. Dnurse tidak menggunakan layar pada device, namun hasil tes darah hanya bisa terlihat dengan menggunakan aplikasi Teman Diabetes{'\n'}
        {'\n'} 
        </Text>
        <Text style={styles.questionStyle}>
          12. Bagaimana cara menggunakan Dnurse?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          Pastikan Anda sudah mengunduh aplikasi Dnurse, buka tab "Rekaman", pilih menu "Gula Darah", pilih "Dnurse" kemudian ikuti langkah menggunakan Dnurse : {'\n'}
          a. Pastikan area yang akan ditusuk jarum sudah disterilkan dengan alcohol swab {'\n'}
          b. Pasang Dnurse pada 3.5mm jack headset Anda{'\n'}
          c. Pasang test strip pada Dnurse, pastikan posisi test strip Anda benar{'\n'}
          d. Tusuk jari Anda menggunakan alat yang telah disediakan dan teteskan pada teststrip (Jeda pemasangan test strip sampai dengan diteteskan darah tidak boleh terlalu lama untuk menghindari test strip terkena oksidasi){'\n'}
          e. Tunggu, maka hasilnya akan muncul di aplikasi Anda.{'\n'}
          f. Hasil pengetesan akan muncul di grafik "Kadar Gula Darah" di tab "Rekaman"{'\n'}{'\n'}

          Feature Dnurse hanya dapat digunakan di aplikasi Teman Diabetes oleh user yang masuk sebagai Diabetisi.{'\n'}
          <Text style={styles.textBold}>Saran penggunaan:</Text>{'\n'}
          - Lakukan pengetesan pada bagian samping jari tengah atau jari manis di tangan kiri (jari tidak bercincin) / cuping telinga{'\n'}
          - Darah yang pertama kali keluar sebaiknya diseka dengan tissue kering, karena ada kemungkinan terkontaminasi alkohol. Jari dapat ditekan-tekan lagi setelah diseka untuk mengeluarkan darah.{'\n'}
          - Tidak boleh terlalu lama sejak di tusuk, darah harus segera diteteskan ke Strip{'\n'}
          - Gunakan selalu jarum baru, tidak disarankan memakai jarum secara bergantian{'\n'}
          <Text style={styles.textBold}>Petunjuk hasil pengetesan gula darah:</Text>{'\n'}
          - Gula darah sesudah makan tidak boleh >200mg/dl{'\n'}
          - Gula darah puasa 8 jam tidak boleh >126 mg/dl{'\n'}
        {'\n'} 
        Video tutorial penggunaan Dnurse dapat Anda lihat pada video di bawah berikut ini : {'\n'}
        </Text>

         <WebView
         style={{flex:1, height : 290, marginBottom : 10}}
         javaScriptEnabled={true}
         source={{html: videoTag}} />
        <Text style={styles.questionStyle}>
        {'\n'}13. Seberapa sering pengecekan darah harus saya lakukan dengan Dnurse ?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          Rekomendasi pengecekan:{'\n'}
          - Diabet dengan obat - 1x sehari{'\n'}
          - Diabet dengan insulin - 2x sehari{'\n'}
          Atau sesuai saran dokter{'\n'}
        {'\n'} 
        </Text>
        <Text style={styles.questionStyle}>
         14. Dnurse akan dapat digunakan sampai berapa kali pemakaian ?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          4000 kali atau 5 tahun (tergantung mana yang lebih cepat){'\n'}
        {'\n'} 
        </Text>
        <Text style={styles.questionStyle}>
         15. Mengapa hasil pengecekan darah saya hasilnya 0mg/dl? Apa yang harus saya lakukan ?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          Kemungkinan terbesar adalah karena volume darah yang diteteskan ke test strip kurang banyak. Lakukan pengetesan ulang dengan mengulang tahapan nomor 12 di atas{'\n'}
        {'\n'} 
        </Text>
        <Text style={styles.questionStyle}>
         16. Bagaimana cara mengikuti event?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          - Untuk Event Offline anda dapat melakukan registrasi melalui contact person yang sudah tertera di informasi detail event.{'\n'}
          - Untuk Live Event, Anda dapat melakukan RSVP terlebih dahulu sebelum event berlangsung.{'\n'}
        {'\n'} 
        </Text>

      </View>
    </ScrollView>
  </View>
);

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
    paddingTop: Style.PADDING
  },
  questionStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'justify'
  },
  answerStyle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: Style.FONT_SIZE_SMALL,
    textAlign: 'justify'
  },
  textBold: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    fontWeight: 'bold',
  },
};

export default FaqScreen;
