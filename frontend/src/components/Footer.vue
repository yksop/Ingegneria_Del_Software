<template>
<!-- FOOTER OF THE PAGE-->
    <div class="footer">
        <div class="info_DX text-center">
            <text class="title">CHI SIAMO</text><br><br>
            <text>Associazione Volontari Trentini Connessi</text><br><br>
            <a href="https://www.google.com/maps/place/Povo+%22Polo+Scientifico%22+Est/@46.067131,11.15051,18z/data=!3m1!4b1!4m6!3m5!1s0x478276eaccc6bc6b:0x612ca7e9c9aa76b!8m2!3d46.067131!4d11.15051!16s%2Fg%2F11dxkg5d0p?entry=ttu" class="link">
                <text>Sede Legale: Via Sommarive, 9 Trento (TN), <br> CAP 38123, Italia </text>
            </a>
        </div>
        
        <div class="motto">
            <text class="title">MOTTO</text><br><br>
            <text id="inject_frasi">
                - Quell’Umanità che è il primo Principio della Croce Rossa, da sempre alla base di ogni sua azione, dalla più piccola alla più grande, in ogni parte del mondo e che ne anima il motto: “Tutti Fratelli” -
            </text> <br><br>
            <text class="inject_author">
                Croce Rossa Italiana
            </text>
        </div>

        <div class="footer-copyright">
            <div>
                <text class="title">SEGUICI</text><br><br>
                <a href="https://www.facebook.com">
                    <img src="@/components/icons/facebook.png" alt="Facebook logo" class="footer-logo">
                </a>
                <a href="https://www.whatsapp.com">
                    <img src="@/components/icons/whatsapp.png" alt="WhatsApp logo" class="footer-logo">
                </a>
                <a href="https://www.instagram.com">
                    <img src="@/components/icons/instagram.png" alt="Instagram logo" class="footer-logo">
                </a>
                <a href="https://cri.it">
                    <img src="@/components/icons/cri.png" class="footer-logo">
                </a>
            </div>
            <div class="padd-5">
                <p>
                    <text> Copyright © 2024 VTC Corporation </text> <br><br>
                    <a class="text-firme-footer" href="https://github.com/AlbertoDB20"> Alberto Dal Bosco, </a>
                    <a class="text-firme-footer" href="https://github.com/kikalore"> Federica Lorenzini, </a>
                    <a class="text-firme-footer" href="https://github.com/yksop"> Jacopo Veronese </a>
                </p>
            </div>
        </div>
    </div>
</template>



<script setup> 

</script>


<style scoped>

.footer {
    background-color: #444; /* Dark background for visibility */
    padding-top: 40px;
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 25px;
    display: grid;
    grid-template-columns: repeat(2, 50%);
}

.footer-logo {
    width: 80px;
    height: 80px;
    margin: 10px 10px;
}

.footer-logo:hover {
    transform: scale(1.2);
    transition: 0.5s;
}

.link{
    color: white;
}

.link:hover{
    color: #5c67f2;
}

.footer-copyright {
    padding-top: 20px;
    grid-column-start: 1;
    grid-column-end: 3;
    text-align: center;
}

.motto{
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 5px;

}

.info_DX {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 5px;
}

.inject_author{
    font-style: italic;
}


.logo-footer {
    margin: 10px 50px;
    width: 50px;
    height: 50px;
}

.title {
    font-size: 25px;
    color: white;
}

.text-firme-footer {
    color: white;
    text-decoration: none;
    font-family: Brush Script MT, Brush Script Std, cursive;
}

.text-firme-footer:hover {
    color: #5c67f2;
}
</style>