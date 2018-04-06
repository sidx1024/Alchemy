/* eslint-disable no-undef */

function initMasterTabs() {
  const dynamicTabBar = window.dynamicTabBar = new mdc.tabs.MDCTabBar(document.querySelector('#dynamic-tab-bar'));
  const panels = document.querySelector('.panels');

  dynamicTabBar.preventDefaultOnClick = true;

  function updatePanel(index) {
    const activePanel = panels.querySelector('.panel.active');
    if (activePanel) {
      activePanel.classList.remove('active');
    }
    const newActivePanel = panels.querySelector(`.panel:nth-child(${index + 1})`);
    if (newActivePanel) {
      newActivePanel.classList.add('active');
    }
  }

  dynamicTabBar.listen('MDCTabBar:change', (t) => {
    const dynamicTabBar = t.detail;
    const nthChildIndex = dynamicTabBar.activeTabIndex;

    updatePanel(nthChildIndex);
  });
}

function initCoursesSection() {
  const AlchemyCourses = document.querySelector('#alchemy-courses');

  if (!AlchemyCourses) {
    return;
  }

  const courseFilter = {
    departmentId: null,
    text: null,
    level: null
  };

  function onFilterChange() {
    const filteredFilter = filterObject(courseFilter);
    alchemy.course.search(filteredFilter, (data) => {
      const transformedData = alchemy.course.transform(data, 'table');
      CourseBySearch.mdcDataTableHelper
        .setData(transformedData);
    });
  }

  const CourseFilterSearchByText = document.querySelector('#alchemy-course-filter--search');
  if (CourseFilterSearchByText) {
    const searchTextField = mdc.textField.MDCTextField.attachTo(CourseFilterSearchByText);
    const searchInput = CourseFilterSearchByText.querySelector('#alchemy-course-filter--search-input');
    searchInput.addEventListener('input', onTextChange);

    function onTextChange(inputEvent) {
      courseFilter.text = inputEvent.srcElement.value;
      onFilterChange();
    }
  }

  const CourseByBranch = { element: document.querySelector('#alchemy-course-filter--by-branch') };
  CourseByBranch.mdcSelectHandler =
    MDCSelectHandler
      .handle(CourseByBranch.element)
      .clearItems()
      .init('Select branch', { storeData: true })
      .disable();

  const allBranchItem = [{ id: null, name: 'All', programme_id: 1 }];
  alchemy.department.all((list) => {
    CourseByBranch.mdcSelectHandler
      .addItems(
        list.concat(allBranchItem),
        { assignments: { valueKey: 'name', idKey: 'alias' } }
      )
      .setOnChangeListener(onBranchChange)
      .enable();

    function onBranchChange() {
      const selectedItem = CourseByBranch.mdcSelectHandler.getSelected();
      const branchId = selectedItem.data.id;
      courseFilter.departmentId = branchId;
      onFilterChange();
    }
  });

  const CourseByLevel = { element: document.querySelector('#alchemy-course-filter--by-level') };
  CourseByLevel.mdcSelectHandler =
    MDCSelectHandler
      .handle(CourseByLevel.element)
      .clearItems()
      .init('Select level', { storeData: true })
      .disable();

  const levels = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
    { id: 4, level: 4 },
    { id: null, level: 'All' }
  ];

  CourseByLevel.mdcSelectHandler
    .addItems(levels, { assignments: { valueKey: 'level', idKey: 'id' } })
    .setOnChangeListener(onLevelChange)
    .enable();

  function onLevelChange() {
    const selectedItem = CourseByLevel.mdcSelectHandler.getSelected();
    courseFilter.level = selectedItem.data.id;
    onFilterChange();
  }

  const CourseBySearch = { element: document.querySelector('#alchemy-course-filter--by-search') };
  alchemy.course.search({}, (data) => {
    const headers = ['Code', 'Alias', 'Name', 'L', 'P', 'T', 'Credit'];
    const dataTypes = [1, 'Alias', 'Name', 1, 1, 1, 1];
    const transformedData = alchemy.course.transform(data, 'table');
    CourseBySearch.mdcDataTableHelper =
      MDCDataTableHelper
        .handle(CourseBySearch.element)
        .setIdKey('id')
        .setHeaders(headers, dataTypes)
        .setData(transformedData);

  });
}

function filterObject(obj) {
  const keys = Object.keys(obj);
  const filteredObj = {};
  keys.forEach((key) => {
    if (obj[key] !== null && obj[key] !== undefined) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
}

window.onload = () => {
  initMasterTabs();
  initCoursesSection();
};
