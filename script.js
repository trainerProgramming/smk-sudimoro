window.addEventListener("load", ()=>{
  setTimeout(()=>{document.getElementById("loader").classList.add("hidden");},800);
});

function showSection(id){
 document.querySelectorAll(".section").forEach(s=>s.style.display="none");
 document.getElementById(id).style.display="block";
 updateDashboard();
}

let editBuku=-1, editAnggota=-1, editPinjam=-1;

// ===== BUKU =====
function tambahBuku(){
 let data=JSON.parse(localStorage.getItem("buku"))||[];
 let obj={judul:judulBuku.value,penulis:penulisBuku.value,tahun:tahunBuku.value};
 if(editBuku==-1) data.push(obj); else {data[editBuku]=obj; editBuku=-1;}
 localStorage.setItem("buku",JSON.stringify(data));
 tampilBuku(); updateDashboard();
}
function tampilBuku(){
 let data=JSON.parse(localStorage.getItem("buku"))||[];
 tabelBuku.innerHTML="<tr><th>No</th><th>Judul</th><th>Penulis</th><th>Tahun</th><th>Aksi</th></tr>";
 data.forEach((b,i)=>{
  tabelBuku.innerHTML+=`<tr><td>${i+1}</td><td>${b.judul}</td><td>${b.penulis}</td><td>${b.tahun}</td>
  <td><button class="btn-edit" onclick="editData('buku',${i})">Edit</button><br>
  <button class="btn-hapus" onclick="hapusData('buku',${i})">Hapus</button></td></tr>`;
 });
}

// ===== ANGGOTA =====
function tambahAnggota(){
 let data=JSON.parse(localStorage.getItem("anggota"))||[];
 let obj={nama:namaAnggota.value,alamat:alamatAnggota.value,gmail:gmailAnggota.value,tgl:tglGabung.value};
 if(editAnggota==-1) data.push(obj); else {data[editAnggota]=obj; editAnggota=-1;}
 localStorage.setItem("anggota",JSON.stringify(data));
 tampilAnggota(); updateDashboard();
}
function tampilAnggota(){
 let data=JSON.parse(localStorage.getItem("anggota"))||[];
 tabelAnggota.innerHTML="<tr><th>No</th><th>Nama</th><th>Alamat</th><th>Gmail</th><th>Tgl Gabung</th><th>Aksi</th></tr>";
 data.forEach((a,i)=>{
  tabelAnggota.innerHTML+=`<tr><td>${i+1}</td><td>${a.nama}</td><td>${a.alamat}</td><td>${a.gmail}</td><td>${a.tgl}</td>
  <td><button class="btn-edit" onclick="editData('anggota',${i})">Edit</button><br>
  <button class="btn-hapus" onclick="hapusData('anggota',${i})">Hapus</button></td></tr>`;
 });
}

// ===== PINJAM =====
function tambahPinjam(){
 let data=JSON.parse(localStorage.getItem("peminjaman"))||[];
 let obj={nama:namaPinjam.value,judul:judulPinjam.value,tgl:tglPinjam.value,status:statusPinjam.value,ket:ketPinjam.value};
 if(editPinjam==-1) data.push(obj); else {data[editPinjam]=obj; editPinjam=-1;}
 localStorage.setItem("peminjaman",JSON.stringify(data));
 tampilPinjam(); updateDashboard();
}
function tampilPinjam(){
 let data=JSON.parse(localStorage.getItem("peminjaman"))||[];
 tabelPinjam.innerHTML="<tr><th>No</th><th>Nama</th><th>Buku</th><th>Tgl</th><th>Status</th><th>Keterangan</th><th>Aksi</th></tr>";
 data.forEach((p,i)=>{
  tabelPinjam.innerHTML+=`<tr><td>${i+1}</td><td>${p.nama}</td><td>${p.judul}</td><td>${p.tgl}</td><td>${p.status}</td><td>${p.ket}</td>
  <td><button class="btn-edit" onclick="editData('peminjaman',${i})">Edit</button><br>
  <button class="btn-hapus" onclick="hapusData('peminjaman',${i})">Hapus</button></td></tr>`;
 });
}

// ===== EDIT & HAPUS =====
function editData(t,i){
 let data=JSON.parse(localStorage.getItem(t));
 let d=data[i];
 if(t=='buku'){judulBuku.value=d.judul;penulisBuku.value=d.penulis;tahunBuku.value=d.tahun;editBuku=i;}
 if(t=='anggota'){namaAnggota.value=d.nama;alamatAnggota.value=d.alamat;gmailAnggota.value=d.gmail;tglGabung.value=d.tgl;editAnggota=i;}
 if(t=='peminjaman'){namaPinjam.value=d.nama;judulPinjam.value=d.judul;tglPinjam.value=d.tgl;statusPinjam.value=d.status;ketPinjam.value=d.ket;editPinjam=i;}
}
function hapusData(t,i){
 let data=JSON.parse(localStorage.getItem(t));
 data.splice(i,1);
 localStorage.setItem(t,JSON.stringify(data));
 tampilBuku(); tampilAnggota(); tampilPinjam(); updateDashboard();
}

// DASHBOARD
function updateDashboard(){
 totalBuku.innerText=(JSON.parse(localStorage.getItem("buku"))||[]).length;
 totalAnggota.innerText=(JSON.parse(localStorage.getItem("anggota"))||[]).length;
 let p=JSON.parse(localStorage.getItem("peminjaman"))||[];
 totalTransaksi.innerText=p.length;
 bukuDipinjam.innerText=p.filter(x=>x.status=="Pinjam").length;
}

// INIT
showSection('beranda');
tampilBuku(); tampilAnggota(); tampilPinjam(); updateDashboard();