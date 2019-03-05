// Form Class : menjelaskan apa saja pembagiannya
class Daftar {
    constructor(nim, nama, kelas, jurusan, judul, tanggal, waktu, email, deskripsi) {
        this.nim = nim;
        this.nama = nama;
        this.kelas = kelas;
        this.jurusan = jurusan;
        this.judul = judul;
        this.tanggal = tanggal;
        this.waktu = waktu;
        this.email = email;
        this.deskripsi = deskripsi;
    }
}

// UI Class : menjelaskan tugas tampilan
class UI {
    static displayDaftars() {      
        const daftars = Store.getDaftars();

        daftars.forEach((daftar) => UI.addDaftarToList(daftar));
    }

    static addDaftarToList(daftar) {
        const list = document.querySelector('#bimbingan-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${daftar.nim}</td>
            <td>${daftar.nama}</td>
            <td>${daftar.kelas}</td>
            <td>${daftar.jurusan}</td>
            <td>${daftar.judul}</td>
            <td>${daftar.tanggal}</td>
            <td>${daftar.waktu}</td>
            <td>${daftar.email}</td>
            <td>${daftar.deskripsi}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteDaftar(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }


    
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
    

    // Fungsi alert hilang dalam 3 setik
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#nim').value = '';
        document.querySelector('#nama').value = '';
        document.querySelector('#kelas').value = '';
        document.querySelector('#jurusan').value = '';
        document.querySelector('#judul').value = '';
        document.querySelector('#tanggal').value = '';
        document.querySelector('#waktu').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#deskripsi').value = '';
    }
}
// Store Class : melakukan penyimpanan
class Store {
  static getDaftars() {
    let daftars;
    if(localStorage.getItem('daftars') === null) {
        daftars = [];
    } else {
        daftars = JSON.parse(localStorage.getItem('daftars'));
    }

    return daftars;
  }

  static addDaftar(daftar) {
    const daftars = Store.getDaftars();
    daftars.push(daftar);
    localStorage.setItem('daftars', JSON.stringify(daftars));
  }

  static removeDaftar(deskripsi) {
      const daftars = Store.getDaftars();

      daftars.forEach((daftar, deskripsi) => {
        if(daftar.deskripsi === deskripsi){
            daftars.splice(deskripsi, 1);
        }
      });

      localStorage.setItem('daftars', JSON.stringify(daftars));
  }
}

// Event : nampilkan buku
document.addEventListener('DOMContentLoaded', UI.displayDaftars);
// Event : tambah buku
document.querySelector('#book-form').addEventListener('submit', (e) => {
    
    //Prevent actual submit
    e.preventDefault();
    
    //Get from Values
    const nim = document.querySelector('#nim').value;
    const nama = document.querySelector('#nama').value;
    const kelas = document.querySelector('#kelas').value;
    const jurusan = document.querySelector('#jurusan').value;
    const judul = document.querySelector('#judul').value;
    const tanggal = document.querySelector('#tanggal').value;
    const waktu = document.querySelector('#waktu').value;
    const email = document.querySelector('#email').value;
    const deskripsi = document.querySelector('#deskripsi').value;
    
    //Validasi

    if(nim === '' || nama === '' || kelas === '' || jurusan === ''|| judul === ''|| tanggal === ''|| waktu === ''|| email === ''|| deskripsi === ''){
        UI.showAlert('Jangan ada yang kosong', 'danger');
    } else {
         //instatiate Daftar

        const daftar = new Daftar(nim, nama, kelas, jurusan, judul, tanggal, waktu, email, deskripsi);

         //tambah Daftar ke UI
    
         UI.addDaftarToList(daftar);

         //tambah daftar ke store
         Store.addDaftar(daftar);

         //munculkan pesan pemberitahuan

         UI.showAlert('Daftar ditambahkan  ', 'success');

        //Clear fields

        UI.clearFields();
     }
});

// Event : hapus daftar

document.querySelector('#bimbingan-list').addEventListener('click', (e) => {
    //remove daftar dari UI
    UI.deleteDaftar(e.target);

    //remove daftar daftra daftar
    Store.removeDaftar(e.target.parentElement.previousElementSibling.textContent);

    // munculkan pesan pemberitahuan

    UI.showAlert('Daftar dikurangi', 'warning');

});