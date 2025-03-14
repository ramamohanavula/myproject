function initSliders(block) {
  const sliders = block.querySelectorAll(':scope > div');
  const tabsContainer = document.createElement('div');
  const contentContainer = document.createElement('div');
  const tabsMap = new Map();

  tabsContainer.classList.add('tabs');
  contentContainer.classList.add('tab-content');

  sliders.forEach((slider, index) => {
    const tabName = slider.children[0].textContent;
    let tab, content;

    if (tabsMap.has(tabName)) {
      tab = tabsMap.get(tabName).tab;
      content = tabsMap.get(tabName).content;
    } else {
      tab = document.createElement('button');
      tab.textContent = tabName;
      tab.classList.add('tab');
      if (index === 0) tab.classList.add('active');

      content = document.createElement('div');
      content.classList.add('content');
      if (index !== 0) content.style.display = 'none';
      else content.style.display = 'flex'; // Show the first tab by default

      tab.addEventListener('click', () => {
        block.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        block.querySelectorAll('.content').forEach(c => c.style.display = 'none');

        tab.classList.add('active');
        content.style.display = 'flex';

        if (tabName === 'All cards') {
          content.innerHTML = ''; // Clear existing content
          sliders.forEach((slider) => {
            for (let i = 1; i < slider.children.length; i++) {
              const listItem = document.createElement('div');
              listItem.classList.add('list-item');

              const image = slider.children[i].querySelector('img');
              if (image) {
                const imgWrapper = document.createElement('div');
                imgWrapper.classList.add('img-wrapper');
                imgWrapper.appendChild(image.cloneNode(true));
                listItem.appendChild(imgWrapper);
              }

              const textContent = document.createElement('div');
              textContent.classList.add('text-content');
              const clonedContent = slider.children[i].cloneNode(true);
              const imgInContent = clonedContent.querySelector('img');
              if (imgInContent) imgInContent.remove(); // Remove the image from the cloned content
              textContent.innerHTML = clonedContent.innerHTML;
              listItem.appendChild(textContent);

              content.appendChild(listItem);
            }
          });
        }
      });

      tabsContainer.appendChild(tab);
      contentContainer.appendChild(content);
      tabsMap.set(tabName, { tab, content });
    }

    for (let i = 1; i < slider.children.length; i++) {
      const column = document.createElement('div');
      column.innerHTML = slider.children[i].innerHTML;
      column.classList.add('column');
      content.appendChild(column);
    }
  });

  block.innerHTML = '';
  block.appendChild(tabsContainer);
  block.appendChild(contentContainer);
}

document.querySelectorAll('.sliders-wrapper .sliders').forEach(initSliders);
