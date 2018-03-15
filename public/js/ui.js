window.onload = function () {
  initMasterTabs();
  initCoursesSection();
};

function initMasterTabs() {
  const dynamicTabBar = window.dynamicTabBar = new mdc.tabs.MDCTabBar(
    document.querySelector('#dynamic-tab-bar'));
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

  if (!AlchemyCourses) {
    return;
  }

  //=================================================================================================================
  const AlchemyCourseFilterSearch = document.querySelector('#alchemy-course-filter--search');
  if (AlchemyCourseFilterSearch) {
    const searchTextField = mdc.textField.MDCTextField.attachTo(AlchemyCourseFilterSearch);
    const searchInput = AlchemyCourseFilterSearch.querySelector(
      '#alchemy-course-filter--search-input');
  }

//=================================================================================================================

  const CourseByBranch = {element: document.querySelector('#alchemy-course-filter--by-branch')};
  CourseByBranch.mdcSelectHandler =
    MDCSelectHandler
      .handle(CourseByBranch.element)
      .clearItems()
      .init('Select branch', {storeData: true})
      .disable();

  alchemy.department.all(function (list) {
    CourseByBranch.mdcSelectHandler
                  .addItems(list, {assignments: {valueKey: 'name', idKey: 'alias'}})
                  .setOnChangeListener(onBranchChange)
                  .enable();
    function onBranchChange() {
      console.log(CourseByBranch.mdcSelectHandler.getSelected());
    }
  });

  const CourseByLevel = {element: document.querySelector('#alchemy-course-filter--by-level')};
  CourseByLevel.mdcSelectHandler =
    MDCSelectHandler
      .handle(CourseByLevel.element)
      .clearItems()
      .init('Select level', {storeData: true})
      .disable();

  const levels = [
    {id: 1, level: 1},
    {id: 2, level: 2},
    {id: 3, level: 3},
    {id: 4, level: 4},
  ];

  CourseByLevel.mdcSelectHandler
                .addItems(levels, {assignments: {valueKey: 'level', idKey: 'id'}})
                .setOnChangeListener(onLevelChange)
                .enable();

  function onLevelChange() {
    console.log(CourseByLevel.mdcSelectHandler.getSelected());
  }

  //=================================================================================================================
  const tables = document.querySelectorAll('.mdc-data-table');
  Array.prototype.forEach.call(tables, (table) => new MDCDataTable(table));
}
