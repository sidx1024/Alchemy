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
    setupCommon();
    setupTabs();
    setupCoursesSection();
    setupTimeTableSection();

    function setupCommon() {
      window.alchemyCommon = {};
    }

    function setupTabs() {
      const alchemyTabs = new mdc.tabs.MDCTabBar(document.querySelector('#dynamic-tab-bar'));
      const panels = document.querySelector('.panels');

      alchemyTabs.preventDefaultOnClick = true;

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

      alchemyTabs.listen('MDCTabBar:change', (t) => {
        const nthChildIndex = t.detail.activeTabIndex;
        updatePanel(nthChildIndex);
      });
    }

    function setupCoursesSection() {
      const alchemyCourses = {
        element: document.querySelector('#alchemy-courses'),
        courseAddButton: { element: document.querySelector('#alchemy-course-add-button') },
        courseEditButton: { element: document.querySelector('#alchemy-course-edit-button') },
        courseDeleteButton: { element: document.querySelector('#alchemy-course-delete-button') },
        courseFilterByText: { element: document.querySelector('#alchemy-course-filter--by-text') },
        courseFilterByBranch: { element: document.querySelector('#alchemy-course-filter--by-branch') },
        courseFilterByLevel: { element: document.querySelector('#alchemy-course-filter--by-level') },
        courseTable: { element: document.querySelector('#alchemy-course-table') }
      };

      if (alchemyCourses.element) {
        setupCourseViewer();
      }

      function setupCourseViewer() {
        const { courseTable } = alchemyCourses;

        const courseFilter = {
          departmentId: null,
          text: null,
          level: null
        };

        setupFilterByText();
        setupFilterByLevel();
        setupFilterByBranch();
        setupCourseTable();
        setupEvents();

        courseTable.refresh = () => {
          courseTable.deselectCourses();
          alchemy.course.search(filterObject(courseFilter), (data) => {
            const transformedData = Course.transform(data, 'table');
            courseTable.mdcDataTableHelper
              .setData(transformedData);
          });
        };

        function setupFilterByText() {
          const { courseFilterByText } = alchemyCourses;
          if (courseFilterByText.element) {
            const searchTextField = mdc.textField.MDCTextField.attachTo(courseFilterByText.element);
            const searchInput = searchTextField.input_;
            searchInput.addEventListener('input', onSearchInputChange);

            function onSearchInputChange(inputEvent) {
              courseFilter.text = inputEvent.srcElement.value;
              courseTable.refresh();
            }
          }
        }

        function setupFilterByBranch() {
          const { courseFilterByBranch } = alchemyCourses;
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
              courseTable.refresh();
            }
          });
        }

        function setupFilterByLevel() {
          const { courseFilterByLevel } = alchemyCourses;
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
            courseTable.refresh();
          }
        }

        function setupCourseTable() {
          alchemy.course.search({}, (data) => {
            const headers = ['Code', 'Alias', 'Name', 'L', 'P', 'T', 'Credit', 'Elective?', 'No. of persons'];
            const dataTypes = ['Code', 'Alias', 'Name', 1, 1, 1, 1, 1, 1];
            const transformedData = Course.transform(data, 'table');
            courseTable.mdcDataTableHelper =
              MDCDataTableHelper
                .handle(courseTable.element)
                .setIdKey('id')
                .setHeaders(headers, dataTypes)
                .setData(transformedData);
          });
        }

        function setupEvents() {
          const { courseEditButton, courseDeleteButton } = alchemyCourses;
          courseTable.element.addEventListener('click', (mouseEvent) => {
            mouseEvent.stopPropagation();
            courseTable.deselectCourses();
            const { target } = mouseEvent;
            if (target.tagName !== 'TD') { return; }
            const selectedCourse = target.parentNode;
            selectedCourse.classList.add('selected');
            courseEditButton.element.removeAttribute('disabled');
            courseDeleteButton.element.removeAttribute('disabled');
            window.addEventListener(
              'click',
              blurSelection(
                [selectedCourse, courseEditButton.element, courseDeleteButton.element],
                courseTable.deselectCourses
              )
            );
          });

          courseTable.deselectCourses = () => {
            const selectedCourses = courseTable.element.querySelectorAll('tr.selected');
            courseEditButton.element.setAttribute('disabled', '');
            courseDeleteButton.element.setAttribute('disabled', '');
            Array.prototype.forEach.call(
              selectedCourses,
              item => (item.classList.remove('selected'))
            );
          };
        }
      }
    }

    function setupTimeTableSection() {}
  },
  onFail: (error) => {
    Logger.error('Alchemy has crashed due to API communication issues.', error);
  }
});
