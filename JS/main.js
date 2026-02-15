/* ======================================================
   =============== 1️⃣ Element Selection =================
   ====================================================== */

/*
   NodeList يحتوي كل الصور داخل السلايدر
*/
const arrImages = document.querySelectorAll(".images img");

const bulltseDiv = document.querySelector(".bulltse");
const nowCountImg = document.querySelector(".now");
const allImgs = document.querySelector(".all");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".previous");

/*
   count يمثل index للصورة الحالية
*/
let count = 0;


/* ======================================================
   =============== 2️⃣ Create Bullets ====================
   ====================================================== */

/*
   ينشئ bullets بناءً على عدد الصور
   نستخدم dataset لتخزين رقم كل صورة
*/
function createBullets() {
    const ul = document.createElement("ul");

    arrImages.forEach((_, index) => {
        ul.innerHTML += `<li data-num="${index}"></li>`;
    });

    bulltseDiv.appendChild(ul);
}

createBullets();

/*
   بعد الإنشاء نحدد العناصر مرة واحدة فقط
*/
const lis = document.querySelectorAll(".bulltse li");


/* ======================================================
   =============== 3️⃣ Main State Controller =============
   ====================================================== */

/*
   checker = العقل المركزي للسلايدر
   أي تغيير في count يستدعي هذه الدالة
   لتحديث:
   - حالة الأزرار
   - الصور
   - الـ bullets
   - العداد
*/
function updateSlider() {

    /* --- التحكم بإخفاء الأزرار عند الحدود --- */
    prevBtn.classList.toggle("done", count === 0);
    nextBtn.classList.toggle("done", count === arrImages.length - 1);

    /* --- تحديث الصور --- */
    arrImages.forEach((img, index) => {
        img.classList.toggle("active", index === count);
        img.classList.toggle("back", index < count);
    });

    /* --- تحديث الـ bullets --- */
    lis.forEach(li =>
        li.classList.toggle("active", Number(li.dataset.num) === count)
    );

    /* --- تحديث العداد مع تنسيق رقمين --- */
    const format = num => String(num).padStart(2, "0");

    nowCountImg.textContent = format(count + 1);
    allImgs.textContent = `/${format(arrImages.length)}`;
}

updateSlider();


/* ======================================================
   =============== 4️⃣ Navigation Logic ==================
   ====================================================== */

/*
   نتحقق من الحدود قبل زيادة أو إنقاص count
   لمنع تجاوز المصفوفة
*/
function nextImage() {
    if (count < arrImages.length - 1) {
        count++;
        updateSlider();
    }
}

function previousImage() {
    if (count > 0) {
        count--;
        updateSlider();
    }
}


/* ======================================================
   =============== 5️⃣ Event Listeners ===================
   ====================================================== */

/* أزرار التنقل */
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", previousImage);

/*
   Event Delegation بدل إضافة listener لكل bullet
   يقلل عدد الـ listeners ويحسن الأداء
*/
bulltseDiv.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        count = Number(e.target.dataset.num);
        updateSlider();
    }
});

/*
   دعم الكيبورد للتنقل
*/
window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") previousImage();
});
