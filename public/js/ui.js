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
    setupTimeTableSection();

    function setupCommon() {
      window.alchemyCommon = {};
      setupTabs();
      setupToast();
      setupDialog();

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
      function setupToast() {
        const toast = { element: document.querySelector('#alchemy-toast') };
        toast.mdc = mdc.snackbar.MDCSnackbar.attachTo(toast.element);
        alchemyCommon.toast = (data) => {
          toast.mdc.show(data);
        };
      }
      function setupDialog() {
        const dialog = {
          element: document.querySelector('#alchemy-dialog'),
          header: document.querySelector('#alchemy-dialog .mdc-dialog__header__title'),
          body: document.querySelector('#alchemy-dialog .mdc-dialog__body'),
          accept: document.querySelector('#alchemy-dialog .mdc-dialog__footer__button--accept'),
          cancel: document.querySelector('#alchemy-dialog .mdc-dialog__footer__button--cancel')
        };
        dialog.mdc = mdc.dialog.MDCDialog.attachTo(dialog.element);
        const defaultOptions = {
          header: 'What is your decision?',
          body: 'You can either accept or cancel.',
          accept: 'Accept',
          cancel: 'Cancel',
          onAccept: () => { console.log('You accepted.'); },
          onCancel: () => { console.log('You cancelled.'); }
        };
        dialog.ask = (options_) => {
          const options = Object.assign({}, defaultOptions, options_);
          dialog.header.innerHTML = options.header;
          dialog.body.innerHTML = options.body;
          dialog.accept.innerText = options.accept;
          dialog.cancel.innerText = options.cancel;
          dialog.cancel.style.display = 'block';
          dialog.mdc.listen('MDCDialog:accept', options.onAccept);
          dialog.mdc.listen('MDCDialog:cancel', options.onCancel);
          return dialog.mdc;
        };
        dialog.info = (options_) => {
          const options = Object.assign({}, defaultOptions, options_);
          options.onCancel = options.onAccept;
          options.accept = 'OK';
          dialog.ask(options);
          dialog.cancel.style.display = 'none';
          return dialog.mdc;
        };
        alchemyCommon.dialog = dialog;
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
          courseDepartment,
          courseType,
          coursePerson
        } = alchemyCourseSection.courseAdd;

        courseCode.mdc = mdc.textField.MDCTextField.attachTo(courseCode.element);
        courseAlias.mdc = mdc.textField.MDCTextField.attachTo(courseAlias.element);
        courseName.mdc = mdc.textField.MDCTextField.attachTo(courseName.element);
        courseLecture.mdc = mdc.textField.MDCTextField.attachTo(courseLecture.element);
        coursePractical.mdc = mdc.textField.MDCTextField.attachTo(coursePractical.element);
        courseTutorial.mdc = mdc.textField.MDCTextField.attachTo(courseTutorial.element);
        courseCredit.mdc = mdc.textField.MDCTextField.attachTo(courseCredit.element);
        setupCourseDepartment();

        courseAddButton.element.addEventListener('click', () => {
          const department = getSelectedDepartment();
          const type = courseType.element.querySelector(':checked').getAttribute('value');
          const person = coursePerson.element.querySelector(':checked').getAttribute('value');
          const isFormValid = courseAddForm.element.checkValidity() && department !== false;
          if (!isFormValid) { return false; }
          const course = {
            alias: courseAlias.mdc.input_.value,
            name: courseName.mdc.input_.value,
            code: courseCode.mdc.input_.value,
            lecture: Number(courseLecture.mdc.input_.value),
            practical: Number(coursePractical.mdc.input_.value),
            tutorial: Number(courseTutorial.mdc.input_.value),
            credit: Number(courseCredit.mdc.input_.value),
            department_id: Number(department.id),
            is_elective: Number(type),
            persons: Number(person)
          };
          console.log('course', course);
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

    function setupTimeTableSection() {}
  },
  onFail: (error) => {
    Logger.error('Alchemy has crashed due to API communication issues.', error);
  }
});

window.addEventListener('load', removeLoadingOverlay);
