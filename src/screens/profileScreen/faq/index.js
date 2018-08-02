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
          Bagaimana cara registrasi akun Teman Diabetes ?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          Registrasi Teman Diabetes dapat dilakukan melalui 3 cara:{'\n'}
          {'\n'}
          1. Email : untuk register melalu email, pilih “Buat Akun”, kemudian ikuti langkah
          registrasi (Nama Lengkap, Email, Password & Tipe User). {'\n'}
          {'\n'}
          2. Facebook : untuk register melalui Facebook, pilih masuk melalui Facebook, kemudian
          ikuti langkah registrasinya.{'\n'}
          {'\n'}
          3. Google+ : untuk register melalui Google+, pilih masuk melalui Google+, kemudian ikuti
          langkah registrasinya. {'\n'}
          {'\n'}
          Setelah proses registrasi Anda selesai, Anda akan mendapat email yang berisi keterangan
          bahwa Anda telah melakukan registrasi di Teman Diabetes dan akun Anda secara otomatis
          sudah aktif. {'\n'} {'\n'}
          Note : Jika Anda mendapat email dan Anda merasa tidak pernah melakukan pendaftaran di
          Aplikasi Teman Diabetes, maka Anda dapat melakukan pelaporan melalui link “Laporkan” yang
          ada di dalam email. {'\n'}
          {'\n'}
        </Text>
        <Text style={styles.questionStyle}>
          Apakah saya bisa mengundang teman, keluarga bahkan dokter saya ?
          {'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          Bisa, Anda dapat mengundang teman, keluarga bahkan dokter Anda untuk menggunakan aplikasi
          Teman Diabetes dengan mengirimkan link untuk download melalui email dan Whatsapp. {'\n'}
          {'\n'}
        </Text>
        <Text style={styles.questionStyle}>
          Apakah tombol darurat itu dan bagaimana cara kerjanya ?
          {'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          Tombol Darurat berfungsi sebagai bantuan di saat Anda dalam keadaan darurat, klik Tombol
          Darurat saat Anda membutuhkan bantuan sesuai dengan level kondisi Anda (Rendah, Parah,
          Tinggi), maka aplikasi akan segera mengirimkan notifikasi kepada Inner Circle Anda sebagai
          informasi bahwa Anda membutuhkan bantuan darurat.
          {'\n'}
          {'\n'}
        </Text>
        <Text style={styles.questionStyle}>
          Apakah saya harus registrasi GoApotik agar dapat bertransaksi ?{'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          Ya, untuk dapat melakukan transaksi di GoApotik, terlebih dahulu Anda harus melakukan
          registrasi. {'\n'} {'\n'}
        </Text>
        <Text style={styles.questionStyle}>
          Bagaimana mengatur pill reminder, consent (rekam medis) dan lingkaran dalam ? {'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          1. Pill Reminder : untuk menggunakan Pill Reminder, klik “Pengingat Obat” di halaman
          Riwayat dan Estimasi, kemudian tambahkan Nama Obat dan waktu remindernya (jam, sebelum
          makan, sesudah makan), Simpan perubahan Anda, aktifkan notifikasi dengan menggeser button
          menjadi hijau.{'\n'} {'\n'}
          2. Rekam Medis : Anda dapat memasukkan data Rekam Medis melalui menu Masukkan Pelacak,
          rekam medis yang dapat Anda masukkan adalah data sbb : {'\n'} {'\n'}
          Gula Darah : untuk gula darah, Anda dapat memasukkan data secara manual atau
          menggunakan Dnurse.{'\n'} {'\n'}
          hba1c : untuk memasukkan hba1c, Anda cukup klik pada hba1c dan masukkan angka hba1c
          Anda.{'\n'} {'\n'}
          Makanan : untuk makanan, Anda dapat memasukkan data sarapan, makan siang, makan malam &
          snack, selain itu Anda dapat mengatur tanggal dan jam terkait dengan inputan makanan Anda.
          {'\n'} {'\n'}
          Aktivitas : pilih aktivitas yang Anda lakukan Ringan, Sedang atau Berat. {'\n'}
          {'\n'}
          Berat : masukkan data berat badan Anda dengan menuliskan angka berat badan Anda.{'\n'}
          {'\n'}
          3. Lingkaran Dalam : untuk mengatur lingkaran dalam Anda dapat dilakukan melalui menu
          “Pengaturan – Inner Circle List”.{'\n'}
          {'\n'}
          a. Tambah Lingkaran Dalam : cari nama pengguna yang Anda ingin tambahkan dan klik tanda +{' '}
          {'\n'}
          {'\n'}
          b. Menghapus Lingkaran Dalam : melalui menu Profile, pilih tab Lingkaran Dalam – pilih tab
          Lingkaran Dalam, kemudian klik tanda X untuk menghapus list lingkaran dalam Anda.
          {'\n'}
          {'\n'}
          c. Menerima & Menolak Permintaan : untuk dapat menerima permintaan Lingkaran Dalam, buka
          menu Lingkaran Dalam di Profile – pilih tab Lingkaran Dalam – pilih tab Permintaan, klik
          di tanda V untuk menerima permintaan Lingkaran Dalam, klik X untuk menolak permintaan.
          {'\n'}
          {'\n'}
          d. Melihat list permintaan tertunda : buka menu Profile – pilih tab Lingkaran Dalam –
          pilih tab Tertunda, Anda dapat melihat list permintaan Anda yang tertunda di menu tsb.
          Maksimal permintaan Lingkaran Dalam yang dapat Anda kirimkan sebanyak 10 permintaan.{'\n'}
          {'\n'}
        </Text> 
        <Text style={styles.questionStyle}>
          Mengapa saya perlu memberitahu lokasi saya ?
          {'\n'}
        </Text>
        <Text style={styles.answerStyle}>
        Lokasi Anda diperlukan di fitur Emergency Button (untuk mengetahui titik lokasi provider kesehatan terdekat dari lokasi Anda) dan di fitur Belanja (untuk mengetahui lokasi apotik terdekat dari lokasi Anda).
        {'\n'}
        {'\n'}
        Untuk mengisi alamat lengkap dapat dilakukan dengan langkah sebagai berikut : Buka Burger Menu (menu dengan icon 3 garis di sebelah kiri atas aplikasi) – klik icon setting di sebelah kiri bawah – pilih Edit Profile – Lengkapi bagian Alamat dengan menuliskan alamat lengkap Anda (misal : Perumahan Green Garden Blok C3/25, Serpong, Tangerang Selatan)
        {'\n'}
        {'\n'}
        </Text>
        
        <Text style={styles.questionStyle}>
          Bagaimana cara menggunakan Teman Diabetes ?
          {'\n'}
        </Text>
        <Text style={styles.answerStyle}>
          Pastikan Anda sudah mengunduh aplikasi Teman Diabetes, kemudian ikuti langkah menggunakan
          Teman Diabetes : {'\n'}
          {'\n'}
          1. Pasang Teman Diabetes pada 3.5mm jack headset Anda. {'\n'}
          {'\n'}
          2. Pasang test strip pada Teman Diabetes, pastikan posisi test strip Anda benar.{'\n'}
          {'\n'}
          3. Tusuk jari Anda menggunakan alat yang telah disediakan dan teteskan pada teststrip.
          {'\n'}
          {'\n'}
          4. Tunggu, maka hasilnya akan muncul di aplikasi Anda.{'\n'}
        </Text>

      <WebView
         style={{flex:1, height : 300,}}
         javaScriptEnabled={true}
         source={{html: videoTag}} />
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
};

export default FaqScreen;
