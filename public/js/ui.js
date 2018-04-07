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

    function setupTabs() {
      const dynamicTabBar = new mdc.tabs.MDCTabBar(document.querySelector('#dynamic-tab-bar'));
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
        setupFilterByText();
        setupFilterByLevel();
        setupFilterByBranch();
        setupCourseTable();

        const courseTable = {
          element: document.querySelector('#alchemy-course-filter--by-search')
        };

        const courseFilter = {
          departmentId: null,
          text: null,
          level: null
        };

        function onFilterChange() {
          const filteredFilter = filterObject(courseFilter);
          alchemy.course.search(filteredFilter, (data) => {
            const transformedData = Course.transform(data, 'table');
            courseTable.mdcDataTableHelper
              .setData(transformedData);
          });
        }

        function setupFilterByText() {
          const courseFilterByText = document.querySelector('#alchemy-course-filter--search');
          if (courseFilterByText) {
            const searchTextField = mdc.textField.MDCTextField.attachTo(courseFilterByText);
            const searchInput = searchTextField.input_;
            searchInput.addEventListener('input', onSearchInputChange);

            function onSearchInputChange(inputEvent) {
              courseFilter.text = inputEvent.srcElement.value;
              onFilterChange();
            }
          }
        }

        function setupFilterByBranch() {
          const courseFilterByBranch = { element: document.querySelector('#alchemy-course-filter--by-branch') };
          courseFilterByBranch.mdcSelectHandler =
            MDCSelectHandler
              .handle(courseFilterByBranch.element)
              .clearItems()
              .init('Select branch', { storeData: true })
              .disable();

          const allBranchesItem = { id: null, name: 'All', programme_id: alchemy.keys.programme };
          alchemy.department.all((list) => {
            courseFilterByBranch.mdcSelectHandler
              .addItems(
                list.concat([allBranchesItem]),
                { assignments: { valueKey: 'name', idKey: 'alias' } }
              )
              .setOnChangeListener(onBranchChange)
              .enable();

            function onBranchChange() {
              const selectedItem = courseFilterByBranch.mdcSelectHandler.getSelected();
              courseFilter.departmentId = selectedItem.data.id;
              onFilterChange();
            }
          });
        }

        function setupFilterByLevel() {
          const courseFilterByLevel = { element: document.querySelector('#alchemy-course-filter--by-level') };
          courseFilterByLevel.mdcSelectHandler =
            MDCSelectHandler
              .handle(courseFilterByLevel.element)
              .clearItems()
              .init('Select level', { storeData: true })
              .disable();

          const { programme } = alchemy.current;
          const allLevelsItem = { id: null, level: 'All' };
          const levelsList = Programme.transform(programme, 'list').concat([allLevelsItem]);

          courseFilterByLevel.mdcSelectHandler
            .addItems(levelsList, { assignments: { valueKey: 'level', idKey: 'id' } })
            .setOnChangeListener(onLevelChange)
            .enable();

          function onLevelChange() {
            const selectedItem = courseFilterByLevel.mdcSelectHandler.getSelected();
            courseFilter.level = selectedItem.data.id;
            onFilterChange();
          }
        }

        function setupCourseTable() {
          alchemy.course.search({}, (data) => {
            const headers = ['Code', 'Alias', 'Name', 'L', 'P', 'T', 'Credit'];
            const dataTypes = ['Code', 'Alias', 'Name', 1, 1, 1, 1];
            const transformedData = Course.transform(data, 'table');
            courseTable.mdcDataTableHelper =
              MDCDataTableHelper
                .handle(courseTable.element)
                .setIdKey('id')
                .setHeaders(headers, dataTypes)
                .setData(transformedData);
          });
        }
      }
    }
    function setupTimeTableSection() {}
  },
  onFail: (error) => {
    Logger.error('Alchemy has crashed due to API communication issues.', error);
  }
});
