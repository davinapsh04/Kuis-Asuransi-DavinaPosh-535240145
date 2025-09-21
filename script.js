const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const APP = document.getElementById("app");
const STORAGE_USERS = "asuransi_users";
const STORAGE_PURCHASES = "asuransi_purch";
const STORAGE_PRODUCTS = "asuransi_prod";
const STORAGE_SESSION = "asuransi_sess";

const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
});
const idr = v => currency.format(Number(v) || 0);


let products = [
  { id:"h1", 
    type:"Health", 
    title:"Asuransi Kesehatan Rosewell", 
    img: "Rosewell.png",
    desc:"Perlindungan Kesehatan Individu",
    article: `
      <h3>Apa sih keunggulan produk Asuransi Kesehatan Rosewell?</h3>
      <p>Asuransi Kesehatan Individu yang memberikan manfaat komprehensif dan fleksibel sesuai perlindungan yang Anda butuhkan.</p>
      <ul>
        <li>Tersedia fasilitas tanya kepada dokter online mengenai kesehatan mental dan gizi.</li>
        <li>Fleksibel dalam memilih wilayah pertanggungan, tipe kamar dan batas manfaat tahunan sesuai kebutuhan Anda.</li>
        <li>Fasilitas asuransi kesehatan dengan pembayaran non-tunai yang berlaku di seluruh rekanan rumah sakit dan klinik kami.</li>
      </ul>
      <p><strong>Saran:</strong> Pilih paket tambahan (rider) jika ingin tanggungan lebih luas.</p>
    `,
    price:2000000},
  { id:"h2", 
    type:"Health", 
    title:"Asuransi Kesehatan Heartly Care", 
    img: "Heartly Care.png",
    desc:"Perlindungan Kesehatan Perorangan dan Keluarga",
    article: `
      <h3>Apa sih keunggulan produk Asuransi Kesehatan Heartly Care?</h3>
      <p>Asuransi Kesehatan yang memberikan penggantian biaya perawatan apabila pemegang polis atau keluarga menderita suatu penyakit atau mengalami kecelakaan disertai variasi tambahan yang terjangkau.</p>
      <ul>
        <li>Tersedia sistem pembayaran klaim reimbursement apabila perawatan dilakukan di luar rekanan rumah sakit dan klinik kami.</li>
        <li>Jika tidak ada catatan klaim selama 1 tahun polis dan pemegang polis melakukan perpanjangan polis, maka polis 
        perpanjangan akan mendapatkan diskon bonus yang dihitung dari premi polis tahun lalu.</li>
        <li>Pemegang polis mendapatkan manfaat rawat inap disertai pilihan berupa rawat jalan, persalinan, rawat gigi dan 
        manfaat tambahan pilihan berupa santunan harian untuk tambahan biaya rawat inap.</li>
      </ul>
      <p><strong>Saran:</strong> Pilih paket tambahan (rider) jika ingin tanggungan lebih luas.</p>
    `, 
    price:3500000 },
  { id:"c1", 
    type:"Car", 
    title:"Asuransi Mobil EcoBelle Auto",
    img: "Ecobelle Auto.png", 
    desc:"Perlindungan Mobil Ekonomis",
    article: `
      <h3>Apa sih keunggulan produk Asuransi Mobil EcoBelle Auto?</h3>
      <p>Asuransi Kendaraan yang memberikan jaminan penggantian biaya ekonomis terhadap kerusakan kendaraan Anda.</p>
      <ul>
        <li>Akomodasi taxi.</li>
        <li>Biaya derek dan evakuasi.</li>
        <li>Jaringan bengkel 24/7 hari.</li>
      </ul>
      <p><strong>Saran:</strong> Pilih paket tambahan (rider) jika ingin tanggungan lebih luas.</p>
    `, 
    price:4000000 },
  { id:"c2", 
    type:"Car", 
    title:"Asuransi Mobil Amara Protect",
    img: "Amara Protect.png",  
    desc:"Perlindungan Mobil Lengkap dan Praktis",
    article: `
      <h3>Apa sih keunggulan produk Asuransi Mobil Amara Protect?</h3>
      <p>Asuransi Kendaraan yang memberikan jaminan paling lengkap dan tidak ribet.</p>
      <ul>
        <li>Perlindungan penyeberangan antar pulau.</li>
        <li>Layanan towing prioritas dan bengkel resmi.</li>
        <li>Memberikan jaminan penggantian terhadap kerusakan rangka yang disebabkan oleh kecelakaan, tabrakan/benturan.</li>
      </ul>
      <p><strong>Saran:</strong> Pilih paket tambahan (rider) jika ingin tanggungan lebih luas.</p>
    `, 
    price:8000000 },
  { id:"l1", 
    type:"Life", 
    title:"Asuransi Jiwa GraceTerm", 
    img: "Graceterm.png",
    desc:"Santunan Jiwa Berjangka",
    article: `
      <h3>Apa sih keunggulan produk Asuransi Jiwa GraceTerm?</h3>
      <p>Asuransi Jiwa yang menawarkan jangka waktu masa pertanggungan tertentu.</p>
      <ul>
        <li>Proteksi finansial keluarga.</li>
        <li>Investasi jangka panjang dengan hasil yang terjamin.</li>
        <li>Ahli waris akan mendapatkan uang pertanggungan yang sama, asalkan jangka waktu polisnya masih berlaku.</li>
      </ul>
      <p><strong>Saran:</strong> Pilih paket tambahan (rider) jika ingin tanggungan lebih luas.</p>
    `, 
    price:10000000 },
  { id:"l2", 
    type:"Life", 
    title:"Asuransi Jiwa EverGrace",
    img: "Evergrace.png",  
    desc:"Santunan Jiwa Seumur Hidup",
    article: `
      <h3>Apa sih keunggulan produk Asuransi Jiwa EverGrace?</h3>
      <p>Asuransi Jiwa yang menawarkan manfaat jangka panjang yang dapat memberikan rasa aman dan kepastian bagi individu dan keluarga mereka.</p>
      <ul>
        <li>Memberikan perlindungan sepanjang hidup pemegang polis.</li>
        <li>Meningkatkan nilai harta yang diteruskan kepada generasi berikutnya.</li>
        <li>Membantu menggantikan pendapatan atau penghasilan yang hilang akibat kepergian pemegang polis.</li>
      </ul>
      <p><strong>Saran:</strong> Pilih paket tambahan (rider) jika ingin tanggungan lebih luas.</p>
    `, 
    price:15000000 }
];

if(!localStorage.getItem(STORAGE_PRODUCTS))
  localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(products));
else
  try{ 
    products = JSON.parse(localStorage.getItem(STORAGE_PRODUCTS)) || products 
  } catch(e) {}

  function loadUserz() {
      try{
        return JSON.parse(localStorage.getItem(STORAGE_USERS)) || []
      } catch(e) {
        return [] }
  }
  
  function saveUserz(u) { 
      localStorage.setItem(STORAGE_USERS, JSON.stringify(u)) 
  }

  function saveSess(email) { 
      localStorage.setItem(STORAGE_SESSION, JSON.stringify({email})); 
      updateNav(); 
  }

  function clearSess() { 
      localStorage.removeItem(STORAGE_SESSION); 
      updateNav(); 
  }

  function currentSess() { 
      try{ 
        return JSON.parse(localStorage.getItem(STORAGE_SESSION)) 
      } catch(e) { 
        return null } 
  }

  function currentUser() { 
      const s = currentSess(); 
      if(!s) return null; 
      return loadUserz().find(u=>u.email===s.email)
  }

  function loadPurch() { 
      try{ 
        return JSON.parse(localStorage.getItem(STORAGE_PURCHASES)) || [] 
      } catch(e) { 
        return [] } 
  }

  function savePurch(p) {
      localStorage.setItem(STORAGE_PURCHASES, JSON.stringify(p))
  }

  function router() {
      const hash = location.hash.replace("#","") || "home"; 
      renderRoute(hash)
  }

  window.addEventListener("hashchange", router);
  document.addEventListener("DOMContentLoaded", () => {
    setupNav();
    router();
  })

  function setupNav() {
      $("#nav-login").addEventListener("click", () => {});
      $("#nav-signup").addEventListener("click", () => {});
      $("#nav-history").addEventListener("click", () => {});
      $("#btn-logout").addEventListener("click", () => {
        clearSess(); 
        location.hash="home" });
      updateNav();
  }
  
  function updateNav() {
      const s = currentSess();
      const loginLink = $("#nav-login"), 
      signupLink = $("#nav-signup"), 
      historyLink = $("#nav-history"), 
      logoutBtn = $("#btn-logout");
      const userLabel = document.getElementById("userLabel");
      if(s && s.email) {
      loginLink.classList.add("invisible");
      signupLink.classList.add("invisible");
      historyLink.classList.remove("invisible");
      logoutBtn.classList.remove("invisible");
      const u = loadUserz().find(x => x.email === s.email);

      if (u && userLabel) userLabel.textContent = "Halo, " + u.name + " (｡˃ ᵕ ˂ )⸝♡ദ്ദി "; 
      } else {
        loginLink.classList.remove("invisible");
        signupLink.classList.remove("invisible");
        historyLink.classList.add("invisible");
        logoutBtn.classList.add("invisible");
        if (userLabel) userLabel.textContent = "";
      }
  }

  function renderRoute(route) {
      const [page, param] = route.split("/");
      if(page==="home") return renderHome();
      if(page==="products") return renderProducts();
      if(page==="product") return renderProductDetail(param);
      if(page==="login") return renderLogin();
      if(page==="signup") return renderSignup();
      if(page==="buy") return renderBuy(param);
      if(page==="checkout") return renderCheckout();
      if(page==="history") return renderHistory();
      renderHome();
  }

  function renderHome() {
      const s = currentSess();
      let html = `
          <section class="hero card">
          <div>
            <h1>Marketplace Asuransi Terbaik</h1>
            <h2>Kami hadir untuk memenuhi kebutuhan Asuransi Anda</h2>
            <p class="hint">
            Temukan produk asuransi untuk Anda dan keluarga. Pilih kebutuhan Anda. </p>
            <div style="margin-top:12px">
              <a class="btn" href="#products">Lihat Produk</a>
          `;

          if(!s || !s.email) {
            html += `
                  <a class="btn secondary" href="#signup" style="margin-left:8px">Sign Up</a>
                  <a class="btn secondary" href="#login" style="margin-left:8px">Login</a>
                  `;
          }
          
          html += `
          </div>
            </div>
            <div aria-hidden="true"></div>
          </section>
          <section class="card">
            <h3>Temukan produk yang pas</h3>
            <div class="products" id="featured"></div>
          </section>\n    
          <section class="card">
            <h3>Mengapa Kita Harus Memiliki Asuransi?</h3>
            <p>Sebenarnya, mengapa kita membutuhkan asuransi? Tanpa asuransi pun hidup akan tetap berjalan. 
            <br> Namun, setiap orang pasti pernah mengalami musibah yang membuatnya terpuruk dan berpikir “Apa yang akan saya lakukan agar ini semua cepat berlalu.” Nah, dari momen-momen sulit seperti itulah peran asuransi hadir 
            sebagai perlindungan yang mampu mengubah hidup Anda. 
            <br> Asuransi membantu mengurangi beban finansial ketika terjadi kejadian tak terduga seperti misalnya kecelakaan, 
            kerusakan kendaraan, atau biaya pengobatan besar. 
            <br> Di saat Anda sakit, asuransi kesehatan akan menanggung biaya pengobatannya. 
            <br> Saat Anda mengalami kerusakan kendaraan, asuransi mobil akan melindungi mobil Anda dari risiko kerugian, kerusakan atau kehilangan kendaraan akibat berbagai kejadian hal tak terduga. 
            <br> Untuk asuransi jiwa, keluarga yang ditinggalkan akan menerima uang pertanggungan sebagai salah satu jalan untuk melanjutkan hidup.</p>
            <h4>Dengan premi yang terencana, Anda dan keluarga akan memperoleh perlindungan dan ketenangan pikiran. 
            <br>Jadi tunggu apalagi, pilih produk asuransi sesuai kebutuhan (mobil, kesehatan, jiwa) dan bandingkan paket agar mendapatkan perlindungan terbaik.</h2>
          </section>
          `;

          APP.innerHTML = html;

          const featured = $("#featured");
          products.slice(0,4).forEach(p => {
            const el = document.createElement("div"); 
            el.className="product-card";
            el.innerHTML = `
              <img class="product-image prod-img" src="images/${p.img}" alt="${p.title}" /> 
              <h4>${p.title}</h4>
              <p>${p.desc}</p>
              <div class="price">
                ${idr(p.price)}
              </div>
              <div style="margin-top:8px">
                <a class="btn" href="#product/${p.id}">Pelajari Produk</a> 
                <a class="btn secondary" href="#buy/${p.id}">Ajukan Sekarang</a>
              </div>
              `;
              featured.appendChild(el);
            });  
  }

  function renderProducts() {
      APP.innerHTML = `
        <section class="card">
          <div class="hero" style="align-items:flex-start">
            <div>
            <h1>Produk Asuransi HerShield Insurance</h1>
            <p class="hint">Temukan produk asuransi sesuai kebutuhan Anda.</p>
            </div>
            <div></div>
          </div>
        </section>
        <section class="card categories"><div class="cat-grid" id="category-list"></div></section>
        <section class="card"><h3>Produk</h3><div id="products-grid" class="products"></div></section>
        `;
        
        const cats = $("#category-list");
        const catButtons = [
          {k:"all", t:"All Products", icon:"🏷"}, 
          {k:"Car", t:"Asuransi Mobil", icon:"🚗"}, 
          {k:"Health", t:"Asuransi Kesehatan", icon:"🏥"}, 
          {k:"Life", t:"Asuransi Jiwa", icon:"🛡️"}
        ];
        
        catButtons.forEach((c,i) => {
          const btn = document.createElement("button");
          btn.className = "cat-btn" + (i===0?" active":"");
          btn.dataset.cat = c.k;
          btn.innerHTML = `<span class="icon">${c.icon}</span><span>${c.t}</span>`;
          btn.addEventListener("click", () => {
            $$(".cat-btn").forEach(b=>b.classList.remove("active"));
            btn.classList.add("active");
            const cat = btn.dataset.cat;
            if(cat==="all") 
              renderProductsGrid(products); 
            else 
              renderProductsGrid(products.filter(p => p.type===cat));
          });
          cats.appendChild(btn);
        });
        renderProductsGrid(products);
  }

  function renderProductsGrid(list) {
      const grid = $("#products-grid");
      grid.innerHTML = "";
      if(list.length===0) { 
        grid.innerHTML = 
        '<p class="hint">Tidak ada produk pada kategori ini.</p>';
         return; 
      }
      list.forEach(p => {
        const d = document.createElement("div"); 
        d.className="product-card";
        d.innerHTML = `
              <img class="product-image prod-img" src="images/${p.img}" alt="${p.title}" class="prod-img">
              <h4>${p.title}</h4><p>${p.desc}</p>
              <div class="price">${idr(p.price)}</div>
              <div style="margin-top:8px">
                <a class="btn" href="#product/${p.id}">Pelajari Produk</a> 
                <a class="btn secondary" href="#buy/${p.id}">Ajukan Sekarang</a>
              </div>
              `;
        grid.appendChild(d);
      });
  }

  function renderProductDetail(id) {
      const p = products.find(x => x.id===id);
      if(!p) { 
        APP.innerHTML = 
        '<div class="card">Produk tidak ditemukan.</div>'; 
        return; 
      }
      APP.innerHTML = `
        <section class="card detail-card">
          <img class="product-image prod-img product-detail-img" src="images/${p.img}" alt="${p.title}"/> 
          <h2>${p.title}</h2>
          <p class="hint">${p.desc}</p>
          <p class="price">${idr(p.price)}</p>
          <div style="margin-top:12px">
            <a class="btn" href="#buy/${p.id}">Ajukan Sekarang</a> 
            <a class="btn secondary" href="#products">Kembali</a>
          </div>
        </section>

      <section class="card detail-card">
      ${p.article || '<p class="hint">Belum ada artikel untuk produk ini.</p>'}
      </section>
      `;
  }

  function renderLogin() {
      APP.innerHTML = `
        <section class="card"><h2>Login</h2>
        <form id="loginForm" class="form">
          <div class="form-row"><div class="field"><label for="loginEmail">Email</label><input id="loginEmail" type="email" required></div>
          <div class="field"><label for="loginPassword">Password</label><input id="loginPassword" type="password" required></div></div>
          <div><button class="btn" type="submit">Login</button> <a class="btn secondary" href="#signup" style="margin-left:8px">Sign Up</a></div>
          <p id="loginError" class="error" aria-live="polite"></p> 
        </form>
        </section>
      `;
      const form = $("#loginForm");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = $("#loginEmail").value.trim().toLowerCase();
        const pw = $("#loginPassword").value;
        const err = $("#loginError"); 
        err.textContent="";
        
        if(!email || !pw) {
          err.textContent = "Email dan kata sandi harus diisi."; 
          return;
        }
        if(!/^[\w.+-]+@[\w.-]+\.\w+$/.test(email)) {
          err.textContent = "Format email tidak valid.";
          return;
        }
        const users = loadUserz();
        const user = users.find(u => u.email===email && u.password===pw);
        
        if(!user) {
          err.textContent = "Email atau kata sandi salah."; 
          return;
        }
        
        saveSess(email);
        alert("Login berhasil. Selamat datang " + user.name);
        location.hash = "home";
      });
  }

  function renderSignup() {
      APP.innerHTML = `
        <section class="card"><h2>Sign Up</h2>
        <form id="signupForm" class="form">
          <div class="form-row"><div class="field"><label for="suName">Nama Lengkap</label><input id="suName" type="text" required></div>
          <div class="field"><label for="suEmail">Email</label><input id="suEmail" type="email" required></div></div>
          <div class="form-row"><div class="field"><label for="suPhone">No HP</label><input id="suPhone" type="tel" required></div>
          <div class="field"><label for="suPassword">Kata Sandi</label><input id="suPassword" type="password" required></div></div>
          <div class="form-row"><div class="field"><label for="suPassword2">Konfirmasi Kata Sandi</label><input id="suPassword2" type="password" required></div></div>
          <div><button class="btn" type="submit">Buat Akun</button> <a class="btn secondary" href="#home" style="margin-left:8px">Kembali</a></div>
          <p id="signupError" class="error" aria-live="polite"></p>
        </form>
        </section>
      `;
      
      const form = $("#signupForm");
      form.addEventListener("submit",(e) => {
        e.preventDefault();
        const name = $("#suName").value.trim();
        const email = $("#suEmail").value.trim().toLowerCase();
        const phone = $("#suPhone").value.trim();
        const pw = $("#suPassword").value;
        const pw2 = $("#suPassword2").value;
        const err = $("#signupError"); err.textContent="";
        if(!email || !pw || !name || !phone) {
          err.textContent = 
          "Email, kata sandi, nama, dan nomor handphone harus diisi."; 
          return; 
        }
        
        if(!/^[\w.+-]+@[\w.-]+\.\w+$/.test(email)) {
          err.textContent = 
          "Format email tidak valid."; 
          return; 
        }
        
        if(pw.length < 8) {
          err.textContent = 
          "Kata sandi minimal 8 karakter."; 
          return; 
        }
        
        if(pw !== pw2) {
          err.textContent = 
          "Kata sandi dan konfirmasi harus sama.";
          return;
        }
        
        if(name.length < 3 || name.length > 32 || /\d/.test(name)) {
          err.textContent = 
          "Nama harus 3-32 karakter dan tidak boleh mengandung angka."; 
          return;
        }
        
        if(!/^08\d{8,14}$/.test(phone)) {
          err.textContent = 
          "Nomor HP harus diawali 08 dan panjang 10-16 digit."; 
          return;
        }
        
        const users = loadUserz();
        if(users.find(u => u.email===email)) {
          err.textContent = "Email sudah terdaftar.";
          return;
        }
        users.push({ name, email, phone, password: pw });
        saveUserz(users);
        alert("Pendaftaran berhasil. Silakan login.");
        location.hash="login";
      });
  }

  function renderBuy(prodId) {
      const p = products.find(x => x.id===prodId);
      if(!p) {
        APP.innerHTML = 
        '<div class="card">Produk tidak ditemukan.</div>'; 
        return;
      }
      
      if(!currentSess()) {
        alert("Silakan login terlebih dahulu."); 
        location.hash="login"; 
        return;
      }
      
      if(p.type==="Car") 
        return renderBuyCar(p);
      if(p.type==="Health") 
        return renderBuyHealth(p);
      if(p.type==="Life") 
        return renderBuyLife(p);
  }

  function renderBuyCar(p) {
      APP.innerHTML = `
        <section class="card"><h2>Isi Form Pembelian: ${p.title}</h2>
        <form id="buyCarForm" class="form" enctype="multipart/form-data">
        <div class="form-row"><div class="field"><label for="merk">Merk mobil</label><input id="merk" required></div><div class="field"><label for="jenis">Jenis mobil</label><input id="jenis" required></div></div>
        <div class="form-row"><div class="field"><label for="tahun">Tahun pembuatan</label><input id="tahun" type="number" min="1900" required></div><div class="field"><label for="hargaMobil">Harga mobil (Rp)</label><input id="hargaMobil" type="number" min="0" required></div></div>
        <div class="form-row"><div class="field"><label for="plat">Nomor plat</label><input id="plat" required></div><div class="field"><label for="noMesin">No. mesin</label><input id="noMesin" required></div></div>
        <div class="form-row"><div class="field"><label for="noRangka">No. rangka</label><input id="noRangka" required></div><div class="field"><label for="namaPemilik">Nama pemilik</label><input id="namaPemilik" required></div></div>
        <fieldset style="margin-top:8px;border:1px dashed rgba(255,183,215,0.5);padding:10px;border-radius:8px"><legend>Unggah Foto (semua wajib diisi)</legend>
          <div class="form-row"><div class="field"><label for="fotoFront">Foto tampak depan</label><input id="fotoFront" type="file" accept="image/*" required></div>
          <div class="field"><label for="fotoBack">Foto tampak belakang</label><input id="fotoBack" type="file" accept="image/*" required></div></div>
          <div class="form-row"><div class="field"><label for="fotoLeft">Foto sisi kiri</label><input id="fotoLeft" type="file" accept="image/*" required></div>
          <div class="field"><label for="fotoRight">Foto sisi kanan</label><input id="fotoRight" type="file" accept="image/*" required></div></div>
          <div class="form-row"><div class="field"><label for="fotoDash">Foto dashboard</label><input id="fotoDash" type="file" accept="image/*" required></div>
          <div class="field"><label for="fotoEngine">Foto mesin</label><input id="fotoEngine" type="file" accept="image/*" required></div></div>
        </fieldset>
        <div style="margin-top:12px"><button class="btn" type="submit">Hitung Premi & Checkout</button></div>
        <p id="carError" class="error" aria-live="polite"></p>
        </form>
        </section>
      `;
      
      const form = $("#buyCarForm");
      form.addEventListener("submit",(e) => {
        e.preventDefault();
        const merk = $("#merk").value.trim();
        const jenis = $("#jenis").value.trim();
        const tahun = Number($("#tahun").value);
        const harga = Number($("#hargaMobil").value);
        const plat = $("#plat").value.trim();
        const noMesin = $("#noMesin").value.trim();
        const noRangka = $("#noRangka").value.trim();
        const namaPemilik = $("#namaPemilik").value.trim();
        const err = $("#carError"); err.textContent="";

        if(!merk||!jenis||!tahun||isNaN(harga)||!plat||!noMesin||!noRangka||!namaPemilik) {
          err.textContent = 
          "Semua field harus diisi.";
          return;
        }
        
        const files = ["fotoFront","fotoBack","fotoLeft","fotoRight","fotoDash","fotoEngine"];
        for(const id of files) {
          const f = document.getElementById(id).files;
          if(!f || f.length===0) {
            err.textContent = "Semua foto harus diunggah.";
            return;
          }
        }
        
        const currentYear = new Date().getFullYear();
        const umur = currentYear - tahun;
        let premi;
        if(umur <= 3) 
          premi = 0.025 * harga;
        else if(umur > 3 && umur <=5)
          premi = (harga < 200000000) ? 0.04*harga : 0.03*harga;
        else premi = 0.05 * harga;
        
        const payload = {
          productId: p.id, 
          type:"Car", 
          productName:p.title, 
          details:{ merk, jenis, tahun, harga, plat, noMesin, noRangka, namaPemilik },
          price: Math.round(premi), 
          date: new Date().toISOString() 
        };
        sessionStorage.setItem("checkout", JSON.stringify(payload));
        location.hash = "checkout";
      });
  }

  function renderBuyHealth(p) {
      APP.innerHTML = `
        <section class="card"><h2>Isi Form Pembelian: ${p.title}</h2>
        <form id="buyHealthForm" class="form">
          <div class="form-row"><div class="field"><label for="fullName">Nama sesuai KTP</label><input id="fullName" required></div>
          <div class="field"><label for="dob">Tanggal Lahir</label><input id="dob" type="date" required></div></div>
          <div class="form-row"><div class="field"><label for="pekerjaan">Pekerjaan</label><input id="pekerjaan" required></div>
          <div class="field"><label for="merokok">Merokok</label><select id="merokok"><option value="0">Tidak</option><option value="1">Ya</option></select></div></div>
          <div class="form-row"><div class="field"><label for="hipertensi">Riwayat hipertensi</label><select id="hipertensi"><option value="0">Tidak</option><option value="1">Ya</option></select></div>
          <div class="field"><label for="diabetes">Diabetes</label><select id="diabetes"><option value="0">Tidak</option><option value="1">Ya</option></select></div></div>
          <div style="margin-top:12px"><button class="btn" type="submit">Hitung Premi & Checkout</button></div>
          <p id="healthError" class="error" aria-live="polite"></p>
        </form>
        </section>
      `;
        
      $("#buyHealthForm").addEventListener("submit",(e) => {
        e.preventDefault();
        const fullName = $("#fullName").value.trim();
        const dob = $("#dob").value;
        const pekerjaan = $("#pekerjaan").value.trim();
        const merokok = Number($("#merokok").value);
        const hipertensi = Number($("#hipertensi").value);
        const diabetes = Number($("#diabetes").value);
        const err = $("#healthError"); err.textContent="";
        
        if(!fullName||!dob||!pekerjaan) {
          err.textContent = "Lengkapi semua field.";
          return;
        }
        const birth = new Date(dob); 
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear(); 
        const m = today.getMonth() - birth.getMonth();
        if(m < 0 || (m===0 && today.getDate() < birth.getDate())) age--;
        const P = 2000000;
        let mFactor = 0.2;
        if(age <=20) mFactor = 0.1;
        else if(age <=35) mFactor = 0.2;
        else if(age <=50) mFactor = 0.25;
        else mFactor = 0.4;
        const premi = P + (mFactor * P) + (merokok * 0.5 * P) + (hipertensi * 0.4 * P) + (diabetes * 0.5 * P);
        const payload = { 
          productId: p.id, 
          type:"Health", 
          productName:p.title, 
          details:{ fullName, dob, pekerjaan, merokok, hipertensi, diabetes, age }, 
          price: Math.round(premi), 
          date: new Date().toISOString()
        };
        sessionStorage.setItem("checkout", JSON.stringify(payload));
        location.hash = "checkout";
      });
  }

  function renderBuyLife(p) {
      APP.innerHTML = `
        <section class="card"><h2>Isi Form Pembelian: ${p.title}</h2>
        <form id="buyLifeForm" class="form">
          <div class="form-row"><div class="field"><label for="nameLife">Nama Lengkap</label><input id="nameLife" required></div>
          <div class="field"><label for="dobLife">Tanggal Lahir</label><input id="dobLife" type="date" required></div></div>
          <div class="form-row"><div class="field"><label for="coverage">Besaran pertanggungan</label>
          <select id="coverage"><option value="1000000000">Rp1.000.000.000</option><option value="2000000000">Rp2.000.000.000</option><option value="3500000000">Rp3.500.000.000</option><option value="5000000000">Rp5.000.000.000</option><option value="10000000000">Rp10.000.000.000</option></select></div></div>
          <div style="margin-top:12px"><button class="btn" type="submit">Hitung Premi & Checkout</button></div>
          <p id="lifeError" class="error" aria-live="polite"></p>
        </form>
        </section>
      `;
    
    $("#buyLifeForm").addEventListener("submit",(e) => {
      e.preventDefault();
      const name = $("#nameLife").value.trim();
      const dob = $("#dobLife").value;
      const t = Number($("#coverage").value);
      const err = $("#lifeError"); err.textContent="";
      if(!name||!dob||!t) {
        err.textContent = 
        "Lengkapi semua field.";
        return;
      }
      const birth = new Date(dob); 
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear(); 
      const m = today.getMonth() - birth.getMonth();
      if(m < 0 || (m===0 && today.getDate() < birth.getDate())) age--;
      let mRate = 0.002;
      if(age <= 30) mRate = 0.002;
      else if(age <= 50) mRate = 0.004;
      else mRate = 0.01;
      const monthly = Math.round(mRate * t);
      const payload = { productId: p.id, type:"Life", productName:p.title, details:{ name, dob, age, coverage:t }, price: monthly, date: new Date().toISOString() };
      sessionStorage.setItem("checkout", JSON.stringify(payload));
      location.hash = "checkout";
    });
  }

  function renderCheckout() {
      const temp = sessionStorage.getItem("checkout");
      if(!temp) {
        APP.innerHTML = 
        '<div class="card">Tidak ada data checkout. Pilih produk terlebih dahulu.</div>'; 
        return;
      }
      const payload = JSON.parse(temp);
      if(!currentSess()) {
        alert("Silakan login terlebih dahulu.");
        location.hash="login";
        return;
      }
      
      APP.innerHTML = `
        <section class="card"><h2>Checkout</h2>
        <p>Produk: <strong>${payload.productName}</strong></p>
        <p>Jenis: <strong>${payload.type}</strong></p>
        <p>Harga premi: <strong>${idr(payload.price)}</strong> ${payload.type==="Life"?" / bulan":""}</p>
        <form id="checkoutForm" class="form">
          <div class="form-row"><div class="field"><label for="metode">Metode Pembayaran</label><select id="metode"><option value="transfer">Transfer</option><option value="va">Virtual Account</option></select></div></div>
          <div style="margin-top:12px"><button class="btn" type="submit">Bayar & Selesai</button></div>
        </form>
        </section>
      `;
      
      $("#checkoutForm").addEventListener("submit",(e) => {
        e.preventDefault();
        const purchases = loadPurch();
        const user = currentUser();
        const payload = JSON.parse(sessionStorage.getItem("checkout"));
        purchases.push({ 
          id:"PUR"+Date.now(), 
          user:user.email, 
          productId: payload.productId, 
          productName: payload.productName, 
          type: payload.type, 
          price: payload.price, 
          date: payload.date || new Date().toISOString(), 
          status:"Lunas" });
          savePurch(purchases);
          sessionStorage.removeItem("checkout");
          alert("Pembayaran berhasil. Terima kasih!");
          location.hash = "history";
        });
  }

  function renderHistory() {
      if(!currentSess()) {
        alert("Login dulu untuk melihat histori"); 
        location.hash="login";
        return;
      }
      
      const s = currentSess();
      const purchases = loadPurch().filter(p => p.user===s.email);
      let html = `
      <section class="card">
      <h2>Histori Pembelian</h2>
      `;
      if(purchases.length===0) {
        html += '<p class="hint">Belum ada histori pembelian.</p></section>'; 
        APP.innerHTML = html; 
        return; 
      }
      
      html += `
      <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Produk</th>
            <th>Jenis</th>
            <th>Tanggal</th>
            <th>Harga</th>
            <th>Status</th>
          </tr>
        </thead>
      <tbody>
      `;
      purchases.forEach((p,idx) => {
        html += `
        <tr><td>${idx+1}</td>
        <td>${p.productName}</td>
        <td>${p.type}</td>
        <td>${new Date(p.date).toLocaleString()}</td>
        <td>${idr(p.price)}</td>
        <td>${p.status}</td>
        </tr>
        `;
      });
      
      html += "</tbody></table></div></section>";
      APP.innerHTML = html;
  }