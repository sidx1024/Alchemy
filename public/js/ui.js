/* eslint-disable no-undef,no-underscore-dangle,no-use-before-define,no-inner-declarations,no-restricted-globals,no-trailing-spaces */

/*
|--------------------------------------------------------------------------
| User Interface
|--------------------------------------------------------------------------
|
| DOM initialization & manipulation.
|
*/
function setupLoginSection() {
  const alchemyLoginSection = {
    usernameInput: {
      element: document.querySelector('#alchemy-login__username'),
      input: document.querySelector('#alchemy-login__username input')
    },
    passwordInput: {
      element: document.querySelector('#alchemy-login__password'),
      input: document.querySelector('#alchemy-login__password input')
    },
    loginButton: {
      element: document.querySelector('#alchemy-login__login-button')
    },
    errorText: {
      element: document.querySelector('#alchemy-login__error h2')
    }
  };

  setupLoginEvents();

  function setupLoginEvents() {
    const {
      usernameInput, passwordInput, loginButton, errorText
    } = alchemyLoginSection;
    usernameInput.mdc = mdc.textField.MDCTextField.attachTo(usernameInput.element);
    passwordInput.mdc = mdc.textField.MDCTextField.attachTo(passwordInput.element);
    loginButton.element.addEventListener('click', onLoginPress);
    onEnterKey(loginButton.element, onLoginPress);

    function onLoginPress() {
      errorText.element.innerHTML = '';
      const username = usernameInput.input.value;
      const password = passwordInput.input.value;
      // TODO: Validate fields
      accessControl.login(username, password, onLogin, (error) => {
        errorText.element.innerHTML = error.message;
      });
    }

    function onLogin() {
      bootAlchemy();
      alchemyCommon.loginState();
    }

    function onLogout() {
      alchemyCommon.logoutState();
    }

    if (accessControl.browserHasSession()) {
      onLogin();
    } else {
      onLogout();
    }
  }
}

function setupCommon() {
  window.alchemyCommon = {
    header: document.querySelector('#alchemy-header'),
    body: document.querySelector('#alchemy-body'),
    login: document.querySelector('#alchemy-login')
  };

  setupAccessEvents();
  setupToast();
  setupDialog();

  function setupAccessEvents() {
    const { header, body, login } = alchemyCommon;
    alchemyCommon.logoutState = () => {
      header.style.display = 'none'; body.style.display = 'none';
      login.style.display = 'flex';
    };
    alchemyCommon.loginState = () => {
      header.style.display = 'block'; body.style.display = 'block';
      login.style.display = 'none';
    };
  }

  function setupToast() {
    const toast = {
      element: document.querySelector('#alchemy-toast'),
      extra: document.querySelector('#alchemy-toast .alchemy-toast__extra')
    };
    toast.mdc = mdc.snackbar.MDCSnackbar.attachTo(toast.element);
    toast.mdc.getDefaultFoundation().cleanup_();
    alchemyCommon.toast = (data, extra) => {
      if (!data.timeout) {
        data.timeout = 2750;
      }
      toast.mdc.show(data);
      if (extra) {
        toast.extra.innerHTML = extra;
        toast.extra.style.display = 'block';
      } else {
        toast.extra.innerHTML = '';
        toast.extra.style.display = 'none';
      }
      return toast.mdc;
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

    dialog.mdc.listen('MDCDialog:accept', (arg) => {
      if (typeof dialog.onAccept === 'function') {
        dialog.onAccept(arg);
      }
    });

    dialog.mdc.listen('MDCDialog:cancel', (arg) => {
      if (typeof dialog.onCancel === 'function') {
        dialog.onCancel(arg);
      }
    });

    const defaultOptions = {
      header: 'What is your decision?',
      body: '',
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
      dialog.onAccept = options.onAccept;
      dialog.onCancel = options.onCancel;
      return dialog.mdc;
    };
    dialog.info = (options_) => {
      const options = Object.assign({}, defaultOptions, options_);
      options.onCancel = options.onAccept;
      dialog.ask(options);
      dialog.cancel.style.display = 'none';
      return dialog.mdc;
    };
    alchemyCommon.dialog = dialog;
  }
}

function bootAlchemy() {
  window.alchemy = new Alchemy({
    onReady: () => {
      console.clear();
      setupTabs();
      setupCourseSection();
      // setupLocationSection();
      setupTimeTableSection();
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
              headersDataTypes: ['Code', 'Alias', 'Name', 1, 1, 1, 1, 'Type', 1],
              headersWidth: [9.5, 9.5, 40.5],
              selectedId: null
            }
          },
          courseAdd: {
            element: document.querySelector('#alchemy-course-add'),
            mode: 'add',
            heading: document.querySelector('#alchemy-course-add h1'),
            courseAddForm: { element: document.querySelector('#alchemy-course-add__form') },
            courseCode: {
              element: document.querySelector('#alchemy-course-add__course-code'),
              input: document.querySelector('#alchemy-course-add__course-code input')
            },
            courseName: {
              element: document.querySelector('#alchemy-course-add__course-name'),
              input: document.querySelector('#alchemy-course-add__course-name input')
            },
            courseDepartment: {
              element: document.querySelector('#alchemy-course-add__course-department')
            },
            courseType: { element: document.querySelector('#alchemy-course-add__course-type') },
            coursePerson: { element: document.querySelector('#alchemy-course-add__course-person') },
            courseAlias: {
              element: document.querySelector('#alchemy-course-add__course-alias'),
              input: document.querySelector('#alchemy-course-add__course-alias input')
            },
            courseLecture: {
              element: document.querySelector('#alchemy-course-add__course-lecture'),
              input: document.querySelector('#alchemy-course-add__course-lecture input')
            },
            coursePractical: {
              element: document.querySelector('#alchemy-course-add__course-practical'),
              input: document.querySelector('#alchemy-course-add__course-practical input')
            },
            courseTutorial: {
              element: document.querySelector('#alchemy-course-add__course-tutorial'),
              input: document.querySelector('#alchemy-course-add__course-tutorial input')
            },
            courseCredit: {
              element: document.querySelector('#alchemy-course-add__course-credit'),
              input: document.querySelector('#alchemy-course-add__course-credit input')
            },
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
              courseTable.selectedId = null;
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

            courseDeleteButton.element.addEventListener('click', () => {
              if (!courseDeleteButton.element.hasAttribute('disabled')) {
                alchemy.course.delete(
                  courseTable.selectedId,
                  onCourseDeleteSuccess,
                  onCourseDeleteFail
                );
              }
            });
          }

          function onCourseDeleteSuccess(deletedCourse) {
            const message = 'Course deleted successfully.';
            const extra = Course.transform(deletedCourse, 'short-info');
            courseTable.refresh();
            alchemyCommon.toast({ message }, extra);
          }

          function onCourseDeleteFail(error) {
            if (typeof error.json !== 'function') {
              console.error(error);
            } else {
              error.json().then((body) => {
                const message = `Error ${error.status}: ${error.statusText}`;
                const extra = arrayToHtml(Object.values(body));
                alchemyCommon.toast({
                  message,
                  multiline: true,
                  timeout: PERSISTENT_TOAST_TIME,
                  actionText: 'OK',
                  actionOnBottom: true,
                  actionHandler() {}
                }, extra);
              });
            }
          }

          function setupFilterByText() {
            const { courseFilterByText } = alchemyCourseSection.courseView;
            if (courseFilterByText.element) {
              const searchTextField = mdc.textField.MDCTextField.attachTo(
                courseFilterByText.element);
              const searchInput = searchTextField.input_;
              searchInput.addEventListener('input', onSearchInputChange);

              function onSearchInputChange(inputEvent) {
                courseFilter.text = inputEvent.target.value;
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
                { assignments: { valueKey: 'name', idKey: 'id' } }
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
              courseTable.selectedId = selectedCourse.getAttribute('data-id');
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

            const { courseAdd } = alchemyCourseSection;

            courseAddButton.element.addEventListener('click', () => {
              scrollTo(courseAdd.element);
              courseAdd.switchMode.add();
            });

            courseEditButton.element.addEventListener('click', () => {
              scrollTo(courseAdd.element);
              courseAdd.switchMode.edit(courseTable.selectedId);
            });
          }
        }

        function setupCourseAdd() {
          const { courseAdd } = alchemyCourseSection;
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
          } = courseAdd;

          courseCode.mdc = mdc.textField.MDCTextField.attachTo(courseCode.element);
          courseAlias.mdc = mdc.textField.MDCTextField.attachTo(courseAlias.element);
          courseName.mdc = mdc.textField.MDCTextField.attachTo(courseName.element);
          courseLecture.mdc = mdc.textField.MDCTextField.attachTo(courseLecture.element);
          coursePractical.mdc = mdc.textField.MDCTextField.attachTo(coursePractical.element);
          courseTutorial.mdc = mdc.textField.MDCTextField.attachTo(courseTutorial.element);
          courseCredit.mdc = mdc.textField.MDCTextField.attachTo(courseCredit.element);

          courseAdd.switchMode = {
            add: () => {
              courseAdd.editMode = false;
              courseAdd.heading.innerText = 'Add Course';
              courseAddButton.element.innerText = 'ADD COURSE';
              delete courseAdd.editItemId;
            },
            edit: (id) => {
              courseAdd.editMode = true;
              courseAdd.heading.innerText = 'Edit Course';
              courseAddButton.element.innerText = 'UPDATE COURSE';

              alchemy.course.get(id, onCourseGetSuccess, onCourseGetFail);

              function onCourseGetSuccess(course) {
                courseAdd.heading.innerText += ` (ID: ${course.id})`;
                courseAdd.editItemId = course.id;
                setTextFieldInput(courseCode, course.code);
                setTextFieldInput(courseAlias, course.alias);
                setTextFieldInput(courseName, course.name);
                setTextFieldInput(courseLecture, course.lecture);
                setTextFieldInput(coursePractical, course.practical);
                setTextFieldInput(courseTutorial, course.tutorial);
                setTextFieldInput(courseCredit, course.credit);
                setRadioInput(courseType.element, course.is_elective);
                setRadioInput(coursePerson.element, course.persons);
                courseDepartment.mdcSelectHandler.setSelected(course.department_id);
              }

              function onCourseGetFail(error) {
                if (typeof error.json !== 'function') {
                  console.error(error);
                } else {
                  error.json().then((body) => {
                    const message = `Error ${error.status}: ${error.statusText}`;
                    const extra = arrayToHtml(Object.values(body));
                    alchemyCommon.toast({ message }, extra);
                  });
                }
              }
            }
          };

          setupCourseDepartment();
          setupCourseAutoFill();

          courseViewButton.element.addEventListener('click', () => {
            scrollTo(alchemyCourseSection.courseView.element);
          });

          courseAddButton.element.addEventListener('click', () => {
            const type = courseType.element.querySelector(':checked').getAttribute('value');
            const department = getSelectedDepartment();
            const person = coursePerson.element.querySelector(':checked').getAttribute('value');

            const isFormValid = courseAddForm.element.checkValidity() && department !== false;
            if (!isFormValid) {
              const message = 'Please fill out the form properly.';
              alchemyCommon.toast({ message });
              return false;
            }

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

            const { editMode } = courseAdd;
            if (editMode) {
              course.id = courseAdd.editItemId;
              alchemy.course.update(
                course.id,
                JSON.stringify(course),
                onCourseUpdateSuccess,
                onCourseAddFail
              );
            } else {
              alchemy.course.add(JSON.stringify(course), onCourseAddSuccess, onCourseAddFail);
            }
            return true;
          });

          courseResetButton.element.addEventListener('click', () => {
            courseDepartment.mdcSelectHandler.clearSelection();
          });

          function onCourseUpdateSuccess(updatedCourse) {
            const { courseView } = alchemyCourseSection;
            const { courseTable } = courseView;
            courseTable.refresh();
            courseAddForm.element.reset();
            courseDepartment.mdcSelectHandler.clearSelection();
            courseAdd.switchMode.add();
            scrollTo(courseView.element);
            const extra = Course.transform(updatedCourse, 'short-info');
            const message = 'Course updated successfully.';
            alchemyCommon.toast({ message }, extra);
          }

          function onCourseAddSuccess(addedCourse) {
            const { courseTable } = alchemyCourseSection.courseView;
            courseTable.refresh();
            courseAddForm.element.reset();
            courseDepartment.mdcSelectHandler.clearSelection();
            const extra = Course.transform(addedCourse, 'short-info');
            const message = 'Course added successfully.';
            alchemyCommon.toast({ message }, extra);
          }

          function onCourseAddFail(error) {
            if (typeof error.json !== 'function') {
              console.error(error);
            } else {
              error.json().then((body) => {
                const message = `Error ${error.status}: ${error.statusText}`;
                const extra = arrayToHtml(Object.values(body));
                alchemyCommon.toast({
                  message,
                  multiline: true,
                  timeout: PERSISTENT_TOAST_TIME,
                  actionText: 'OK',
                  actionOnBottom: true,
                  actionHandler() {}
                }, extra);
              });
            }
          }

          function setupCourseDepartment() {
            courseDepartment.mdcSelectHandler =
              MDCSelectHandler
                .handle(courseDepartment.element)
                .clearItems()
                .init('Select Department', { storeData: true })
                .disable();

            const { departments } = alchemy.current;

            courseDepartment.mdcSelectHandler
              .addItems(departments, { assignments: { valueKey: 'name', idKey: 'id' } })
              .enable();
          }

          function setupCourseAutoFill() {
            // auto-fill department on blur event of course code
            courseCode.input.addEventListener('blur', onCourseCodeBlur);
            courseCredit.input.addEventListener('focus', onCourseCreditFocus);
            courseAlias.input.addEventListener('focus', onCourseAliasFocus);

            function onCourseCodeBlur() {
              const inputValue = courseCode.input.value;
              if (inputValue.length >= 2) {
                const firstTwoLetters = inputValue.slice(0, 2);
                const department =
                  alchemy.current.departments.find(d => (d.alias === firstTwoLetters));
                courseDepartment.mdcSelectHandler.setSelected(department.id);
              }
            }

            function onCourseCreditFocus() {
              const credit = Number(courseCredit.input.value);
              if (Number.isNaN(credit) || credit !== 0) {
                return;
              }
              const lecture = Number(courseLecture.input.value);
              const practical = Number(coursePractical.input.value);
              const tutorial = Number(courseTutorial.input.value);

              if (!Number.isNaN(lecture) && !Number.isNaN(practical) && !Number.isNaN(tutorial)) {
                const { ONE_PRACTICAL_CREDIT } = alchemy.current;
                const totalCredits = lecture + (practical * ONE_PRACTICAL_CREDIT) + tutorial;
                courseCredit.input.value = Number(totalCredits);
              }
            }

            function onCourseAliasFocus() {
              const courseAliasIsEmpty = courseAlias.input.value.length === 0;
              const name = courseName.input.value;
              const courseNameIsFilled = name.length > 0;
              if (courseAliasIsEmpty && courseNameIsFilled) {
                courseAlias.input.value = getAliasFromName(name);
              }
            }
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
            locationAddButton: {
              element: document.querySelector('#alchemy-location-view__add-button')
            },
            locationEditButton: {
              element: document.querySelector('#alchemy-location-view__edit-button')
            },
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
            locationCapacity: {
              element: document.querySelector('#alchemy-location-add__location-capacity')
            },
            locationDepartment: {
              element: document.querySelector('#alchemy-location-add__location-department')
            },
            locationType: { element: document.querySelector('#alchemy-location-add__location-type') },
            locationAddButton: { element: document.querySelector('#alchemy-location-add__add-button') },
            locationResetButton: {
              element: document.querySelector('#alchemy-location-add__reset-button')
            },
            locationViewButton: {
              element: document.querySelector('#alchemy-location-add__view-button')
            }
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
            const isFormValid = locationAddForm.element.checkValidity() && selectedDepartment !==
              false;
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
              .addItems(
                departments,
                { assignments: { valueKey: 'name', idKey: 'alias' } }
              )
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
}


window.addEventListener('load', removeLoadingOverlay);
setupCommon();
setupLoginSection();
