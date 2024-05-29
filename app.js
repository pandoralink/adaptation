import { Gallery } from './image-list.js';

const foo = ()=> {
  const search = window.location.search;
  const searchParam = new URLSearchParams(search.split('?')[1] || "");
  const addParam = searchParam.get("add");
  if(addParam!==null) {
    const add = localStorage.getItem("add") || 0;
    localStorage.setItem("add",Number(add)+ 1);
  }
}
foo();
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        'sw.js',
        {
          scope: './',
        }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const imgSection = document.querySelector('section');

const getImageBlob = async (url) => {
  const imageResponse = await fetch(url);
  if (!imageResponse.ok) {
    throw new Error(
      `Image didn't load successfully; error code: ${
        imageResponse.statusText || imageResponse.status
      }`
    );
  }
  return imageResponse.blob();
};

const createGalleryFigure = async (galleryImage) => {
  try {
    const imageBlob = await getImageBlob(galleryImage.url);
    const myImage = document.createElement('img');
    const myCaption = document.createElement('caption');
    const myFigure = document.createElement('figure');
    const myName = document.createElement('span');
    myName.textContent = `${galleryImage.name}: `;
    const myCredit = document.createElement('span');
    myCredit.innerHTML = `Taken by ${galleryImage.credit}`;
    myCaption.append(myName, myCredit);
    myImage.src = window.URL.createObjectURL(imageBlob);
    myImage.setAttribute('alt', galleryImage.alt);
    myFigure.append(myImage, myCaption);
    imgSection.append(myFigure);
  } catch (error) {
    console.error(error);
  }
};

registerServiceWorker();
Gallery.images.map(createGalleryFigure);
// 从localStorage中获取键为'add'的值
var itemValue = localStorage.getItem('add');

// 验证是否成功获取了值
if (itemValue) {
    // 创建一个新的div元素
    var newDiv = document.createElement('div');

    // 设置div的文本内容为从localStorage中获取的值
    newDiv.textContent = itemValue;

    // 将新的div添加到body的末尾
    document.body.appendChild(newDiv);
} else {
    // 如果localStorage中没有'add'这个键，或者值为空，可以创建一个提示div
    var noItemDiv = document.createElement('div');
    noItemDiv.textContent = 'localStorage中没有找到键为"add"的值';
    document.body.appendChild(noItemDiv);
}

