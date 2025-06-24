const today = new Date().toISOString().split("T")[0];

// Kiểm tra cookie đã hiển thị popup hôm nay chưa
const popupShown = document.cookie.includes("popupShownDate=" + today);

if (!popupShown) {
  fetch(`https://loi-chua-moi-ngay-d41fb-default-rtdb.asia-southeast1.firebasedatabase.app/loiChua/${today}.json`)
    .then(res => res.json())
    .then(data => {
      if (!data) return;

      // Tạo popup
      const popup = document.createElement("div");
      popup.innerHTML = `
        <div class="popup-wrapper">
          <img src="image/loichua.jpg" alt="Lời Chúa">
          <h2>${data.tieuDe}</h2>
          <p>${data.noiDung}</p>
          <button onclick="this.parentElement.remove()">Đóng</button>
        </div>
      `;
      document.body.appendChild(popup);

      // Lưu cookie đến 23:59 hôm nay
      // const expire = new Date();
      // expire.setHours(23, 59, 59);
      // document.cookie = `popupShownDate=${today}; expires=${expire.toUTCString()}; path=/`;
      // const expire = new Date(Date.now() + 10 * 60 * 1000); // 10 phút tính bằng mili giây
      // document.cookie = `popupShownDate=true; expires=${expire.toUTCString()}; path=/`;
    });
}
