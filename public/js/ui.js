window.onload = function () {
  initMasterTabs();
  initCoursesSection();
};

function initMasterTabs() {
  const dynamicTabBar = window.dynamicTabBar = new mdc.tabs.MDCTabBar(document.querySelector('#dynamic-tab-bar'));
  const panels = document.querySelector('.panels');

  dynamicTabBar.preventDefaultOnClick = true;

  function updatePanel(index) {
    const activePanel = panels.querySelector('.panel.active');
    if (activePanel) {
      activePanel.classList.remove('active');
    }
    const newActivePanel = panels.querySelector('.panel:nth-child(' + (index + 1) + ')');
    if (newActivePanel) {
      newActivePanel.classList.add('active');
    }
  }

  dynamicTabBar.listen('MDCTabBar:change', function (t) {
    const dynamicTabBar = t.detail;
    const nthChildIndex = dynamicTabBar.activeTabIndex;

    updatePanel(nthChildIndex);
  });
}
function initCoursesSection() {
  const AlchemyCourses = document.querySelector('#alchemy-courses');

  if(!AlchemyCourses) {
    return;
  }

  //=================================================================================================================
  const AlchemyCourseFilterSearch = document.querySelector('#alchemy-course-filter--search');
  if(AlchemyCourseFilterSearch) {
    const searchTextField = mdc.textField.MDCTextField.attachTo(AlchemyCourseFilterSearch);
    const searchInput = AlchemyCourseFilterSearch.querySelector('#alchemy-course-filter--search-input');
  }

//=================================================================================================================
  const AlchemyCourseFilterByLevel = document.querySelector('#alchemy-course-filter--by-level');
  if(AlchemyCourseFilterByLevel) {
    fixFOUC(AlchemyCourseFilterByLevel);
    const select = mdc.select.MDCSelect.attachTo(AlchemyCourseFilterByLevel);
    select.listen('MDCSelect:change', () => {
      alert(`Selected "${select.selectedOptions[0].textContent}" at index ${select.selectedIndex} ` +
        `with value "${select.value}"`);
    });
  }

  //=================================================================================================================
  const AlchemyCourseFilterByBranch = document.querySelector('#alchemy-course-filter--by-branch');
  if(AlchemyCourseFilterByBranch) {
    fixFOUC(AlchemyCourseFilterByBranch);
    const select = mdc.select.MDCSelect.attachTo(AlchemyCourseFilterByBranch);
    select.listen('MDCSelect:change', () => {
      alert(`Selected "${select.selectedOptions[0].textContent}" at index ${select.selectedIndex} ` +
        `with value "${select.value}"`);
    });
  }

  //=================================================================================================================
  var tables = document.querySelectorAll('.mdc-data-table')
  Array.prototype.forEach.call(tables, (table) => new MDCDataTable(table));
}

/*
* Method to fix MDCSelect bug,
* where using default selected value ('aria-selected') doesn't float the label.
*
* Usage : fixFOUC(document.querySelector('.mdc-select'));
* Issue link : https://github.com/material-components/material-components-web/issues/1835
* */
function fixFOUC(target) {
  if(!target)
    return;

  const hasDefaultSelected = ([].filter.call(
    target.querySelectorAll('li'),
    (e) => (e.hasAttribute('aria-selected')))
  ).length > 0;
  if(hasDefaultSelected) {
    target.querySelector('.mdc-select__label').classList.add('mdc-select__label--float-above');
  }
}
