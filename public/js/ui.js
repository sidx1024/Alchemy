/* eslint-disable no-undef,no-underscore-dangle,no-use-before-define,no-inner-declarations */

/*
|--------------------------------------------------------------------------
| User Interface
|--------------------------------------------------------------------------
|
| DOM initialization & manipulation.
|
*/

window.alchemy = new Alchemy({
  onReady: () => {
    setupTabs();
    setupCoursesSection();
    setupTimeTableSection();
  },
  onFail: (error) => {
    Logger.error('Alchemy has crashed due to API communication issues.', error);
  }
});

function setupTabs() {
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

function setupCoursesSection() {
  const alchemyCourses = document.querySelector('#alchemy-courses');

  if (alchemyCourses) {
    setupCourseViewer();
  }

  function setupCourseViewer() {
    const courseFilter = {
      departmentId: null,
      text: null,
      level: null
    };

    function onFilterChange() {
      const filteredFilter = filterObject(courseFilter);
      alchemy.course.search(filteredFilter, (data) => {
        const transformedData = alchemy.course.transform(data, 'table');
        courseBySearch.mdcDataTableHelper
          .setData(transformedData);
      });
    }

    const courseFilterSearchByText = document.querySelector('#alchemy-course-filter--search');
    if (courseFilterSearchByText) {
      const searchTextField = mdc.textField.MDCTextField.attachTo(courseFilterSearchByText);
      const searchInput = searchTextField.input_;
      searchInput.addEventListener('input', onSearchInputChange);

      function onSearchInputChange(inputEvent) {
        courseFilter.text = inputEvent.srcElement.value;
        onFilterChange();
      }
    }

    const courseByBranch = { element: document.querySelector('#alchemy-course-filter--by-branch') };
    courseByBranch.mdcSelectHandler =
      MDCSelectHandler
        .handle(courseByBranch.element)
        .clearItems()
        .init('Select branch', { storeData: true })
        .disable();

    const allBranchesItem = { id: null, name: 'All', programme_id: alchemy.keys.programme };
    alchemy.department.all((list) => {
      courseByBranch.mdcSelectHandler
        .addItems(
          list.concat([allBranchesItem]),
          { assignments: { valueKey: 'name', idKey: 'alias' } }
        )
        .setOnChangeListener(onBranchChange)
        .enable();

      function onBranchChange() {
        const selectedItem = courseByBranch.mdcSelectHandler.getSelected();
        courseFilter.departmentId = selectedItem.data.id;
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

    const { programme } = alchemy.current;
    const allLevelsItem = { id: null, level: 'All' };
    const levelsList = alchemy.programme.transform(programme, 'list').concat([allLevelsItem]);

    CourseByLevel.mdcSelectHandler
      .addItems(levelsList, { assignments: { valueKey: 'level', idKey: 'id' } })
      .setOnChangeListener(onLevelChange)
      .enable();

    function onLevelChange() {
      const selectedItem = CourseByLevel.mdcSelectHandler.getSelected();
      courseFilter.level = selectedItem.data.id;
      onFilterChange();
    }

    const courseBySearch = { element: document.querySelector('#alchemy-course-filter--by-search') };
    alchemy.course.search({}, (data) => {
      const headers = ['Code', 'Alias', 'Name', 'L', 'P', 'T', 'Credit'];
      const dataTypes = [1, 'Alias', 'Name', 1, 1, 1, 1];
      const transformedData = alchemy.course.transform(data, 'table');
      courseBySearch.mdcDataTableHelper =
        MDCDataTableHelper
          .handle(courseBySearch.element)
          .setIdKey('id')
          .setHeaders(headers, dataTypes)
          .setData(transformedData);
    });
  }
}

function setupTimeTableSection() {}
