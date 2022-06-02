<template>
    <footer class="footer has-cards" style="margin-top: -500px;">
        <!-- <div class="container container-lg">
            <div class="row">
                <div class="col-md-6 mb-5 mb-md-0">
                    <div class="card card-lift--hover shadow border-0">
                        <router-link to="/landing" title="Landing Page">
                            <img v-lazy="'img/theme/landing.jpg'" class="card-img">
                        </router-link>
                    </div>
                </div>
                <div class="col-md-6 mb-5 mb-lg-0">
                    <div class="card card-lift--hover shadow border-0">
                        <router-link to="/profile" title="Profile Page">
                            <img v-lazy="'img/theme/profile.jpg'" class="card-img">
                        </router-link>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="container">
            <!-- <div class="row row-grid align-items-center my-md">
                <div class="col-lg-6">
                    <h3 class="text-primary font-weight-light mb-2">Thank you for supporting us!</h3>
                    <h4 class="mb-0 font-weight-light">Let's get in touch on any of these platforms.</h4>
                </div>
                <div class="col-lg-6 text-lg-center btn-wrapper">
                    <a target="_blank" rel="noopener" href="https://twitter.com/creativetim"
                       class="btn btn-neutral btn-icon-only btn-twitter btn-round btn-lg" data-toggle="tooltip"
                       data-original-title="Follow us">
                        <i class="fa fa-twitter"></i>
                    </a>
                    <a target="_blank" rel="noopener" href="https://www.facebook.com/creativetim"
                       class="btn btn-neutral btn-icon-only btn-facebook btn-round btn-lg" data-toggle="tooltip"
                       data-original-title="Like us">
                        <i class="fa fa-facebook-square"></i>
                    </a>
                    <a target="_blank" rel="noopener" href="https://dribbble.com/creativetim"
                       class="btn btn-neutral btn-icon-only btn-dribbble btn-lg btn-round" data-toggle="tooltip"
                       data-original-title="Follow us">
                        <i class="fa fa-dribbble"></i>
                    </a>
                    <a target="_blank" rel="noopener" href="https://github.com/creativetimofficial"
                       class="btn btn-neutral btn-icon-only btn-github btn-round btn-lg" data-toggle="tooltip"
                       data-original-title="Star on Github">
                        <i class="fa fa-github"></i>
                    </a>
                </div>
            </div> -->
            <hr>
            <div class="row align-items-center justify-content-md-between">
                <a href="https://api.whatsapp.com/send?phone=6285715451956&text=Hallo Saya Mau Pesan" class="float" target="_blank">
                    <i class="fa fa-whatsapp my-float"></i>
                </a>

                <!-- ======================= TANIKU ===================== -->
                <div class="container">
                    <div class="row row-grid mt-5">
                        <div class="col-lg-4">
                            <icon name="fa fa-phone" size="lg" gradient="white" shadow round color="primary"></icon>
                            <h5 class=" mt-3">Hubungi kami</h5>
                            <p class=" mt-3">
                                <i class="fa fa-whatsapp" aria-hidden="true"></i><a href="https://api.whatsapp.com/send?phone=6285715451956&text=Hallo Saya Mau Pesan" target="_blank" style="color: black"> 085715451956</a> <br>
                                <i class="fa fa-instagram" aria-hidden="true"></i><a href="https://www.instagram.com/taniku.official/" target="_blank" style="color: black"> Taniku.official</a><br>
                                <i class="fa fa-envelope-o" aria-hidden="true"></i><a href="#" style="color: black"> hallotaniku@gmail.com</a><br>
                            </p>
                        </div>
                        <div class="col-lg-4">
                            <icon name="fa fa-info" size="lg" gradient="white" shadow round color="primary"></icon>
                            <h5 class=" mt-3">Bantuan & Panduan</h5>
                            <p class=" mt-3">
                                <router-link :to="'/bantuan'">Tentang</router-link> <br>
                                <router-link :to="'/panduan-transaksi'">Panduan Transaksi</router-link> <br>
                                <router-link :to="'/syarat-pengguna'">Syarat & Ketentuan Penggunaan</router-link> <br>
                                <!-- Kebijakan & Privasi -->
                            </p>
                        </div>
                        <div class="col-lg-4">
                            <icon name="fa fa-map-marker" size="lg" gradient="white" shadow round color="primary"></icon>
                            <h5 class=" mt-3">Maps Official Store</h5>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.845501167987!2d106.06730373914479!3d-6.315415839340202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e4223b6d8d9c9b9%3A0x655a32d6317932fe!2sTANIKU%20official!5e0!3m2!1sid!2sid!4v1649140804531!5m2!1sid!2sid" width="340" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63471.77053869896!2d106.10501922216449!3d-6.132628699999982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e418b93893af17b%3A0x9f07cca5ff9d3a17!2sWarung%20sayur%20%26%20sembako%20ibu%20ani!5e0!3m2!1sid!2sid!4v1648453399091!5m2!1sid!2sid" width="340" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> -->
                        </div>
                    </div>
                </div>

                <!-- ======== SAYUR IBU ANI ========= -->
                <div class="col-md-6">
                    <div class="copyright">
                        &copy; {{year}}
                        <a href="#" target="_blank" rel="noopener">Tanikuofficial.com</a>
                    </div>
                </div>
                <!-- <div class="col-md-6">
                    <ul class="nav nav-footer justify-content-end">
                        <li class="nav-item">
                            <a href="https://www.creative-tim.com" class="nav-link" target="_blank" rel="noopener">Creative Tim</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://www.creative-tim.com/presentation" class="nav-link" target="_blank" rel="noopener">About
                                Us</a>
                        </li>
                        <li class="nav-item">
                            <a href="http://blog.creative-tim.com" class="nav-link" target="_blank" rel="noopener">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md"
                               class="nav-link" target="_blank" rel="noopener">MIT License</a>
                        </li>
                    </ul>
                </div> -->
            </div>
        </div>
    </footer>
</template>
<style scoped>
    .float{
        position:fixed;
        width:60px;
        height:60px;
        bottom:40px;
        right:40px;
        background-color:#25d366;
        color:#FFF;
        border-radius:50px;
        text-align:center;
      font-size:30px;
        box-shadow: 2px 2px 3px #999;
      z-index:100;
    }

    .my-float{
        margin-top:16px;
    }
</style>
<script>
export default {
  name: 'app-footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
</style>
