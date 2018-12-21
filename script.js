var datas = [
	{
		no: 1,
		title: 'js Drum!',
        desc: '鍵盤爵士鼓',
        blog: './images/',
        demo: 'https://guahsu.io/JavaScript30/01_Java-Script-Drum-Kit/index-GuaHsu.html',
		github: 'https://github.com/guahsu/JavaScript30/tree/master/01_Java-Script-Drum-Kit/',
		gifYn: 'N',
    }
];

function createView() {
	var couseList = document.querySelector('.courseList');
	var view = '';
	datas.forEach(data => {
		view += `<li>
              <div class="course ${data.gifYn === 'Y' ? 'hasGif' : ''}">
                <div class="course__image">
                  <div class="course__ribbon"><div class="course__no">#${data.no}</div></div>
                  <div class="course__loading"></div>
                  <img src="${data.blog}demo${data.no}.png" alt="demo${data.no}">
                </div>
                <h2 class="course__title">#${data.no} - ${data.title}</h2>
                <div class="course__desc">${data.desc}</div>
                <a class="course__btn" href="${
									data.demo
								}" target="_blank" onclick="ga('send', 'event', 'button', 'click', 'js30-blog-${data.no}', 1);">DEMO</a>
                <a class="course__btn" href="${
									data.github
								}" target="_blank" onclick="ga('send', 'event', 'button', 'click', 'js30-github-${
			data.no
		}', 1);">GitHub</a>
              </div>
            </li>`;
	});
	document.querySelector('.courseList').innerHTML = view;
	// 加上滑鼠移入移出的效果監聽
	var courses = Array.from(document.querySelectorAll('.course'));
	courses.forEach(course => {
		course.addEventListener('mouseenter', changeImgaeType);
		course.addEventListener('mouseleave', changeImgaeType);
	});
}

/** 圖片讀取檢查 */
function checkLoad(image) {
	var loadEl = image.parentElement.querySelector('.course__loading');
	setTimeout(function() {
		if (image.complete) {
			loadEl.style.display = 'none';
		} else {
			loadEl.style.display = 'block';
			checkLoad(image);
		}
	}, 100);
}

/** 變更圖片類別(滑鼠移入載GIF) */
function changeImgaeType() {
	if (this.classList.contains('hasGif')) {
		var courseImg = this.querySelector('img');
		var isPlay = courseImg.classList.contains('gif-play');
		isPlay ? courseImg.classList.remove('gif-play') : courseImg.classList.add('gif-play');
		var type = isPlay ? ['gif', 'png'] : ['png', 'gif'];
		var image = courseImg.getAttribute('src').replace(type[0], type[1]);
		courseImg.setAttribute('src', image);
		checkLoad(courseImg);
	}
}

/** 啟動-用arrow function判斷是否有支援ES6 */
(function() {
	try {
		new Function('(a = 0) => a');
		createView();
	} catch (err) {
		document.querySelector('.courseList').innerHTML =
			'<h2>這裡空空一片是因為你的瀏覽器不支援ES6的語法<br>請升級你的瀏覽器或使用最新的Chrome吧!</h2>';
	}
})();
