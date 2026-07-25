// --- 背景音樂控制邏輯 ---
let isMusicPlaying = false;

// 當網頁載入完成後，動態產生音樂按鈕與音量拉桿
window.onload = () => {
    // 建立音樂控制容器
    const musicContainer = document.createElement('div');
    musicContainer.id = 'music-control-container';

    // 建立播放/暫停按鈕
    const musicBtn = document.createElement('button');
    musicBtn.id = 'music-toggle';
    musicBtn.innerHTML = '🔇'; // 初始為靜音圖示
    musicBtn.title = "切換背景音樂";
    musicBtn.onclick = toggleMusic;
    
    // 建立音量控制拉桿
    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.id = 'volume-slider';
    volumeSlider.min = '0';
    volumeSlider.max = '1';
    volumeSlider.step = '0.01';
    volumeSlider.value = '0.4'; // 預設音量為 40% (背景音樂不宜過大聲)
    volumeSlider.title = "調整音量";
    
    // 監聽拉桿數值變化，即時調整音量
    volumeSlider.addEventListener('input', (e) => {
        const audio = document.getElementById('bg-music');
        if (audio) {
            audio.volume = e.target.value;
            // 如果拉到 0，把按鈕圖示換成靜音
            if (e.target.value == 0) {
                musicBtn.innerHTML = '🔇';
            } else if (isMusicPlaying) {
                musicBtn.innerHTML = '🎵';
            }
        }
    });

    // 將按鈕與拉桿加入容器
    musicContainer.appendChild(musicBtn);
    musicContainer.appendChild(volumeSlider);
    
    // 將容器加入遊戲畫面
    document.getElementById('game-container').appendChild(musicContainer);
    
    // 設定初始音量
    const audio = document.getElementById('bg-music');
    if(audio) audio.volume = 0.4;
};

// 切換音樂播放與暫停
function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-toggle');
    const slider = document.getElementById('volume-slider');
    
    if (isMusicPlaying) {
        audio.pause();
        btn.innerHTML = '🔇';
        isMusicPlaying = false;
    } else {
        // 如果原本音量被拉到 0，點擊播放時自動恢復一點音量
        if (slider.value == 0) {
            slider.value = 0.4;
            audio.volume = 0.4;
        }
        
        audio.play().then(() => {
            btn.innerHTML = '🎵';
            isMusicPlaying = true;
        }).catch((error) => {
            console.log("瀏覽器需要互動才能播放音樂", error);
        });
    }
}

// --- 資料結構區 ---
const stage1Data = [
    {
        image: "第一情境-第一關.png", 
        story: "【第一幕：漢代】\n伴隨著一陣古老的鐘聲，你睜開眼，發現自己身處在一座宏偉的漢代宮殿中。四周的牆壁上，畫師們正踩著木架，聚精會神地繪製著色彩鮮豔的壁畫。畫中人物多為忠臣烈士、孝子賢孫，姿態端莊。一位滿頭白髮的宮廷官員走到你面前，指著其中一幅《秋胡戲妻圖》的草稿。",
        question: "官員撫著鬍鬚，嚴肅地問你：「年輕的學徒，你可知我們費盡心力在宮廷牆面上繪製這些精細的人物畫，最主要的目的是什麼？」",
        options: [
            { text: "作為祭祀神明的法器，用來祈求國家風調雨順。", isCorrect: false },
            { text: "承載倫理教化功能，用以教導世人忠孝節義。", isCorrect: true },
            { text: "為了客觀紀錄歷史事件，讓後代帝王有史可考。", isCorrect: false },
            { text: "純粹展現畫師的個人情感與對世俗生活的批判。", isCorrect: false }
        ],
        explanation: "漢代早期壁畫主要用來表彰忠臣烈士、孝子賢孫，具有強烈的道德教化與政治宣傳目的。"
    },
    {
        image: "第一情境-第二關.png", 
        story: "【第二幕：魏晉南北朝】\n眼前的宮殿消散，你來到了一片清幽的竹林。幾位穿著寬袖長衫的名士正席地而坐，飲酒彈琴，高談闊論。這是一個思想自由奔放的時代。其中一位畫家放下了手中的酒杯，正與旁人爭論著「傳神」比「形似」更為重要。他轉過頭，看到了剛踏入竹林的你。",
        question: "畫家搖著名士羽扇，笑著考驗你：「如今我們作畫，不再只求死板的形似，而是追求畫中人的氣韻。你認為現今繪畫技法之所以能突飛猛進，是建立在什麼基礎之上？」",
        options: [
            { text: "由於佛教禪宗的頓悟思想傳入，畫家開始追求抽象意境。", isCorrect: false },
            { text: "隨美學理論逐漸成熟，畫家開始將哲學思想融入畫中。", isCorrect: true },
            { text: "受到北方游牧民族的影響，畫風變得粗獷且強調動態感。", isCorrect: false },
            { text: "朝廷設立了嚴格的繪畫法度，促使畫師技巧走向標準化。", isCorrect: false }
        ],
        explanation: "魏晉時期玄學清談風氣盛行，畫家不再只追求死板的外觀形似，而是將哲學與美學融入，更重視畫中人物的「傳神」與氣韻生動。"
    },
    {
        image: "第一情境-第三關.png", 
        story: "【第三幕：東晉】\n你走進一間飄散著淡淡墨香的畫室。一位氣質非凡的畫家正俯身於長長的絹帛上，手中毛筆如春蠶吐絲般，勾勒出宮廷女子優雅的姿態。他正是東晉大畫家顧愷之。他正在為畫中女子的眼眸點上最後一筆，瞬間，畫中人彷彿擁有了生命。",
        question: "顧愷之停下畫筆，看著你問：「我這幅《女史箴圖》花費了無數心血。後人若要回顧繪畫的歷史，你認為這幅畫在工筆畫的發展上，具有什麼樣的重要地位？」",
        options: [
            { text: "它首次採用了「沒骨法」，摒棄線條直接以色彩造型。", isCorrect: false },
            { text: "它成功奠定了人物工筆畫的基礎與後世標準。", isCorrect: true },
            { text: "它是歷史上第一幅純粹以山水風景為主角的獨立畫作。", isCorrect: false },
            { text: "它確立了「青綠山水」大量使用礦物顏料的色彩規範。", isCorrect: false }
        ],
        explanation: "顧愷之的《女史箴圖》以「春蠶吐絲」般的細膩線條勾勒人物，為後世的工筆人物畫樹立了典範。"
    },
    {
        image: "第一情境-第四關.png", 
        story: "【第四幕：唐代】\n周遭的景象瞬間變得金碧輝煌。你來到了繁華的長安城，耳邊傳來胡姬的樂聲與熱鬧的市集喧囂。宮廷畫師正在描繪貴族婦女們遊園賞花的場景，畫中的牡丹花瓣層層疊疊，貴婦的絲綢衣紋流暢細緻，色彩絢麗奪目，展現出大唐盛世的奢華與自信。",
        question: "畫師驕傲地向你展示他的作品，並問道：「你看這長安城多麼繁華！在這樣的盛世下，我們的畫作達到了空前的高峰。你覺得我們現在的畫風最注重什麼？」",
        options: [
            { text: "融合了大量西域的幾何圖騰，呈現出異國宗教的神秘感。", isCorrect: false },
            { text: "注重細節寫實與筆法細膩，完美展現華麗的氣象。", isCorrect: true },
            { text: "強調「文人畫」的寫意精神，追求筆墨的趣味與抒情。", isCorrect: false },
            { text: "以純粹的水墨暈染為主，排斥使用過於鮮豔的礦物顏料。", isCorrect: false }
        ],
        explanation: "唐代社會繁榮富裕，工筆畫迎來高峰，畫風講究華麗色彩與極致的細節寫實，展現大唐氣象。"
    },
    {
        image: "第一情境-第五關.png", 
        story: "【第五幕：宋代】\n你來到了一座戒備森嚴卻充滿學術氣息的皇家畫院（翰林圖畫院）。這裡非常安靜，畫師們正對著庭院中的花鳥進行極度細微的觀察，連鳥羽的生長方向都不敢馬虎。一位官員巡視著畫師們的作品，滿意地點點頭，這是一個極度講究法度與觀察的時代。",
        question: "畫院長官低聲對你說：「當今聖上親自督導畫院，加上當代理學盛行，要求我們『格物致知』，細心觀察萬物之理。這使得我們的工筆技法達到了什麼樣的境界？」",
        options: [
            { text: "變得爐火純青，技法極度成熟且刻畫精確。", isCorrect: true },
            { text: "逐漸放棄實地觀察，轉而大量臨摹前朝古畫以求傳承。", isCorrect: false },
            { text: "為了迎合民間市場，畫風變得通俗且帶有強烈裝飾性。", isCorrect: false },
            { text: "強調「氣韻生動」而刻意模糊物體的真實物理結構。", isCorrect: false }
        ],
        explanation: "宋代在皇室大力扶持與理學「格物致知」精確觀察萬物的影響下，工筆花鳥畫達到爐火純青的寫實巔峰。"
    },
    {
        image: "第一情境-第六關.png", 
        story: "【第六幕：明代】\n時空再次轉換，你身處江南蘇州的一座雅緻園林。幾位畫師正圍繞著一盆從海外運來的罕見奇花，仔細地描摹。他們不但承襲了宋代的嚴謹，更試圖將眼前花朵的光澤、葉片的肌理一毫不差地搬到紙上，展現出對真實事物的極度渴求。",
        question: "一位正在調色的畫師抬起頭問你：「我們在前朝（宋代）精湛的基礎上，現在作畫有了新的追求。你認為明代工筆畫的核心轉變是什麼？」",
        options: [
            { text: "捨棄了傳統的絹布，全面改用吸水性極強的生宣紙作畫。", isCorrect: false },
            { text: "在前朝基礎上更注重客觀寫實，力求百分之百還原。", isCorrect: true },
            { text: "開始將書法中的「狂草」筆法大量融入工筆畫的勾線中。", isCorrect: false },
            { text: "為了追求視覺震撼，畫布尺寸與人物比例變得極度誇張。", isCorrect: false }
        ],
        explanation: "明代工筆畫承襲宋代嚴謹的法度，進一步追求對客觀事物的精確寫實還原，注重光澤與肌理。"
    },
    {
        image: "第一情境-第七關.png", 
        story: "【第七幕：明末】\n你來到了一個熱鬧的沿海港口，不遠處停泊著巨大的西洋帆船。一位中國畫師手裡拿著傳教士帶來的西洋銅版畫和放大鏡，眼中充滿了震驚。他正在嘗試將西洋畫作中那種明顯的光影明暗與透視法，融入到自己的工筆人物草稿中。",
        question: "畫師拿著西洋版畫，興奮地對你說：「你看這畫中的陰影與立體感，真是奇妙！你認為我們吸收了這些西洋技法後，對傳統畫作帶來了什麼改變？」",
        options: [
            { text: "徹底放棄了中國傳統的毛筆與墨汁，改用西洋排筆作畫。", isCorrect: false },
            { text: "受西洋技法影響，使我們畫作的造型變得更為準確。", isCorrect: true },
            { text: "畫作的主題由傳統的花鳥人物，全面轉向西洋宗教神話。", isCorrect: false },
            { text: "完全捨棄了傳統的「散點透視」，全面改用嚴格的焦點透視。", isCorrect: false }
        ],
        explanation: "明末清初，中國畫師開始適度吸收西洋銅版畫等光影明暗與透視法，使得人物與物體的造型更為準確立體。"
    },
    {
        image: "第一情境-第八關.png", 
        story: "【第八幕：清朝】\n最後一站，你置身於紫禁城內造辦處的如意館。宮廷裡充滿了濃郁的色彩，畫師們正大量使用石青、硃砂等昂貴的礦物顏料作畫。宮廷總管太監正在翻閱一本厚厚的《石渠寶笈》，此時的宮廷對藝術有著極度嚴格的品類劃分與審美標準。",
        question: "宮廷總管太監嚴肅地對你說：「當今乾隆爺對藝術要求極高。現在『工筆畫』已經正式成為一個規範的品類概念。你可知現今宮中發展最蓬勃的是哪一類的工筆畫？」",
        options: [
            { text: "強調筆墨情趣與詩書畫印結合的『文人寫意花鳥』。", isCorrect: false },
            { text: "以描繪市井小民生活為主、色彩素雅的『淡彩風俗畫』。", isCorrect: false },
            { text: "發展重彩人物與花鳥，色彩厚重鮮明且極具裝飾性。", isCorrect: true },
            { text: "大量運用『潑墨潑彩』技法來呈現皇家園林的宏偉氣象。", isCorrect: false }
        ],
        explanation: "清代宮廷院畫將「工筆畫」確立為規範品類，大量使用礦物顏料，發展出極具裝飾性與厚重色彩的重彩人物與花鳥畫。"
    }
];

const toolsList = [
    "狼毫勾線筆", "兼毫筆", "羊毫染色筆", "水筆", "油煙墨",
    "松煙墨", "端硯", "礦物顏料", "熟宣紙", "絹布"
];

const stage2Data = [
    { hint: "「我現在準備開始作畫，第一步需要精準勾勒出花瓣與葉片極其細緻的輪廓線條。請給我那把以黃鼠狼毛製成、筆鋒硬挺的筆。」", correct: "狼毫勾線筆" },
    { hint: "「這幅畫需要一把軟硬適中的筆來輔助。請幫我拿那把將兩種以上的毛組合在一起製作而成，兼具了彈性與含水性的畫筆。」", correct: "兼毫筆" },
    { hint: "「線條勾勒完畢後，我需要進行大面積的色彩暈染。請給我那把毛質柔軟的筆，若是混和材質的款式，會比純粹單一材質的款式再稍微硬挺一點。」", correct: "羊毫染色筆" },
    { hint: "「在進行分染技法時，我左手拿著色筆，右手必須拿著另一把筆。這把筆不沾任何顏料，純粹是用來沾取清水的，藉此將畫布上的顏色慢慢推開形成漸層。」", correct: "水筆" },
    { hint: "「今日我想要畫一幅色彩濃郁的作品，需要墨色作為強烈對比。請給我那塊透過燃燒動植物油採集煙料製成的墨條。用它磨出來的墨，特色是黑亮且極有光澤。」", correct: "油煙墨" },
    { hint: "「為了營造出古樸、深邃的背景，我需要另一種用松木煙製成的墨條。這種墨磨出來的特色是霧黑、沉穩，且完全無光澤。」", correct: "松煙墨" },
    { hint: "「請把那塊極為珍貴的磨墨器具拿來，它是中國四大名硯之首。因為它的石質極度細膩，能讓磨出來的墨汁均勻細滑，以發墨佳異聞名於世。」", correct: "端硯" },
    { hint: "「為了讓畫作歷經百年依然色彩鮮明，我不使用一般水彩，而是需要從大自然礦石中提取的特殊顏料。請幫我準備石青、石綠、硃砂，並輔以蛤粉與白礬來調和。」", correct: "礦物顏料" },
    { hint: "「我準備要畫一幅極度嚴謹的重彩人物畫。請給我那種紙質較硬且光滑的基底材質。它的吸水性弱，能確保墨彩不易洇散，讓勾勒的線條保持絕對的清晰工整。」", correct: "熟宣紙" },
    { hint: "「這幅畫我想要追求極高的逼真感與自然度，所以我需要帶有絲織紋理的基底材料。它的質地細膩，能輕易讓顏料均勻暈染，設色後的整體效果非常柔和生動。」", correct: "絹布" }
];

const stage3Data = [
    {
        step: 1, title: "【步驟 1：起稿】", canvasText: "[畫布：空白熟宣紙]", image: "第三情境-第一關.png",
        desc: "畫面上出現一盆牡丹花，請觀察描繪對象，畫好底稿，決定整幅畫的佈局與基調。",
        actions: [{ text: "進行起稿", next: 2 }]
    },
    {
        step: 2, title: "【步驟 2：勾線與白描】", canvasText: "[畫布：牡丹花底稿]", image: "第三情境-第二關.png",
        desc: "請使用毛筆沾墨，進行「勾線」，透過線條的粗細與濃淡，畫出景物輪廓。",
        actions: [{ text: "進行勾線", next: 3, alertMsg: "師傅提示：「記住，白描純墨勾勒不著色，線條頓挫粗細變化豐富。你必須掌握中鋒側鋒轉換，來表現物體輪廓與韻律。此技法不僅是工筆畫設色前的造型基礎與基本功，本身亦為獨立繪畫形式，極具藝術價值。」" }]
    },
    {
        step: 3, title: "【步驟 3：決定設色風格】", canvasText: "[畫布：精緻的白描牡丹]", image: "第三情境-第三關.png",
        desc: "線條完成後，你必須決定整體的色彩風格。",
        actions: [
            { text: "A. 白描 (不著色)", errorMsg: "風格不符本次任務，請重新選擇。" },
            { text: "B. 淡彩 (色調清雅)", errorMsg: "風格不符本次任務，請重新選擇。" },
            { text: "C. 重彩 (色彩厚重)", next: 4 }
        ]
    },
    {
        step: 4, title: "【步驟 4：分染】", canvasText: "[畫布：準備上色的牡丹]", image: "第三情境-第四關.png",
        desc: "畫面上出現兩支筆。請操作「一支色筆蘸色、一支水筆推開」，形成由濃至淡漸層陰影，用於第一層陰影立體塑造。",
        actions: [{ text: "進行分染", next: 5 }]
    },
    {
        step: 5, title: "【步驟 5：統染】", canvasText: "[畫布：具備局部立體感的牡丹]", image: "第三情境-第五關.png",
        desc: "局部立體感出來後，請執行「統染」，將剛剛畫好的各個部分統一明暗。",
        actions: [{ text: "進行統染", next: 6 }]
    },
    {
        step: 6, title: "【步驟 6：罩染】", canvasText: "[畫布：明暗協調的牡丹]", image: "第三情境-第六關.png",
        desc: "在已染底色上，重覆渲染礦物顏料進行「罩染」，藉此增強色彩厚度與凹凸感。",
        actions: [{ text: "進行罩染", next: 7 }]
    },
    {
        step: 7, title: "【步驟 7：三礬九染 (防呆挑戰)】", canvasText: "[畫布：開始進行三礬九染]", image: "第三情境-第七關.jpeg",
        desc: "這是一個多次上色＋多次用膠礬水固色的反覆過程。請嚴格依照順序點擊：【染 2～3 次】→【等乾】→【上一層薄膠礬水】→【等乾】。",
    },
    {
        step: 8, title: "【步驟 8：復勒】", canvasText: "[畫布：色彩厚實的牡丹]", image: "第三情境-第八關.png",
        desc: "因為厚重的顏料蓋住了最初的線條，請使用小號毛筆進行「復勒」，也就是設色後重勾邊緣。",
        actions: [{ text: "進行復勒", next: 9 }]
    },
    {
        step: 9, title: "【步驟 9：立粉】", canvasText: "[畫布：邊緣清晰的牡丹]", image: "第三情境-第九關.png",
        desc: "請點擊牡丹花的中心，使用「立粉」技法，點染花蕊使其產生立體感。",
        actions: [{ text: "進行立粉", next: 10 }]
    },
    {
        step: 10, title: "【步驟 10：烘染】", canvasText: "[畫布：花蕊立體的牡丹]", image: "第三情境-第十關.png",
        desc: "最後一步，使用淡墨在花朵與鳥兒的主體周圍進行「烘染」，透過周圍淡染襯托出畫作的主角。",
        actions: [{ text: "進行烘染", isFinal: true }]
    }
];

// --- 全域變數與狀態管理 ---
let totalScore = 0;
let stage1Score = 0;
let currentQuestionIndex = 0;
let userAnswers = []; 

let stage2Score = 0;
let s2CurrentIndex = 0;
let s2Questions = [];

let stage3Score = 0;
let s3Step = 1;
let alumIndex = 0;
const alumSeq = ['dye', 'dry', 'alum', 'dry']; 
let s3Awarded = {}; 

// --- 計時器變數 ---
let timeElapsed = 0;
let timerInterval = null;

// --- 畫面切換控制 ---
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function updateScoreBoard() {
    document.getElementById('current-score').innerText = totalScore;
}

function formatTime(seconds) {
    let m = Math.floor(seconds / 60).toString().padStart(2, '0');
    let s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// 修正後的 startGame 函式
function startGame() {
    let scoreBoard = document.getElementById('score-board');
    scoreBoard.style.display = 'block';
    
    // 嘗試在遊戲開始時自動播放音樂
    if(!isMusicPlaying) {
        toggleMusic(); 
    }

    // 動態加入計時器 UI
    if (!document.getElementById('timer-display')) {
        let timerDiv = document.createElement('div');
        timerDiv.id = 'timer-display';
        timerDiv.style.fontSize = '1rem';
        timerDiv.style.marginTop = '8px';
        timerDiv.style.fontWeight = 'normal';
        timerDiv.style.color = 'var(--text-color)';
        scoreBoard.appendChild(timerDiv);
    }
    
    // 啟動計時器
    timeElapsed = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeElapsed++;
        document.getElementById('timer-display').innerText = `作答時間：${formatTime(timeElapsed)}`;
    }, 1000);

    switchScreen('screen-stage1');
    loadStage1Question();
}

// --- 第一階段邏輯 ---
function loadStage1Question() {
    if (currentQuestionIndex >= stage1Data.length) {
        checkStage1Result();
        return;
    }

    const data = stage1Data[currentQuestionIndex];
    
    // 動態載入該題的專屬圖片
    const imgElement = document.getElementById('s1-image');
    if (data.image) {
        imgElement.src = data.image;
        imgElement.style.display = 'block'; 
    } else {
        imgElement.style.display = 'none'; 
    }

    document.getElementById('s1-story').innerText = data.story;
    document.getElementById('s1-question').innerText = data.question;
    
    const optionsContainer = document.getElementById('s1-options');
    optionsContainer.innerHTML = '';
    
    const shuffledOptions = [...data.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt.text;
        btn.onclick = () => handleStage1Answer(opt.isCorrect);
        optionsContainer.appendChild(btn);
    });
}

function handleStage1Answer(isCorrect) {
    userAnswers.push(isCorrect); 

    if (isCorrect) {
        alert('答對了！獲得 5 分。');
        stage1Score += 5;
    } else {
        alert('答錯了！此題不得分，但不倒扣。');
    }
    
    totalScore = stage1Score + stage2Score + stage3Score;
    updateScoreBoard();
    currentQuestionIndex++;
    loadStage1Question();
}

function checkStage1Result() {
    document.getElementById('s1-image').style.display = 'none'; 
    document.getElementById('s1-story').innerText = "第一階段測驗結束！";
    document.getElementById('s1-question').innerText = `你的得分為：${stage1Score} 分 (滿分40分)`;
    
    const optionsContainer = document.getElementById('s1-options');
    optionsContainer.innerHTML = ''; 

    const reviewDiv = document.createElement('div');
    reviewDiv.style.textAlign = 'left';
    reviewDiv.style.marginTop = '20px';
    reviewDiv.style.padding = '15px';
    reviewDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.6)'; 
    reviewDiv.style.border = '1px solid var(--border-color)';
    reviewDiv.style.borderRadius = '8px';
    reviewDiv.style.maxHeight = '300px';
    reviewDiv.style.overflowY = 'auto'; 

    let reviewHTML = '<h3 style="margin-top:0; color: var(--primary-color);">【錯題解析】</h3>';
    let hasWrongAnswers = false;
    
    stage1Data.forEach((data, index) => {
        if (!userAnswers[index]) {
            hasWrongAnswers = true;
            const correctOpt = data.options.find(opt => opt.isCorrect).text;
            reviewHTML += `
                <div style="margin-bottom: 15px; border-bottom: 1px dashed var(--border-color); padding-bottom: 10px;">
                    <strong style="font-size: 1.05rem;">Q${index + 1}: ${data.question}</strong><br>
                    <span style="color: var(--secondary-color); font-weight: bold;">正確解答：${correctOpt}</span><br>
                    <span style="color: var(--text-color); font-size: 0.95rem;">💡 解析：${data.explanation}</span>
                </div>
            `;
        }
    });
    
    if (!hasWrongAnswers) {
        reviewHTML += '<p style="color: var(--secondary-color); font-weight: bold;">太厲害了！你全部答對，沒有錯題！</p>';
    }
    
    reviewDiv.innerHTML = reviewHTML;
    optionsContainer.appendChild(reviewDiv);

    if (stage1Score < 20) {
        alert('分數低於 20 分，請閱讀解析後重新測驗！');
        
        const retryBtn = document.createElement('button');
        retryBtn.innerText = '重新測驗';
        retryBtn.style.display = 'block';
        retryBtn.style.margin = '20px auto 0 auto';
        
        retryBtn.onclick = () => {
            stage1Score = 0;
            totalScore = stage2Score + stage3Score; 
            currentQuestionIndex = 0;
            userAnswers = []; 
            updateScoreBoard();
            loadStage1Question(); 
        };
        optionsContainer.appendChild(retryBtn);
    } else {
        document.getElementById('btn-next-stage2').style.display = 'inline-block';
    }
}

// --- 第二階段邏輯 ---
function initStage2() {
    stage2Score = 0;
    s2CurrentIndex = 0;
    s2Questions = [...stage2Data].sort(() => Math.random() - 0.5);
    
    document.getElementById('btn-next-stage3').style.display = 'none';
    document.getElementById('btn-s2-retry').style.display = 'none';
    document.getElementById('drop-zone').style.display = 'flex';
    updateS2Info();
    
    loadStage2Question();
}

function updateS2Info() {
    document.getElementById('s2-info').innerText = `畫師的需求不斷傳來，請將正確的工具拖曳至案頭上。(目前此關得分：${stage2Score} 分)`;
}

function loadStage2Question() {
    if (s2CurrentIndex >= s2Questions.length) {
        checkStage2Result();
        return;
    }

    document.getElementById('s2-result-msg').innerText = '';
    const currentQ = s2Questions[s2CurrentIndex];
    document.getElementById('s2-hint').innerText = `【任務 ${s2CurrentIndex + 1}/10】\n${currentQ.hint}`;

    let options = [currentQ.correct];
    let distractors = toolsList.filter(t => t !== currentQ.correct).sort(() => Math.random() - 0.5).slice(0, 3);
    options = options.concat(distractors).sort(() => Math.random() - 0.5); 

    const dragContainer = document.getElementById('drag-container');
    dragContainer.innerHTML = '';

    options.forEach(opt => {
        const div = document.createElement('div');
        div.className = 'draggable-item';
        div.innerText = opt;
        div.draggable = true;
        
        div.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', opt);
        });
        dragContainer.appendChild(div);
    });

    const dropZone = document.getElementById('drop-zone');
    const newDropZone = dropZone.cloneNode(true);
    dropZone.parentNode.replaceChild(newDropZone, dropZone);

    newDropZone.addEventListener('dragover', (e) => {
        e.preventDefault(); 
        newDropZone.classList.add('dragover');
    });
    
    newDropZone.addEventListener('dragleave', () => {
        newDropZone.classList.remove('dragover');
    });
    
    newDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        newDropZone.classList.remove('dragover');
        const droppedItem = e.dataTransfer.getData('text/plain');
        handleStage2Drop(droppedItem, currentQ.correct);
    });
}

function handleStage2Drop(droppedItem, correctItem) {
    const msgDiv = document.getElementById('s2-result-msg');
    
    if (droppedItem === correctItem) {
        stage2Score += 4;
        msgDiv.style.color = 'var(--secondary-color)';
        msgDiv.innerText = `答對了！正確工具是【${correctItem}】，獲得 4 分。`;
    } else {
        msgDiv.style.color = 'var(--error-color)';
        msgDiv.innerText = `答錯了！此題不得分，但不倒扣。正確工具應該是【${correctItem}】。`;
    }
    
    totalScore = stage1Score + stage2Score + stage3Score;
    updateS2Info();
    updateScoreBoard();

    document.getElementById('drag-container').innerHTML = '';
    s2CurrentIndex++;
    setTimeout(loadStage2Question, 1500); 
}

function checkStage2Result() {
    const dropZone = document.getElementById('drop-zone');
    dropZone.style.display = 'none';
    document.getElementById('drag-container').innerHTML = '';
    document.getElementById('s2-hint').innerText = `第二階段測驗結束！你的得分為：${stage2Score} 分 (滿分40分)`;
    document.getElementById('s2-result-msg').innerText = '';

    if (stage2Score < 35) {
        alert('分數低於 35 分，不符合畫師要求，請重新測驗！');
        document.getElementById('btn-s2-retry').style.display = 'inline-block';
    } else {
        document.getElementById('btn-next-stage3').style.display = 'inline-block';
    }
}

function retryStage2() {
    totalScore -= stage2Score;
    updateScoreBoard();
    initStage2();
}

// --- 關卡跳轉 ---
function goToStage(stageNum) {
    if(stageNum === 2) {
        switchScreen('screen-stage2');
        initStage2();
    }
    if(stageNum === 3) {
        switchScreen('screen-stage3');
        initStage3(); 
    }
}

// --- 第三階段邏輯 ---
function initStage3() {
    stage3Score = 0;
    s3Step = 1;
    alumIndex = 0;
    s3Awarded = {}; 
    document.getElementById('btn-finish').style.display = 'none';
    
    // 初始化時確保畫布遮罩層是透明的
    document.getElementById('s3-canvas-layer').style.backgroundColor = 'transparent';
    loadS3Step(s3Step);
}

function loadS3Step(stepNum) {
    s3Step = stepNum;
    const data = stage3Data.find(d => d.step === stepNum);
    
    document.getElementById('s3-story').innerHTML = `<strong style="color:var(--primary-color)">${data.title}</strong><br>${data.desc}`;
    
    // 控制第三階段畫布圖片的顯示
    const imgElement = document.getElementById('s3-image');
    const canvasText = document.getElementById('s3-canvas-text');
    
    if (data.image) {
        imgElement.src = data.image;
        imgElement.style.display = 'block'; 
        canvasText.style.display = 'none'; 
    } else {
        imgElement.style.display = 'none';
        canvasText.innerText = data.canvasText;
        canvasText.style.display = 'block';
    }

    const controls = document.getElementById('s3-controls');
    controls.innerHTML = '';

    if (stepNum === 7) {
        const btnDye = createS3Btn("染 2～3 次", () => handleAlumChoice('dye'));
        const btnDry = createS3Btn("等乾", () => handleAlumChoice('dry'));
        const btnAlum = createS3Btn("上一層薄膠礬水", () => handleAlumChoice('alum'));
        controls.append(btnDye, btnDry, btnAlum);
        return;
    }

    data.actions.forEach(act => {
        const btn = createS3Btn(act.text, () => {
            if (act.errorMsg) {
                alert(act.errorMsg);
            } else {
                if (act.alertMsg) alert(act.alertMsg);
                
                if (stepNum >= 1 && stepNum <= 6 && !s3Awarded[stepNum]) {
                    stage3Score += 3;
                    s3Awarded[stepNum] = true;
                    totalScore = stage1Score + stage2Score + stage3Score;
                    updateScoreBoard();
                }

                if (act.isFinal) {
                    showS3Finish();
                } else {
                    document.getElementById('s3-canvas-layer').style.backgroundColor = `rgba(195, 74, 65, ${stepNum * 0.05})`;
                    loadS3Step(act.next);
                }
            }
        });
        controls.appendChild(btn);
    });
}

function createS3Btn(text, onClickHandler) {
    const btn = document.createElement('button');
    btn.className = 's3-btn';
    btn.innerText = text;
    btn.onclick = onClickHandler;
    return btn;
}

function handleAlumChoice(choice) {
    if (choice === alumSeq[alumIndex]) {
        alumIndex++;
        document.getElementById('s3-canvas-layer').style.backgroundColor = `rgba(195, 74, 65, ${0.3 + (alumIndex * 0.1)})`;

        if (alumIndex === alumSeq.length) {
            alert("三礬九染順序正確！畫面色彩層次豐富且乾淨！");
            
            if (!s3Awarded[7]) {
                stage3Score += 2;
                s3Awarded[7] = true;
                totalScore = stage1Score + stage2Score + stage3Score;
                updateScoreBoard();
            }
            
            alumIndex = 0;
            loadS3Step(8); 
        }
    } else {
        const layer = document.getElementById('s3-canvas-layer');
        layer.style.backgroundColor = 'rgba(122, 118, 113, 0.9)'; 
        
        if(document.getElementById('s3-canvas-text').style.display !== 'none') {
             document.getElementById('s3-canvas-text').innerText = "[畫面顯髒，混色失敗]";
        }
        
        alert("混色失敗，畫面顯髒！此錯誤不倒扣分，請重新此步驟。");
        alumIndex = 0;
        
        setTimeout(() => {
            layer.style.backgroundColor = 'rgba(195, 74, 65, 0.3)'; 
            if(document.getElementById('s3-canvas-text').style.display !== 'none') {
                document.getElementById('s3-canvas-text').innerText = "[畫布：開始進行三礬九染]";
            }
        }, 1200);
    }
}

function showS3Finish() {
    document.getElementById('s3-story').innerHTML = "<strong style='color:var(--primary-color); font-size:1.2rem;'>【通關結算】</strong><br>隨著最後一筆烘染完成，整幅《富貴牡丹花鳥圖》躍然紙上。<br>系統顯示：「恭喜你完整掌握了工筆畫的核心技法，從一根線條到繁花似錦，你已具備成為宮廷畫師的資格！」";
    
    // 1. 強制顯示第十關的完成圖
    const imgElement = document.getElementById('s3-image');
    imgElement.src = "第三情境-第十關.png";
    imgElement.style.display = 'block';
    
    // 2. 隱藏畫布上的預設文字
    document.getElementById('s3-canvas-text').style.display = 'none';
    
    // 3. 調整遮罩層（稍微調淡透明度為 0.15，不要擋住美美的完成圖）
    document.getElementById('s3-canvas-layer').style.backgroundColor = 'rgba(91, 122, 107, 0.15)'; 
    
    document.getElementById('s3-controls').innerHTML = '';
    document.getElementById('btn-finish').style.display = 'inline-block';
}

// --- 結算邏輯 ---
function finishGame() {
    clearInterval(timerInterval);

    document.getElementById('score-board').style.display = 'none';
    switchScreen('screen-result');
    
    document.getElementById('final-score-display').innerText = `最終總分：${totalScore} 分\n完成耗時：${formatTime(timeElapsed)}`;
    
    let title = "";
    let feedback = "";
    
    if (totalScore >= 98) {
        title = "【傳世神筆】";
        feedback = "你的技法已達化境，不僅完美掌握了工筆畫的形似，更懂得了傳神的氣韻，夏爺爺以藝載道的大願，將由你繼續傳承。";
    } else if (totalScore >= 95) {
        title = "【皇家畫師】";
        feedback = "你的基本功十分扎實，對歷史脈絡與匠人工具都有深刻的了解，假以時日，必能創作出感動人心的不朽畫作。";
    } else {
        title = "【潛力丹青學徒】";
        feedback = "三礬九染之路漫長且需耐心，你已經踏出了穩健的第一步，請繼續保持對藝術的熱忱與初衷。";
    }

    document.getElementById('final-title').innerText = title;
    document.getElementById('final-feedback').innerText = feedback;
}

function resetGame() {
    totalScore = 0;
    stage1Score = 0;
    currentQuestionIndex = 0;
    userAnswers = []; 
    stage2Score = 0;
    s2CurrentIndex = 0;
    stage3Score = 0;
    s3Step = 1;
    alumIndex = 0;
    s3Awarded = {};
    timeElapsed = 0;
    clearInterval(timerInterval);
    updateScoreBoard();
    
    let timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) timerDisplay.innerText = '';

    document.getElementById('btn-next-stage2').style.display = 'none';
    switchScreen('screen-home');
}