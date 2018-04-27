/* eslint-disable no-undef,no-underscore-dangle,no-use-before-define,no-inner-declarations,no-restricted-globals */

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
    setupCourseSection();
    setupLocationSection();
    setupTimeTableSection();

    function setupCommon() {
      window.alchemyCommon = {};
      setupTabs();

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
    }

    function setupCourseSection() {
      const alchemyCourseSection = {
        element: document.querySelector('#alchemy-courses'),
        courseView: {
          element: document.querySelector('#alchemy-course-view'),
          courseAddButton: { element: document.querySelector('#alchemy-course-view__add-button') },
          courseEditButton: { element: document.querySelector('#alchemy-course-view__edit-button') },
          courseDeleteButton: {
            element: document.querySelector('#alchemy-course-view__delete-button')
          },
          courseFilterByText: {
            element: document.querySelector('#alchemy-course-view__filter-by-text')
          },
          courseFilterByBranch: {
            element: document.querySelector('#alchemy-course-view__filter-by-branch')
          },
          courseFilterByLevel: {
            element: document.querySelector('#alchemy-course-view__filter-by-level')
          },
          courseTable: {
            element: document.querySelector('#alchemy-course-view__table'),
            table: document.querySelector('#alchemy-course-view__table table'),
            headers: ['Code', 'Alias', 'Name', 'L', 'P', 'T', 'Credit', 'Type', 'Persons'],
            headersDataTypes: ['Code', 'Alias', 'Name', 1, 1, 1, 1, 1, 1],
            headersWidth: [9.5, 9.5, 40.5],
            selectedCourseId: null
          }
        },
        courseAdd: {
          element: document.querySelector('#alchemy-course-add'),
          courseAddForm: { element: document.querySelector('#alchemy-course-add__form') },
          courseCode: { element: document.querySelector('#alchemy-course-add__course-code') },
          courseName: { element: document.querySelector('#alchemy-course-add__course-name') },
          courseDepartment: {
            element: document.querySelector('#alchemy-course-add__course-department')
          },
          courseType: { element: document.querySelector('#alchemy-course-add__course-type') },
          coursePerson: { element: document.querySelector('#alchemy-course-add__course-person') },
          courseAlias: { element: document.querySelector('#alchemy-course-add__course-alias') },
          courseLecture: { element: document.querySelector('#alchemy-course-add__course-lecture') },
          coursePractical: {
            element: document.querySelector('#alchemy-course-add__course-practical')
          },
          courseTutorial: { element: document.querySelector('#alchemy-course-add__course-tutorial') },
          courseCredit: { element: document.querySelector('#alchemy-course-add__course-credit') },
          courseAddButton: { element: document.querySelector('#alchemy-course-add__add-button') },
          courseResetButton: { element: document.querySelector('#alchemy-course-add__reset-button') },
          courseViewButton: { element: document.querySelector('#alchemy-course-add__view-button') }
        }
      };

      setupCourseView();
      setupCourseAdd();

      function setupCourseView() {
        const { courseTable } = alchemyCourseSection.courseView;

        const courseFilter = {
          departmentId: null,
          text: null,
          level: null,
          limit: null
        };

        setupCourseTable();
        setupFilterByText();
        setupFilterByBranch();
        setupFilterByLevel();
        setupEvents();

        function setupCourseTable() {
          const { courseEditButton, courseDeleteButton } = alchemyCourseSection.courseView;

          courseTable.deselectCourses = () => {
            const selectedCourses = courseTable.element.querySelectorAll('tr.selected');
            courseEditButton.element.setAttribute('disabled', '');
            courseDeleteButton.element.setAttribute('disabled', '');
            Array.prototype.forEach.call(
              selectedCourses,
              item => (item.classList.remove('selected'))
            );
            courseTable.selectedCourseId = null;
          };

          courseTable.refresh = () => {
            courseTable.deselectCourses();
            alchemy.course.search(filterObject(courseFilter), (data) => {
              const transformedData = Course.transform(data, 'table');
              courseTable.mdcDataTableHelper
                .setData(transformedData);
              if (!courseTable.element.querySelector('td')) {
                courseTable.element.classList.add('alchemy-course-table--empty');
              } else {
                courseTable.element.classList.remove('alchemy-course-table--empty');
              }
            });
          };

          const { headers, headersDataTypes, headersWidth } = courseTable;
          courseTable.mdcDataTableHelper =
            MDCDataTableHelper
              .handle(courseTable.element)
              .setIdKey('id')
              .setHeaders(headers, headersDataTypes, headersWidth);
          courseTable.refresh();
        }

        function setupFilterByText() {
          const { courseFilterByText } = alchemyCourseSection.courseView;
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
          const { courseFilterByBranch } = alchemyCourseSection.courseView;
          courseFilterByBranch.mdcSelectHandler =
            MDCSelectHandler
              .handle(courseFilterByBranch.element)
              .clearItems()
              .init('Select branch', { storeData: true })
              .disable();

          const allBranchesItem = { id: null, name: 'All', programme_id: alchemy.keys.programme };
          const { departments } = alchemy.current;

          courseFilterByBranch.mdcSelectHandler
            .addItems(
              departments.concat([allBranchesItem]),
              { assignments: { valueKey: 'name', idKey: 'alias' } }
            )
            .setOnChangeListener(onBranchChange)
            .enable();

          function onBranchChange() {
            const selectedItem = courseFilterByBranch.mdcSelectHandler.getSelected();
            courseFilter.departmentId = selectedItem.data.id;
            courseTable.refresh();
          }
        }

        function setupFilterByLevel() {
          const { courseFilterByLevel } = alchemyCourseSection.courseView;
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

        function setupEvents() {
          const {
            courseAddButton,
            courseEditButton,
            courseDeleteButton
          } = alchemyCourseSection.courseView;

          courseTable.element.addEventListener('click', (mouseEvent) => {
            mouseEvent.stopPropagation();
            courseTable.deselectCourses();
            const { target } = mouseEvent;
            if (target.tagName !== 'TD') { return; }
            const selectedCourse = target.parentNode;
            courseTable.selectedCourseId = selectedCourse.getAttribute('data-id');
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

          courseAddButton.element.addEventListener('click', () => {
            scrollTo(alchemyCourseSection.courseAdd.element);
          });
        }
      }

      function setupCourseAdd() {
        const {
          courseAddForm,
          courseCode,
          courseAlias,
          courseName,
          courseLecture,
          coursePractical,
          courseTutorial,
          courseCredit,
          courseAddButton,
          courseResetButton,
          courseViewButton,
          courseDepartment
        } = alchemyCourseSection.courseAdd;

        mdc.textField.MDCTextField.attachTo(courseCode.element);
        mdc.textField.MDCTextField.attachTo(courseAlias.element);
        mdc.textField.MDCTextField.attachTo(courseName.element);
        mdc.textField.MDCTextField.attachTo(courseLecture.element);
        mdc.textField.MDCTextField.attachTo(coursePractical.element);
        mdc.textField.MDCTextField.attachTo(courseTutorial.element);
        mdc.textField.MDCTextField.attachTo(courseCredit.element);
        setupCourseDepartment();

        courseAddButton.element.addEventListener('click', () => {
          const selectedDepartment = getSelectedDepartment();
          const isFormValid = courseAddForm.element.checkValidity() && selectedDepartment !== false;
          if (!isFormValid) { return false; }

          return true;
        });

        courseResetButton.element.addEventListener('click', () => {

        });

        courseViewButton.element.addEventListener('click', () => {
          scrollTo(alchemyCourseSection.courseView.element);
        });

        function setupCourseDepartment() {
          courseDepartment.mdcSelectHandler =
            MDCSelectHandler
              .handle(courseDepartment.element)
              .clearItems()
              .init('Select Department', { storeData: true })
              .disable();

          const { departments } = alchemy.current;

          courseDepartment.mdcSelectHandler
            .addItems(departments, { assignments: { valueKey: 'name', idKey: 'alias' } })
            .enable();
        }
        function getSelectedDepartment() {
          const selectedDepartment = courseDepartment.mdcSelectHandler.getSelected();
          if (selectedDepartment && selectedDepartment.data) {
            return selectedDepartment.data;
          }
          return false;
        }
      }
    }

    function setupLocationSection() {
      const alchemyLocationSection = {
        element: document.querySelector('#alchemy-locations'),
        locationView: {
          element: document.querySelector('#alchemy-location-view'),
          locationAddButton: { element: document.querySelector('#alchemy-location-view__add-button') },
          locationEditButton: { element: document.querySelector('#alchemy-location-view__edit-button') },
          locationDeleteButton: {
            element: document.querySelector('#alchemy-location-view__delete-button')
          },
          locationFilterByText: {
            element: document.querySelector('#alchemy-location-view__filter-by-text')
          },
          locationFilterByBranch: {
            element: document.querySelector('#alchemy-location-view__filter-by-branch')
          },
          locationTable: {
            element: document.querySelector('#alchemy-location-view__table'),
            table: document.querySelector('#alchemy-location-view__table table'),
            headers: ['Alias', 'Name', 'Capacity', 'Department', 'Type'],
            headersDataTypes: ['Alias', 'Name', 1, 'Department', 1],
            headersWidth: [9.5, 40.5],
            selectedLocationId: null
          }
        },
        locationAdd: {
          element: document.querySelector('#alchemy-location-add'),
          locationAddForm: { element: document.querySelector('#alchemy-location-add__form') },
          locationName: { element: document.querySelector('#alchemy-location-add__location-name') },
          locationAlias: { element: document.querySelector('#alchemy-location-add__location-alias') },
          locationCapacity: { element: document.querySelector('#alchemy-location-add__location-capacity') },
          locationDepartment: { element: document.querySelector('#alchemy-location-add__location-department') },
          locationType: { element: document.querySelector('#alchemy-location-add__location-type') },
          locationAddButton: { element: document.querySelector('#alchemy-location-add__add-button') },
          locationResetButton: { element: document.querySelector('#alchemy-location-add__reset-button') },
          locationViewButton: { element: document.querySelector('#alchemy-location-add__view-button') }
        }
      };

      setupLocationView();
      setupLocationAdd();

      function setupLocationView() {
        const { locationTable } = alchemyLocationSection.locationView;

        const locationFilter = {
          departmentId: null,
          text: null,
          limit: null
        };

        setupLocationTable();
        setupFilterByText();
        setupFilterByBranch();
        setupEvents();

        function setupLocationTable() {
          const { locationEditButton, locationDeleteButton } = alchemyLocationSection.locationView;

          locationTable.deselectLocations = () => {
            const selectedLocations = locationTable.element.querySelectorAll('tr.selected');
            locationEditButton.element.setAttribute('disabled', '');
            locationDeleteButton.element.setAttribute('disabled', '');
            Array.prototype.forEach.call(
              selectedLocations,
              item => (item.classList.remove('selected'))
            );
            locationTable.selectedLocationId = null;
          };

          locationTable.refresh = () => {
            locationTable.deselectLocations();
            alchemy.location.search(filterObject(locationFilter), (data) => {
              const transformedData = Location.transform(data, 'table');
              locationTable.mdcDataTableHelper
                .setData(transformedData);
              if (!locationTable.element.querySelector('td')) {
                locationTable.element.classList.add('alchemy-location-table--empty');
              } else {
                locationTable.element.classList.remove('alchemy-location-table--empty');
              }
            });
          };

          const { headers, headersDataTypes, headersWidth } = locationTable;
          locationTable.mdcDataTableHelper =
            MDCDataTableHelper
              .handle(locationTable.element)
              .setIdKey('id')
              .setHeaders(headers, headersDataTypes, headersWidth);
          locationTable.refresh();
        }

        function setupFilterByText() {
          const { locationFilterByText } = alchemyLocationSection.locationView;
          if (locationFilterByText.element) {
            const searchTextField = mdc.textField.MDCTextField.attachTo(locationFilterByText.element);
            const searchInput = searchTextField.input_;
            searchInput.addEventListener('input', onSearchInputChange);

            function onSearchInputChange(inputEvent) {
              locationFilter.text = inputEvent.srcElement.value;
              locationTable.refresh();
            }
          }
        }

        function setupFilterByBranch() {
          const { locationFilterByBranch } = alchemyLocationSection.locationView;
          locationFilterByBranch.mdcSelectHandler =
            MDCSelectHandler
              .handle(locationFilterByBranch.element)
              .clearItems()
              .init('Select branch', { storeData: true })
              .disable();

          const allBranchesItem = { id: null, name: 'All', programme_id: alchemy.keys.programme };
          const { departments } = alchemy.current;

          locationFilterByBranch.mdcSelectHandler
            .addItems(
              departments.concat([allBranchesItem]),
              { assignments: { valueKey: 'name', idKey: 'alias' } }
            )
            .setOnChangeListener(onBranchChange)
            .enable();

          function onBranchChange() {
            const selectedItem = locationFilterByBranch.mdcSelectHandler.getSelected();
            locationFilter.departmentId = selectedItem.data.id;
            locationTable.refresh();
          }
        }

        function setupEvents() {
          const {
            locationAddButton,
            locationEditButton,
            locationDeleteButton
          } = alchemyLocationSection.locationView;

          locationTable.element.addEventListener('click', (mouseEvent) => {
            mouseEvent.stopPropagation();
            locationTable.deselectLocations();
            const { target } = mouseEvent;
            if (target.tagName !== 'TD') { return; }
            const selectedLocation = target.parentNode;
            locationTable.selectedLocationId = selectedLocation.getAttribute('data-id');
            selectedLocation.classList.add('selected');
            locationEditButton.element.removeAttribute('disabled');
            locationDeleteButton.element.removeAttribute('disabled');
            window.addEventListener(
              'click',
              blurSelection(
                [selectedLocation, locationEditButton.element, locationDeleteButton.element],
                locationTable.deselectLocations
              )
            );
          });

          locationAddButton.element.addEventListener('click', () => {
            scrollTo(alchemyLocationSection.locationAdd.element);
          });
        }
      }

      function setupLocationAdd() {
        const {
          locationAddForm,
          locationCode,
          locationAlias,
          locationName,
          locationLecture,
          locationPractical,
          locationTutorial,
          locationCredit,
          locationAddButton,
          locationResetButton,
          locationViewButton,
          locationDepartment
        } = alchemyLocationSection.locationAdd;

        mdc.textField.MDCTextField.attachTo(locationCode.element);
        mdc.textField.MDCTextField.attachTo(locationAlias.element);
        mdc.textField.MDCTextField.attachTo(locationName.element);
        mdc.textField.MDCTextField.attachTo(locationLecture.element);
        mdc.textField.MDCTextField.attachTo(locationPractical.element);
        mdc.textField.MDCTextField.attachTo(locationTutorial.element);
        mdc.textField.MDCTextField.attachTo(locationCredit.element);
        setupLocationDepartment();

        locationAddButton.element.addEventListener('click', () => {
          const selectedDepartment = getSelectedDepartment();
          const isFormValid = locationAddForm.element.checkValidity() && selectedDepartment !== false;
          if (!isFormValid) { return false; }

          return true;
        });

        locationResetButton.element.addEventListener('click', () => {

        });

        locationViewButton.element.addEventListener('click', () => {
          scrollTo(alchemyLocationSection.locationView.element);
        });

        function setupLocationDepartment() {
          locationDepartment.mdcSelectHandler =
            MDCSelectHandler
              .handle(locationDepartment.element)
              .clearItems()
              .init('Select Department', { storeData: true })
              .disable();

          const { departments } = alchemy.current;

          locationDepartment.mdcSelectHandler
            .addItems(departments, { assignments: { valueKey: 'name', idKey: 'alias' } })
            .enable();
        }
        function getSelectedDepartment() {
          const selectedDepartment = locationDepartment.mdcSelectHandler.getSelected();
          if (selectedDepartment && selectedDepartment.data) {
            return selectedDepartment.data;
          }
          return false;
        }
      }
    }

    function setupTimeTableSection() {}
  },
  onFail: (error) => {
    Logger.error('Alchemy has crashed due to API communication issues.', error);
  }
});

window.addEventListener('load', removeLoadingOverlay);
