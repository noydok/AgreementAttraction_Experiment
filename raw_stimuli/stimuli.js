var shuffleSequence = seq("intro", 
                          "intro_sep", 
                          sepWith("within_intro_sep", "practice"), 
                          "practice_sep", 
                          sepWith("sep", rshuffle(startsWith("condition_"), startsWith("filler"))), //
                          "send_results",
                         "debrief"); 
var practiceItemTypes = ["prac"];

var defaults = [
    "Separator", {
        normalMessage: "Lütfen bekleyiniz."
    },
    "DashedSentence", {
        mode: "speeded acceptability", display: "in place",
        wordTime:350,
        wordPauseTime:150,
    },
    "DashedAcceptabilityJudgment", {
        hasCorrect: false
    },
    "Question", {
        as: [["q","KÖTÜ (Q'ya basın)"],["p","İYİ (P'ye basın)"]],
        q: "Bu cümle nasıl bir cümleydi?"
        hasCorrect: false,
        presentAsScale: true,
        randomOrder: false,
        showNumbers: true,
        autoFirstChar: false, 
        wordTime:300,
        wordPauseTime:200,
        instructions: " "
    },
    "Message", {
        hideProgressBar: false
    },
    "Form", {
        hideProgressBar: false,
        continueOnReturn: true,
        saveReactionTime: true,
        continueMessage: "Devam etmek için buraya tıklayınız.",
        obligatoryCheckboxErrorGenerator: function (field) { return "Bu alanı doldurmanız gerekmektedir." },
        obligatoryErrorGenerator: function (field) { return "Bu alanı doldurmanız gerekmektedir."; },
        obligatoryRadioErrorGenerator: function (field) { return "Seçeneklerden birini seçiniz."; }
        
    }
];

 // insert breaks
function modifyRunningOrder(ro) {

 for (var i = 0; i < ro.length; ++i) {
 if (i % 20 == 25 && i > 20 && i < 200) {
 ro[i].push(new DynamicElement(
 "Message",
 { html: "<p>Kısa bir ara verelim. Deney 10 saniye içerisinde devam edecektir.</p>", transfer: 10000 },
 true
 ));
 }
 }
 return ro;
 }



var items = [
    ["send_results", "__SendResults__", { }],

    ["sep", "Separator", {
        normalMessage: "",
        errorMessage: "",
        ignoreFailure: false}],
    
    ["intro_sep", "Separator", {
        transfer: "keypress",
        normalMessage: "Alıstırma kısmına başlamak için boşluk tuşuna basınız.",
        errorMessage: "Alıstırma kısmına başlamak için boşluk tuşuna basınız." }],


    ["within_intro_sep", "Separator", {
        transfer: "keypress",
        normalMessage: "Harika. İyi gidiyorsunuz. Bir sonraki cümleye geçmek için boşluk tuşuna basınız.",
        errorMessage: "Odaklanınız. Bir sonraki soruya geçmek için boşluk tuşuna basınız."}],
    
    ["practice_sep", "Separator", {
        transfer: "keypress",
        normalMessage: "Deneye başlamak için boşluk tuşuna basınız.",
        errorMessage: "Odaklanınız. Bir sonraki soruya geçmek için boşluk tuşuna basınız." }],


    ["intro", "Form", {
        html: { include: "intro1.html" },
        obligatoryCheckboxErrorGenerator: function (field) { return "Devam etmeden önce çalismaya katılmayı kabul etmelisiniz."; }
    } ],
    
    ["intro", "Form", {
        html: { include: "intro2.html" },
        validators: {
            age: function (s) { if (s.match(/^\d+$/)) return true; else return "Yaşınızı sayı olarak giriniz."; },
        }
    } ],

    ["intro", "Form", {
        html: { include: "intro3.html" } } ],

    ["intro", "Form", {
        html: { include: "intro4.html" },
        transfer: "keypress"
        //continueMessage: "Alıştırma kısmına başlamak için boşluk tuşuna basınız." 
    } ],

    ["debrief", "Message", {
        html: { include: "debrief.html" },
                transfer: 3000  }],

// Practice
    
["prac", "DashedSentence", {s: ["Bu", "kısım", "deneye", "ve", "sunum", "yöntemine", "alışmanız", "için", "bulunmaktadır."]}],
["prac", "DashedSentence", {s: ["Bu", "cümle", "öncekinden", "daha", "uzun", "bir", "cümle.", "          ", "Okuması", "biraz", "daha", "zor", "olsa_da", "sunum", "şekli", "aslında", "aynı."]}],

["prac", Message, {consentRequired: false, transfer: "keypress",
                     html: ["div",
                           ["p", "Harika! Şimdi deneyde göreceğiniz türden cümlelere bakalım. Birazdan göreceğiniz cümleler İYİ diyebileceğimiz cümlelerden. "],
                           ["p", "Devam etmek için 'boşluk' tuşuna basınız."]
                           ]}],

["prac", "DashedSentence", {s: ["Teyzemin", "komşusu", "yerden", "kalkıp", "oturunca", "önündeki", "kedinin", "başını", "okşadı."]}],
["prac", "DashedSentence", {s: ["Utku'nun", "kızı", "yürüyene", "kadar", "bir","sürü","oyuncak","alınmıştı."]}],

["prac", Message, {consentRequired: false, transfer: "keypress",
                    html: ["div",
                          ["p", "Az önce okuduğunuz cümleler gibi cümleler Türkçe'de kabul edilebilir cümlelerdir."],
                          ["p", "Bir de KÖTÜ diyebileceğimiz cümlelerden örnekler görelim."],
                          ["p", "Devam etmek için 'boşluk' tuşuna basınız."]
                          ]}],

["prac", "DashedSentence", {s: ["Öğrencinin", "asistanı", "gelince", "ders", "çok", "güzel", "anlattı."]}],
["prac", "DashedSentence", {s: ["Asistanın", "öğrencisi", "dinlenince", "ders", "ara", "verdiler."]}],   

["prac", Message, {consentRequired: false, transfer: "keypress",
                    html: ["div",
                          ["p", "Nasıl gidiyor? Elinin alışması için biraz daha örnek cümle girelim."],
                          ["p", "Devam etmek için 'boşluk' tuşuna basınız."]
                          ]}],

["prac", "DashedSentence", {s: ["İmamın", "kedisi", "doğurunca", "mahalle", "sevinç", "oldukça" , "katlandı."]}],
["prac", "DashedSentence", {s: ["Evin","cephesi", "bitince", "boyaları","toplayıp","gittiler."]}],
["prac", "DashedSentence", {s: ["Kimsenin","çocuğu", "ağlamayınca","yeni", "yazılan", "kitap", "kimseye", "okumadı."]}],

    
["prac", Message, {consentRequired: false, transfer: "keypress",
                     html: ["div",
                           ["p", "Elinizin ısındığını umuyorum. Hazır olduğunuzu hissettiğinizde 'boşluk' tuşuna basarak ilerleyiniz."],
                           ["p", "NOT: Vereceğiniz cevaplar üzerine çok düşünmeyin! Tamamlayacağınız deneyde 'doğru' ya da 'yanlış' cevap bulunmamaktadır. Deney yaklaşık X dakika sürecek ve bu süre zarfında deneye odaklanmanız gerekmektedir. Katılımınız için çok teşekkürler!"]
                           ]}],


["presepA", Separator, {transfer: 3000, normalMessage: "Telefonunuzu ve diğer dikkat dağıtıcı unsurlardan deney esnasında uzak durmanız bizim için çok daha iyi olacaktır." }],
["dummysep", Separator, {transfer: 10, normalMessage: ""}],
[["condition_a", 1], "DashedSentence", {s: "y�neticilerin", "as�isi", "mutfakta s�rekli", "zipladilar"}],
[["condition_b", 1], "DashedSentence", {s: "y�neticilerin", "as�isi", "mutfakta s�rekli", "zipladi"}],
[["condition_c", 1], "DashedSentence", {s: "y�neticinin", "as�isi", "mutfakta s�rekli", "zipladilar"}],
[["condition_d", 1], "DashedSentence", {s: "y�neticinin", "as�isi", "mutfakta s�rekli", "zipladi"}],
[["condition_a", 2], "DashedSentence", {s: "�grencilerin", "ablasi", "sinifta birden", "bayildilar"}],
[["condition_b", 2], "DashedSentence", {s: "�grencilerin", "ablasi", "sinifta birden", "bayildi"}],
[["condition_c", 2], "DashedSentence", {s: "�grencinin", "ablasi", "sinifta birden", "bayildilar"}],
[["condition_d", 2], "DashedSentence", {s: "�grencinin", "ablasi", "sinifta birden", "bayildi"}],
[["condition_a", 3], "DashedSentence", {s: "marangozlarin", "abisi", "at�lyeden hizla", "uzaklastilar"}],
[["condition_b", 3], "DashedSentence", {s: "marangozlarin", "abisi", "at�lyeden hizla", "uzaklasti"}],
[["condition_c", 3], "DashedSentence", {s: "marangozun", "abisi", "at�lyeden hizla", "uzaklastilar"}],
[["condition_d", 3], "DashedSentence", {s: "marangozun", "abisi", "at�lyeden hizla", "uzaklasti"}],
[["condition_a", 4], "DashedSentence", {s: "mahallelilerin", "emlak�isi", "aniden k�stah�a", "g�ld�ler"}],
[["condition_b", 4], "DashedSentence", {s: "mahallelilerin", "emlak�isi", "aniden k�stah�a", "g�ld�"}],
[["condition_c", 4], "DashedSentence", {s: "mahallelinin", "emlak�isi", "aniden k�stah�a", "g�ld�ler"}],
[["condition_d", 4], "DashedSentence", {s: "mahallelinin", "emlak�isi", "aniden k�stah�a", "g�ld�"}],
[["condition_a", 5], "DashedSentence", {s: "kizlarin", "halasi", "sabaha kadar", "agladilar"}],
[["condition_b", 5], "DashedSentence", {s: "kizlarin", "halasi", "sabaha kadar", "agladi"}],
[["condition_c", 5], "DashedSentence", {s: "kizin", "halasi", "sabaha kadar", "agladilar"}],
[["condition_d", 5], "DashedSentence", {s: "kizin", "halasi", "sabaha kadar", "agladi"}],
[["condition_a", 6], "DashedSentence", {s: "damatlarin", "dayisi", "arada sirada", "sikildilar"}],
[["condition_b", 6], "DashedSentence", {s: "damatlarin", "dayisi", "arada sirada", "sikildi"}],
[["condition_c", 6], "DashedSentence", {s: "damatin", "dayisi", "arada sirada", "sikildilar"}],
[["condition_d", 6], "DashedSentence", {s: "damatin", "dayisi", "arada sirada", "sikildi"}],
[["condition_a", 7], "DashedSentence", {s: "doktorlarin", "�i�ek�isi", "g�nden g�ne", "zayifladilar"}],
[["condition_b", 7], "DashedSentence", {s: "doktorlarin", "�i�ek�isi", "g�nden g�ne", "zayifladi"}],
[["condition_c", 7], "DashedSentence", {s: "doktorun", "�i�ek�isi", "g�nden g�ne", "zayifladilar"}],
[["condition_d", 7], "DashedSentence", {s: "doktorun", "�i�ek�isi", "g�nden g�ne", "zayifladi"}],
[["condition_a", 8], "DashedSentence", {s: "stajyerlerin", "enistesi", "geceden �nce", "uyudular"}],
[["condition_b", 8], "DashedSentence", {s: "stajyerlerin", "enistesi", "geceden �nce", "uyudu"}],
[["condition_c", 8], "DashedSentence", {s: "stajyerin", "enistesi", "geceden �nce", "uyudular"}],
[["condition_d", 8], "DashedSentence", {s: "stajyerin", "enistesi", "geceden �nce", "uyudu"}],
[["condition_a", 9], "DashedSentence", {s: "aristokratlarin", "hizmet�isi", "yorgun argin", "yattilar"}],
[["condition_b", 9], "DashedSentence", {s: "aristokratlarin", "hizmet�isi", "yorgun argin", "yatti"}],
[["condition_c", 9], "DashedSentence", {s: "aristokratin", "hizmet�isi", "yorgun argin", "yattilar"}],
[["condition_d", 9], "DashedSentence", {s: "aristokratin", "hizmet�isi", "yorgun argin", "yatti"}],
[["condition_a", 10], "DashedSentence", {s: "konusmacilarin", "sunucusu", "olagan�st� hizli", "kostular"}],
[["condition_b", 10], "DashedSentence", {s: "konusmacilarin", "sunucusu", "olagan�st� hizli", "kostu"}],
[["condition_c", 10], "DashedSentence", {s: "konusmacinin", "sunucusu", "olagan�st� hizli", "kostular"}],
[["condition_d", 10], "DashedSentence", {s: "konusmacinin", "sunucusu", "olagan�st� hizli", "kostu"}],
[["condition_a", 11], "DashedSentence", {s: "psikiyatristlerin", "eczacisi", "a� susuz", "dolastilar"}],
[["condition_b", 11], "DashedSentence", {s: "psikiyatristlerin", "eczacisi", "a� susuz", "dolasti"}],
[["condition_c", 11], "DashedSentence", {s: "psikiyatristin", "eczacisi", "a� susuz", "dolastilar"}],
[["condition_d", 11], "DashedSentence", {s: "psikiyatristin", "eczacisi", "a� susuz", "dolasti"}],
[["condition_a", 12], "DashedSentence", {s: "politikacilarin", "hocasi", "adliyeden �abucak", "�iktilar"}],
[["condition_b", 12], "DashedSentence", {s: "politikacilarin", "hocasi", "adliyeden �abucak", "�ikti"}],
[["condition_c", 12], "DashedSentence", {s: "politikacinin", "hocasi", "adliyeden �abucak", "�iktilar"}],
[["condition_d", 12], "DashedSentence", {s: "politikacinin", "hocasi", "adliyeden �abucak", "�ikti"}],
[["condition_a", 13], "DashedSentence", {s: "hakimlerin", "�aycisi", "nedensiz yere", "kizdilar"}],
[["condition_b", 13], "DashedSentence", {s: "hakimlerin", "�aycisi", "nedensiz yere", "kizdi"}],
[["condition_c", 13], "DashedSentence", {s: "hakimin", "�aycisi", "nedensiz yere", "kizdilar"}],
[["condition_d", 13], "DashedSentence", {s: "hakimin", "�aycisi", "nedensiz yere", "kizdi"}],
[["condition_a", 14], "DashedSentence", {s: "oyuncularin", "hemsiresi", "etrafta ama�sizca", "gezdiler"}],
[["condition_b", 14], "DashedSentence", {s: "oyuncularin", "hemsiresi", "etrafta ama�sizca", "gezdi"}],
[["condition_c", 14], "DashedSentence", {s: "oyuncunun", "hemsiresi", "etrafta ama�sizca", "gezdiler"}],
[["condition_d", 14], "DashedSentence", {s: "oyuncunun", "hemsiresi", "etrafta ama�sizca", "gezdi"}],
[["condition_a", 15], "DashedSentence", {s: "�gretmenlerin", "m�diresi", "biraz �nce", "aradilar"}],
[["condition_b", 15], "DashedSentence", {s: "�gretmenlerin", "m�diresi", "biraz �nce", "aradi"}],
[["condition_c", 15], "DashedSentence", {s: "�gretmenin", "m�diresi", "biraz �nce", "aradilar"}],
[["condition_d", 15], "DashedSentence", {s: "�gretmenin", "m�diresi", "biraz �nce", "aradi"}],
[["condition_a", 16], "DashedSentence", {s: "milyonerlerin", "terzisi", "tamamen gereksizce", "bagirdilar"}],
[["condition_b", 16], "DashedSentence", {s: "milyonerlerin", "terzisi", "tamamen gereksizce", "bagirdi"}],
[["condition_c", 16], "DashedSentence", {s: "milyonerin", "terzisi", "tamamen gereksizce", "bagirdilar"}],
[["condition_d", 16], "DashedSentence", {s: "milyonerin", "terzisi", "tamamen gereksizce", "bagirdi"}],
[["condition_a", 17], "DashedSentence", {s: "bebeklerin", "bakicisi", "�ok kibar", "davrandilar"}],
[["condition_b", 17], "DashedSentence", {s: "bebeklerin", "bakicisi", "�ok kibar", "davrandi"}],
[["condition_c", 17], "DashedSentence", {s: "bebegin", "bakicisi", "�ok kibar", "davrandilar"}],
[["condition_d", 17], "DashedSentence", {s: "bebegin", "bakicisi", "�ok kibar", "davrandi"}],
[["condition_a", 18], "DashedSentence", {s: "�ocuklarin", "dadisi", "y�ksek sesle", "konustular"}],
[["condition_b", 18], "DashedSentence", {s: "�ocuklarin", "dadisi", "y�ksek sesle", "konustu"}],
[["condition_c", 18], "DashedSentence", {s: "�ocugun", "dadisi", "y�ksek sesle", "konustular"}],
[["condition_d", 18], "DashedSentence", {s: "�ocugun", "dadisi", "y�ksek sesle", "konustu"}],
[["condition_a", 19], "DashedSentence", {s: "futbolcularin", "s�r�c�s�", "�ok yavas", "�alistilar"}],
[["condition_b", 19], "DashedSentence", {s: "futbolcularin", "s�r�c�s�", "�ok yavas", "�alisti"}],
[["condition_c", 19], "DashedSentence", {s: "futbolcunun", "s�r�c�s�", "�ok yavas", "�alistilar"}],
[["condition_d", 19], "DashedSentence", {s: "futbolcunun", "s�r�c�s�", "�ok yavas", "�alisti"}],
[["condition_a", 20], "DashedSentence", {s: "modacilarin", "taksicisi", "saatlerce durmaksizin", "i�tiler"}],
[["condition_b", 20], "DashedSentence", {s: "modacilarin", "taksicisi", "saatlerce durmaksizin", "i�ti"}],
[["condition_c", 20], "DashedSentence", {s: "modacinin", "taksicisi", "saatlerce durmaksizin", "i�tiler"}],
[["condition_d", 20], "DashedSentence", {s: "modacinin", "taksicisi", "saatlerce durmaksizin", "i�ti"}],
[["condition_a", 21], "DashedSentence", {s: "sanat�ilarin", "�algicisi", "feci bir sekilde", "�ld�ler"}],
[["condition_b", 21], "DashedSentence", {s: "sanat�ilarin", "�algicisi", "feci bir sekilde", "�ld�"}],
[["condition_c", 21], "DashedSentence", {s: "sanat�inin", "�algicisi", "feci bir sekilde", "�ld�ler"}],
[["condition_d", 21], "DashedSentence", {s: "sanat�inin", "�algicisi", "feci bir sekilde", "�ld�"}],
[["condition_a", 22], "DashedSentence", {s: "dedektiflerin", "dis�isi", "ilk kez �ilginca", "eglendiler"}],
[["condition_b", 22], "DashedSentence", {s: "dedektiflerin", "dis�isi", "ilk kez �ilginca", "eglendi"}],
[["condition_c", 22], "DashedSentence", {s: "dedektifin", "dis�isi", "ilk kez �ilginca", "eglendiler"}],
[["condition_d", 22], "DashedSentence", {s: "dedektifin", "dis�isi", "ilk kez �ilginca", "eglendi"}],
[["condition_a", 23], "DashedSentence", {s: "esnaflarin", "m�sterisi", "sikayettten hemen sonra", "sustular"}],
[["condition_b", 23], "DashedSentence", {s: "esnaflarin", "m�sterisi", "sikayettten hemen sonra", "sustu"}],
[["condition_c", 23], "DashedSentence", {s: "esnafin", "m�sterisi", "sikayettten hemen sonra", "sustular"}],
[["condition_d", 23], "DashedSentence", {s: "esnafin", "m�sterisi", "sikayettten hemen sonra", "sustu"}],
[["condition_a", 24], "DashedSentence", {s: "sarkicilarin", "korumasi", "her zamanki gibi", "geciktiler"}],
[["condition_b", 24], "DashedSentence", {s: "sarkicilarin", "korumasi", "her zamanki gibi", "gecikti"}],
[["condition_c", 24], "DashedSentence", {s: "sarkicinin", "korumasi", "her zamanki gibi", "geciktiler"}],
[["condition_d", 24], "DashedSentence", {s: "sarkicinin", "korumasi", "her zamanki gibi", "gecikti"}],
[["condition_a", 25], "DashedSentence", {s: "g�stericilerin", "izleyicisi", "aksama kadar sessizce", "oturdular"}],
[["condition_b", 25], "DashedSentence", {s: "g�stericilerin", "izleyicisi", "aksama kadar sessizce", "oturdu"}],
[["condition_c", 25], "DashedSentence", {s: "g�stericinin", "izleyicisi", "aksama kadar sessizce", "oturdular"}],
[["condition_d", 25], "DashedSentence", {s: "g�stericinin", "izleyicisi", "aksama kadar sessizce", "oturdu"}],
[["condition_a", 26], "DashedSentence", {s: "cerrahlarin", "hastasi", "aksamki g�steriden �nce", "ka�tilar"}],
[["condition_b", 26], "DashedSentence", {s: "cerrahlarin", "hastasi", "aksamki g�steriden �nce", "ka�ti"}],
[["condition_c", 26], "DashedSentence", {s: "cerrahin", "hastasi", "aksamki g�steriden �nce", "ka�tilar"}],
[["condition_d", 26], "DashedSentence", {s: "cerrahin", "hastasi", "aksamki g�steriden �nce", "ka�ti"}],
[["condition_a", 27], "DashedSentence", {s: "dalgi�larin", "annesi", "bile bile", "ge� kaldilar"}],
[["condition_b", 27], "DashedSentence", {s: "dalgi�larin", "annesi", "bile bile", "ge� kaldi"}],
[["condition_c", 27], "DashedSentence", {s: "dalgicin", "annesi", "bile bile", "ge� kaldilar"}],
[["condition_d", 27], "DashedSentence", {s: "dalgicin", "annesi", "bile bile", "ge� kaldi"}],
[["condition_a", 28], "DashedSentence", {s: "fabrikat�rlerin", "is�isi", "beklenmedik bir anda", "hastalandilar"}],
[["condition_b", 28], "DashedSentence", {s: "fabrikat�rlerin", "is�isi", "beklenmedik bir anda", "hastalandi"}],
[["condition_c", 28], "DashedSentence", {s: "fabrikat�r�n", "is�isi", "beklenmedik bir anda", "hastalandilar"}],
[["condition_d", 28], "DashedSentence", {s: "fabrikat�r�n", "is�isi", "beklenmedik bir anda", "hastalandi"}],
[["condition_a", 29], "DashedSentence", {s: "komedyenlerin", "yardimcisi", "poyrazdan dolayi", "�s�d�ler"}],
[["condition_b", 29], "DashedSentence", {s: "komedyenlerin", "yardimcisi", "poyrazdan dolayi", "�s�d�"}],
[["condition_c", 29], "DashedSentence", {s: "komedyenin", "yardimcisi", "poyrazdan dolayi", "�s�d�ler"}],
[["condition_d", 29], "DashedSentence", {s: "komedyenin", "yardimcisi", "poyrazdan dolayi", "�s�d�"}],
[["condition_a", 30], "DashedSentence", {s: "sof�rlerin", "yolcusu", "yemekten sonra yine", "aciktilar"}],
[["condition_b", 30], "DashedSentence", {s: "sof�rlerin", "yolcusu", "yemekten sonra yine", "acikti"}],
[["condition_c", 30], "DashedSentence", {s: "sof�r�n", "yolcusu", "yemekten sonra yine", "aciktilar"}],
[["condition_d", 30], "DashedSentence", {s: "sof�r�n", "yolcusu", "yemekten sonra yine", "acikti"}],
[["condition_a", 31], "DashedSentence", {s: "m�hendislerin", "kapicisi", "erken �demeden dolayi", "sevindiler"}],
[["condition_b", 31], "DashedSentence", {s: "m�hendislerin", "kapicisi", "erken �demeden dolayi", "sevindi"}],
[["condition_c", 31], "DashedSentence", {s: "m�hendisin", "kapicisi", "erken �demeden dolayi", "sevindiler"}],
[["condition_d", 31], "DashedSentence", {s: "m�hendisin", "kapicisi", "erken �demeden dolayi", "sevindi"}],
[["condition_a", 32], "DashedSentence", {s: "pazarcilarin", "nakliyecisi", "mesaiden hemen sonra", "uzandilar"}],
[["condition_b", 32], "DashedSentence", {s: "pazarcilarin", "nakliyecisi", "mesaiden hemen sonra", "uzandi"}],
[["condition_c", 32], "DashedSentence", {s: "pazarcinin", "nakliyecisi", "mesaiden hemen sonra", "uzandilar"}],
[["condition_d", 32], "DashedSentence", {s: "pazarcinin", "nakliyecisi", "mesaiden hemen sonra", "uzandi"}],
[["condition_a", 33], "DashedSentence", {s: "oyuncularin", "egitimcisi", "ilk denemede epey", "zorlandilar"}],
[["condition_b", 33], "DashedSentence", {s: "oyuncularin", "egitimcisi", "ilk denemede epey", "zorlandi"}],
[["condition_c", 33], "DashedSentence", {s: "oyuncunun", "egitimcisi", "ilk denemede epey", "zorlandilar"}],
[["condition_d", 33], "DashedSentence", {s: "oyuncunun", "egitimcisi", "ilk denemede epey", "zorlandi"}],
[["condition_a", 34], "DashedSentence", {s: "mankenlerin", "modacisi", "ge� bir vakitte", "kalktilar"}],
[["condition_b", 34], "DashedSentence", {s: "mankenlerin", "modacisi", "ge� bir vakitte", "kalkti"}],
[["condition_c", 34], "DashedSentence", {s: "mankenin", "modacisi", "ge� bir vakitte", "kalktilar"}],
[["condition_d", 34], "DashedSentence", {s: "mankenin", "modacisi", "ge� bir vakitte", "kalkti"}],
[["condition_a", 35], "DashedSentence", {s: "konuklarin", "teyzesi", "m�this bir agriyla", "uyandilar"}],
[["condition_b", 35], "DashedSentence", {s: "konuklarin", "teyzesi", "m�this bir agriyla", "uyandi"}],
[["condition_c", 35], "DashedSentence", {s: "konugun", "teyzesi", "m�this bir agriyla", "uyandilar"}],
[["condition_d", 35], "DashedSentence", {s: "konugun", "teyzesi", "m�this bir agriyla", "uyandi"}],
[["condition_a", 36], "DashedSentence", {s: "oglanlarin", "amcasi", "bos bir caddede", "y�r�d�ler"}],
[["condition_b", 36], "DashedSentence", {s: "oglanlarin", "amcasi", "bos bir caddede", "y�r�d�"}],
[["condition_c", 36], "DashedSentence", {s: "oglanin", "amcasi", "bos bir caddede", "y�r�d�ler"}],
[["condition_d", 36], "DashedSentence", {s: "oglanin", "amcasi", "bos bir caddede", "y�r�d�"}],
[["condition_a", 37], "DashedSentence", {s: "avukatlarin", "komsusu", "toplantidan sonra birden", "sarardilar"}],
[["condition_b", 37], "DashedSentence", {s: "avukatlarin", "komsusu", "toplantidan sonra birden", "sarardi"}],
[["condition_c", 37], "DashedSentence", {s: "avukatin", "komsusu", "toplantidan sonra birden", "sarardilar"}],
[["condition_d", 37], "DashedSentence", {s: "avukatin", "komsusu", "toplantidan sonra birden", "sarardi"}],
[["condition_a", 38], "DashedSentence", {s: "�nl�lerin", "falcisi", "yabanci bir �lkede", "kayboldular"}],
[["condition_b", 38], "DashedSentence", {s: "�nl�lerin", "falcisi", "yabanci bir �lkede", "kayboldu"}],
[["condition_c", 38], "DashedSentence", {s: "�nl�n�n", "falcisi", "yabanci bir �lkede", "kayboldular"}],
[["condition_d", 38], "DashedSentence", {s: "�nl�n�n", "falcisi", "yabanci bir �lkede", "kayboldu"}],
[["condition_a", 39], "DashedSentence", {s: "�ift�ilerin", "bek�isi", "normalden �ok yavas", "gezindiler"}],
[["condition_b", 39], "DashedSentence", {s: "�ift�ilerin", "bek�isi", "normalden �ok yavas", "gezindi"}],
[["condition_c", 39], "DashedSentence", {s: "�ift�inin", "bek�isi", "normalden �ok yavas", "gezindiler"}],
[["condition_d", 39], "DashedSentence", {s: "�ift�inin", "bek�isi", "normalden �ok yavas", "gezindi"}],
[["condition_a", 40], "DashedSentence", {s: "kadinlarin", "ninesi", "ge�en seneye g�re", "din�lestiler"}],
[["condition_b", 40], "DashedSentence", {s: "kadinlarin", "ninesi", "ge�en seneye g�re", "din�lesti"}],
[["condition_c", 40], "DashedSentence", {s: "kadinin", "ninesi", "ge�en seneye g�re", "din�lestiler"}],
[["condition_d", 40], "DashedSentence", {s: "kadinin", "ninesi", "ge�en seneye g�re", "din�lesti"}][["filler", 101], "DashedSentence", {s: "Adamin", "annesi", "fenalasinca", "inek", "kurban", "ettiler"}],
[["filler", 102], "DashedSentence", {s: "Sosyologun", "�grencisi", "konusunca", "tutarsizlik", "a�iga", "�ikardilar"}],
[["filler", 103], "DashedSentence", {s: "Doktorun", "hemsiresi", "gelene kadar", "hasta", "taburcu", "ettiler"}],
[["filler", 104], "DashedSentence", {s: "Kemancinin", "sevgilisi", "�l�nce", "mezar", "ziyaret", "ettiler"}],
[["filler", 105], "DashedSentence", {s: "Hocanin", "kapicisi", "bayilinca", "doktor", "rahatsiz", "ettiler"}],
[["filler", 106], "DashedSentence", {s: "Medyumun", "kocasi", "sa�malayinca", "falci", "zengin", "ettiler"}],
[["filler", 107], "DashedSentence", {s: "Baskanin", "dis�isi", "tirsinca", "stajyer", "kabul", "ettiler"}],
[["filler", 108], "DashedSentence", {s: "Elestirmenin", "karisi", "kivirtinca", "sapik", "tahrik", "ettiler"}],
[["filler", 109], "DashedSentence", {s: "Patronun", "kahyasi", "d�s�nce", "d�sman", "mutlu", "ettiler"}],
[["filler", 110], "DashedSentence", {s: "M�d�r�n", "as�isi", "hazirlaninca", "yemek", "hazir", "ettiler"}],
[["filler", 111], "DashedSentence", {s: "�ocugun", "abisi", "�z�l�nce", "oyuncak", "icat", "ettiler"}],
[["filler", 112], "DashedSentence", {s: "Psikologun", "hastasi", "gecikince", "vakit", "hi�", "ettiler"}],
[["filler", 113], "DashedSentence", {s: "Ressamin", "tedarik�isi", "kaybolunca", "tuval", "ithal", "ettiler"}],
[["filler", 114], "DashedSentence", {s: "Dis�inin", "temizlik�isi", "yorulunca", "hademe", "ikna", "ettiler"}],
[["filler", 115], "DashedSentence", {s: "Kimyagerin", "kuryesi", "hapsurunca", "deney", "akil", "ettiler"}],
[["filler", 116], "DashedSentence", {s: "Mankenin", "motorcusu", "sizinca", "�irak", "mesgul", "ettiler"}],
[["filler", 117], "DashedSentence", {s: "Dekanin", "davetlisi", "ge�ince", "seyirci", "ayaga", "kaldirdilar"}],
[["filler", 118], "DashedSentence", {s: "Mafyanin", "yatirimcisi", "batinca", "kuyumcu", "tehdit", "ettiler"}],
[["filler", 119], "DashedSentence", {s: "As�inin", "manavi", "kapaninca", "et", "tedarik", "ettiler"}],
[["filler", 120], "DashedSentence", {s: "�grencinin", "hocasi", "anlatinca", "makine", "icat", "ettiler"}],
[["filler", 121], "DashedSentence", {s: "Bakanin", "yardimcisi", "bulununca", "koltuk", "geri", "getirdi"}],
[["filler", 122], "DashedSentence", {s: "�grencinin", "hocasi", "ayrilinca", "proje", "birden", "unuttu"}],
[["filler", 123], "DashedSentence", {s: "Pizzacinin", "kuryesi", "t�kezleyince", "soslar", "yere", "sa�ti"}],
[["filler", 124], "DashedSentence", {s: "Kralin", "soytarisi", "asilinca", "sapka", "yerinde", "buldu"}],
[["filler", 125], "DashedSentence", {s: "Dekanin", "davetlisi", "hapsurunca", "�aylar", "aniden", "d�s�rd�"}],
[["filler", 126], "DashedSentence", {s: "Dedektifin", "g�zl�k��s�", "evlenince", "hediyeler", "aglanarak", "verdi"}],
[["filler", 127], "DashedSentence", {s: "Politikacinin", "s�zc�s�", "yakalaninca", "a�iklama", "haliyle", "kesti"}],
[["filler", 128], "DashedSentence", {s: "Kadinin", "temizlik�isi", "bayilinca", "deterjan", "tekrar", "sa�ti"}],
[["filler", 129], "DashedSentence", {s: "Mankenin", "nisanlisi", "vurulunca", "haber", "hizlica", "yaydi"}],
[["filler", 130], "DashedSentence", {s: "�obanin", "s�zl�s�", "tutuklaninca", "kamera", "sessizce", "s�kt�"}],
[["filler", 131], "DashedSentence", {s: "Dans�z�n", "kocasi", "varinca", "kapi", "sakince", "a�ti"}],
[["filler", 132], "DashedSentence", {s: "�evirmenin", "kaynanasi", "aramayinca", "metin", "keyfince", "bitirdi"}],
[["filler", 133], "DashedSentence", {s: "Fabrikat�r�n", "muhasebecisi", "kovulunca", "hesap", "tamamen", "karistirdi"}],
[["filler", 134], "DashedSentence", {s: "�nl�n�n", "k�rk��s�", "d�n�nce", "kumas", "erkenden", "dikti"}],
[["filler", 135], "DashedSentence", {s: "Rekt�r�n", "yardimcisi", "ataninca", "k�t�phane", "gece", "kapatti"}],
[["filler", 136], "DashedSentence", {s: "Sarkicinin", "taksicisi", "gecikince", "trafik", "aniden", "kilitledi"}],
[["filler", 137], "DashedSentence", {s: "�ocugun", "dadisi", "aramayinca", "bulasik", "saatlerce", "yikadi"}],
[["filler", 138], "DashedSentence", {s: "�ift�inin", "tesisat�isi", "gelince", "borular", "g��l�kle", "s�kt�"}],
[["filler", 139], "DashedSentence", {s: "�iftin", "mobilyacisi", "kizinca", "koltuk", "sinirle", "par�aladi"}],
[["filler", 140], "DashedSentence", {s: "Adamin", "falcisi", "yanilinca", "fincan", "�fkeyle", "kirdi"}]


];