<template>
  <div class="footer-wrapper">
    <div class="footer-top">
    <div class="footer-about">
      <h2>Giới thiệu</h2>
      <p>
        R&B luôn xem trọng chất lượng và sức khỏe của người tiêu dùng. 
        Đến với R&B chúng tôi tự hào với đội ngũ hơn 30 năm kinh nghiệm kỹ thuật về trà sẽ mang đến cho thực khách các loại trà ngon nhất sánh tầm với Thế giới...
      </p>
    </div>

    <div class="footer-contact">
      <h2>Liên hệ</h2>
      <p>R&B Tea Việt Nam</p>
      <p>Số ĐKKD: 41E8052150, cấp 15/06/2024</p>
      <p>MST: 0302166322-002</p>
      <p>Hotline: 0898.222.633</p>
      <p>Địa chỉ: 190 Trần Hưng Đạo, P.11, Q.5, TP.HCM</p>
    </div>

    <div class="footer-social">
        <p>
            <a href="http://online.gov.vn/Home/WebDetails/95013">
                <img src="@/assets/bộ công thương.png" alt="bô công thương" >
            </a>
        </p>
      <h2>Kết nối với chúng tôi</h2>
      <div class="social-icons">
        <i class="fa-brands fa-tiktok">
            <img src="@/assets/tiktok.webp" alt="TikTok logo" style="height: 40px;">
        </i>
        <i class="fa-brands fa-facebook">
            <img src="@/assets/facebook-like.svg" alt="fblike" style="height: 40px;">
        </i>
        <i class="fa-brands fa-youtube">
            <img src="@/assets/ytb.webp" alt="ytb" style="height: 40px;">
        </i>
        <!-- <img src="./image/bo-cong-thuong.webp" alt="Bộ Công Thương" style="height: 40px;"> -->
      </div>
      <br>
        <img src="@/assets/dmca.webp" alt="DMCA" style="height: 40px; border-radius: 10px;">
    </div>
  </div>

  <div class="footer-bottom">
    <p>
      <a href="#">Giới thiệu</a> | 
      <a href="#">Điều khoản sử dụng</a> | 
      <a href="#">Chính sách bảo mật</a> 
      &nbsp;&nbsp;Copyright 2025 © Central Tea.
    </p>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
    .footer-wrapper {
  background-color: #000;
  color: white;
  font-family: Arial, sans-serif;
  font-size: 14px;
  padding-top: 40px;
  padding-bottom: 20px;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  max-width: calc(100% - 367.2px); /* 100% - 2 * 183.6px */
  margin: 0 auto 30px auto;
  gap: 40px;
}

.footer-about,
.footer-contact,
.footer-social {
  flex: 1;
}

.footer-top h2 {
  font-size: 20px;
  margin-bottom: 15px;
  color: white;
}

.footer-top p {
  line-height: 1.6;
  color: #ccc;
}

.footer-social .social-icons {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
}

.footer-social i {
  font-size: 20px;
  color: white;
  transition: 0.3s;
}

.footer-social i:hover {
  color: #ffd700;
}

.footer-bottom {
  text-align: center;
  border-top: 1px solid #333;
  padding-top: 15px;
  font-size: 13px;
  color: #aaa;
}

.footer-bottom a {
  color: #aaa;
  text-decoration: none;
}

.footer-bottom a:hover {
  color: #ffd700;
}

</style>