// Oyun için gerekli olan DOM elemanlarını seçiyoruz
const gameContainer = document.querySelector(".container"), // Oyunun yer aldığı ana konteyner
  userResult = document.querySelector(".user_result img"), // Kullanıcının seçtiği seçeneği gösterecek img etiketi
  cpuResult = document.querySelector(".cpu_result img"), // Bilgisayarın seçtiği seçeneği gösterecek img etiketi
  result = document.querySelector(".result"), // Oyunun sonucunu gösterecek element
  optionImages = document.querySelectorAll(".option_image"); // Kullanıcının tıklayabileceği seçenekleri (taş, kağıt, makas) temsil eden img etiketleri

// Her bir seçenek için tıklama olayını dinleyen bir döngü oluşturuyoruz
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    // Tıklanan seçeneğe "active" sınıfı ekliyoruz, bu da görsel olarak seçeneğin vurgulanmasını sağlıyor
    image.classList.add("active");
    
    // Kullanıcının ve CPU'nun seçimini geçici olarak "taş" resmine ayarlıyoruz
    userResult.src = cpuResult.src = "images/rock.png";
    
    // Sonuç metnini "Bekleyin..." olarak değiştiriyoruz, böylece kullanıcının bir sonuç beklediği belli oluyor
    result.textContent = "Wait...";

    // Diğer seçeneklerden "active" sınıfını kaldırıyoruz, böylece sadece tıklanan seçenek vurgulanıyor
    optionImages.forEach((image2, index2) => {
      // Tıklanan seçeneğin dışındaki seçeneklerden "active" sınıfını kaldırıyoruz
      index !== index2 && image2.classList.remove("active");
    });

    // Oyun başlarken "start" sınıfını ana konteynere ekliyoruz
    gameContainer.classList.add("start");

    // Sonucun hesaplanmasını geciktirmek için bir zaman aşımı (timeout) ayarlıyoruz
    let time = setTimeout(() => {
      // Zaman aşımı süresi dolduğunda "start" sınıfını kaldırıyoruz
      gameContainer.classList.remove("start");

      // Kullanıcının seçtiği resmin kaynağını (src) elde ediyoruz
      let imageSrc = e.target.querySelector("img").src;
      
      // Kullanıcının seçtiği resmi, sonucu gösterecek img etiketine yerleştiriyoruz
      userResult.src = imageSrc;

      // 0 ile 2 arasında rastgele bir sayı üreterek CPU'nun seçimini simüle ediyoruz
      let randomNumber = Math.floor(Math.random() * 3);

      // CPU'nun seçebileceği resimlerin yollarını içeren bir dizi oluşturuyoruz
      let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];

      // CPU'nun sonucunu rastgele seçilen resme ayarlıyoruz
      cpuResult.src = cpuImages[randomNumber];

      // CPU'nun seçimini harf değerine (R: taş, P: kağıt, S: makas) dönüştürüyoruz
      let cpuValue = ["R", "P", "S"][randomNumber];

      // Kullanıcının seçimini harf değerine dönüştürüyoruz
      let userValue = ["R", "P", "S"][index];

      // Tüm olası sonuçları içeren bir nesne oluşturuyoruz
      let outcomes = {
        RR: "Draw", // Taş ve Taş = Berabere
        RP: "Cpu", // Taş ve Kağıt = CPU kazanır
        RS: "User", // Taş ve Makas = Kullanıcı kazanır
        PP: "Draw", // Kağıt ve Kağıt = Berabere
        PR: "User", // Kağıt ve Taş = Kullanıcı kazanır
        PS: "Cpu", // Kağıt ve Makas = CPU kazanır
        SS: "Draw", // Makas ve Makas = Berabere
        SR: "Cpu", // Makas ve Taş = CPU kazanır
        SP: "User", // Makas ve Kağıt = Kullanıcı kazanır
      };

      // Kullanıcı ve CPU'nun seçimine göre sonucu belirliyoruz
      let outComeValue = outcomes[userValue + cpuValue];

      // Sonucu ekranda gösteriyoruz: Beraberlik durumu ya da kazanan taraf
      result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;
    }, 2500); // Sonucun hesaplanmasını 2.5 saniye geciktiriyoruz
  });
});
