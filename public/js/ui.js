/* eslint-disable no-undef,no-underscore-dangle,no-use-before-define,no-inner-declarations,
no-restricted-globals,no-trailing-spaces */

/*
|--------------------------------------------------------------------------
| User Interface
|--------------------------------------------------------------------------
|
| DOM initialization & manipulation.
|
*/

window.addEventListener('load', removeLoadingOverlay);
setupCommon();
checkConnection(setupLoginSection);

function checkConnection(callback) {
  pingDatabase((response) => {
    if (response.status >= 200 && response.status < 300) {
      Logger.success(response);
      return callback();
    }
    return handleResponse(response, (json) => {
      alchemyCommon.dialog.info({
        header: 'Error establishing connection',
        body: `${json.message}<br/>${json.error}`,
        accept: 'Reload',
        // eslint-disable-next-line no-restricted-globals
        onAccept: () => (location.reload())
      }).show();
    });
  });
  function pingDatabase(cbk) {
    fetch('/api/ping-database')
      .then(cbk)
      .catch(cbk);
  }
}

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
    logoutButton: {
      element: document.querySelector('#alchemy-login__logout-button')
    },
    errorText: {
      element: document.querySelector('#alchemy-login__error h2')
    }
  };

  setupLoginEvents();

  function setupLoginEvents() {
    const {
      usernameInput, passwordInput, loginButton, logoutButton, errorText
    } = alchemyLoginSection;
    usernameInput.mdc = mdc.textField.MDCTextField.attachTo(usernameInput.element);
    passwordInput.mdc = mdc.textField.MDCTextField.attachTo(passwordInput.element);
    loginButton.element.addEventListener('click', onLoginPress);
    logoutButton.element.addEventListener('click', onLogoutPress);
    focusListener(passwordInput.input, 'Enter', onLoginPress);

    onEnterKey(loginButton.element, onLoginPress);

    function onLoginPress() {
      errorText.element.innerHTML = '';
      const username = usernameInput.input.value;
      const password = passwordInput.input.value;
      // TODO: Validate fields
      accessControl.login(username, password, onLogin, (error) => {
        errorText.element.innerHTML = (error && error.message) || error;
      });
    }

    function onLogoutPress() {
      alchemyCommon.dialog.ask({
        header: 'Logout',
        body: 'Are you sure you want to logout?',
        accept: 'Logout',
        cancel: 'Cancel',
        onAccept: () => {
          onLogout();
          location.reload();
        }
      }).show();
    }

    function onLogin() {
      bootAlchemy();
      alchemyCommon.loginState();
    }

    function onLogout() {
      accessControl.logout();
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
    login: document.querySelector('#alchemy-login'),
    loadingBar: { element: document.querySelector('.alchemy-loading-bar') }
  };

  setupLoadingBar();
  setupAccessEvents();
  setupToast();
  setupDialog();

  function setupLoadingBar() {
    const { loadingBar } = alchemyCommon;
    loadingBar.visible = false;
    loadingBar.show = () => {
      if (loadingBar.visible) { return; }
      loadingBar.element.classList.add('alchemy-loading-bar--visible');
      loadingBar.visible = true;
    };
    loadingBar.hide = () => {
      if (!loadingBar.visible || loadingBar.data.length > 0) { return; }
      loadingBar.element.classList.remove('alchemy-loading-bar--visible');
      loadingBar.visible = false;
    };
    loadingBar.data = [];
    loadingBar.queue = () => {
      loadingBar.data.unshift(1);
      loadingBar.show();
    };
    loadingBar.dequeue = () => {
      loadingBar.data.shift();
      loadingBar.hide();
    };
  }

  function setupAccessEvents() {
    const { header, body, login } = alchemyCommon;
    alchemyCommon.logoutState = () => {
      header.style.display = 'none';
      body.style.display = 'none';
      login.style.display = 'flex';
    };
    alchemyCommon.loginState = () => {
      header.style.display = 'block';
      body.style.display = 'block';
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
      setupLocationSection();
      setupFacultySection();
      setupCourseOfferedSection();
      setupTimeTableSection();
      // setupProfileSection();
      setupClassSection();
      setupDesignationSection();
      setupDepartmentSection();

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
            courseEditButton: {
              element: document.querySelector('#alchemy-course-view__edit-button')
            },
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
            courseResetButton: {
              element: document.querySelector('#alchemy-course-add__reset-button')
            },
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
                alchemyCommon.dialog.info({
                  header: `Error ${error.status}: ${error.statusText}`,
                  body: arrayToHtml(Object.values(body)),
                  accept: 'Okay'
                }).show();
              });
            }
          }

          function setupFilterByText() {
            const { courseFilterByText } = alchemyCourseSection.courseView;
            if (courseFilterByText.element) {
              const searchTextField = mdc.textField.MDCTextField
                .attachTo(courseFilterByText.element);
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
              console.log(selectedItem);
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
              .addItems(
                levelsList,
                { assignments: { valueKey: 'level', idKey: 'id' } }
              )
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
                alchemyCommon.dialog.info({
                  header: `Error ${error.status}: ${error.statusText}`,
                  body: arrayToHtml(Object.values(body)),
                  accept: 'Okay'
                }).show();
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
            locationFilterByType: {
              element: document.querySelector('#alchemy-location-view__filter-by-type')
            },
            locationFilterByBranch: {
              element: document.querySelector('#alchemy-location-view__filter-by-branch')
            },
            locationTable: {
              element: document.querySelector('#alchemy-location-view__table'),
              table: document.querySelector('#alchemy-location-view__table table'),
              headers: ['Alias', 'Name', 'Capacity', 'Type', 'Department'],
              headersDataTypes: ['Alias', 'Name', 1, 'type', '1'],
              headersWidth: [12, 20, 16, 15, 25],
              selectedId: null
            }
          },
          locationAdd: {
            element: document.querySelector('#alchemy-location-add'),
            mode: 'add',
            heading: document.querySelector('#alchemy-location-add h1'),
            locationAddForm: { element: document.querySelector('#alchemy-location-add__form') },
            locationName: {
              element: document.querySelector('#alchemy-location-add__location-name'),
              input: document.querySelector('#alchemy-location-add__location-name input')
            },
            locationAlias: {
              element: document.querySelector('#alchemy-location-add__location-alias'),
              input: document.querySelector('#alchemy-location-add__location-alias input')
            },
            locationCapacity: {
              element: document.querySelector('#alchemy-location-add__location-capacity'),
              input: document.querySelector('#alchemy-location-add__location-capacity input')
            },
            locationType: { element: document.querySelector('#alchemy-location-add__location-type') },
            locationDepartment: {
              element: document.querySelector('#alchemy-location-add__location-department')
            },
            locationAddButton: {
              element: document.querySelector('#alchemy-location-add__add-button')
            },
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
            text: null
          };

          setupLocationTable();
          setupFilterByText();
          setupFilterByBranch();
          setupFilterByType();
          setupEvents();

          function setupLocationTable() {
            const { locationEditButton, locationDeleteButton } =
              alchemyLocationSection.locationView;

            locationTable.deselectLocations = () => {
              const selectedLocations = locationTable.element.querySelectorAll('tr.selected');
              locationEditButton.element.setAttribute('disabled', '');
              locationDeleteButton.element.setAttribute('disabled', '');
              Array.prototype.forEach.call(
                selectedLocations,
                item => (item.classList.remove('selected'))
              );
              locationTable.selectedId = null;
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

            locationDeleteButton.element.addEventListener('click', () => {
              if (!locationDeleteButton.element.hasAttribute('disabled')) {
                alchemy.location.delete(
                  locationTable.selectedId,
                  onLocationDeleteSuccess,
                  onLocationDeleteFail
                );
              }
            });
          }

          function onLocationDeleteSuccess(deletedLocation) {
            const message = 'Location deleted successfully.';
            const extra = Location.transform(deletedLocation, 'short-info');
            locationTable.refresh();
            alchemyCommon.toast({ message }, extra);
          }

          function onLocationDeleteFail(error) {
            if (typeof error.json !== 'function') {
              console.error(error);
            } else {
              error.json().then((body) => {
                alchemyCommon.dialog.info({
                  header: `Error ${error.status}: ${error.statusText}`,
                  body: arrayToHtml(Object.values(body)),
                  accept: 'Okay'
                }).show();
              });
            }
          }

          function setupFilterByText() {
            const { locationFilterByText } = alchemyLocationSection.locationView;
            if (locationFilterByText.element) {
              const searchTextField = mdc.textField.MDCTextField
                .attachTo(locationFilterByText.element);
              const searchInput = searchTextField.input_;
              searchInput.addEventListener('input', onSearchInputChange);

              function onSearchInputChange(inputEvent) {
                locationFilter.text = inputEvent.target.value;
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
                { assignments: { valueKey: 'name', idKey: 'id' } }
              )
              .setOnChangeListener(onBranchChange)
              .enable();

            function onBranchChange() {
              const selectedItem = locationFilterByBranch.mdcSelectHandler.getSelected();
              locationFilter.departmentId = selectedItem.data.id;
              locationTable.refresh();
            }
          }

          function setupFilterByType() {
            const { locationFilterByType } = alchemyLocationSection.locationView;
            locationFilterByType.mdcSelectHandler =
              MDCSelectHandler
                .handle(locationFilterByType.element)
                .clearItems()
                .init('Select Type', { storeData: true })
                .disable();


            const typeList = [{ id: 0, type: 'Classroom' }, { id: 1, type: 'Laboratory' }];

            locationFilterByType.mdcSelectHandler
              .addItems(
                typeList,
                { assignments: { valueKey: 'type', idKey: 'id' } }
              )
              .setOnChangeListener(onTypeChange)
              .enable();

            function onTypeChange() {
              const selectedItem = locationFilterByType.mdcSelectHandler.getSelected();
              locationFilter.type = selectedItem.data.id;
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
              locationTable.selectedId = selectedLocation.getAttribute('data-id');
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

            const { locationAdd } = alchemyLocationSection;

            locationAddButton.element.addEventListener('click', () => {
              scrollTo(locationAdd.element);
              locationAdd.switchMode.add();
            });

            locationEditButton.element.addEventListener('click', () => {
              scrollTo(locationAdd.element);
              locationAdd.switchMode.edit(locationTable.selectedId);
            });
          }
        }

        function setupLocationAdd() {
          const { locationAdd } = alchemyLocationSection;
          const {
            locationAddForm,
            locationAlias,
            locationName,
            locationDepartment,
            locationType,
            locationCapacity,
            locationAddButton,
            locationResetButton,
            locationViewButton
          } = locationAdd;

          locationAlias.mdc = mdc.textField.MDCTextField.attachTo(locationAlias.element);
          locationName.mdc = mdc.textField.MDCTextField.attachTo(locationName.element);
          locationCapacity.mdc = mdc.textField.MDCTextField.attachTo(locationCapacity.element);

          locationAdd.switchMode = {
            add: () => {
              locationAdd.editMode = false;
              locationAdd.heading.innerText = 'Add Location';
              locationAddButton.element.innerText = 'ADD LOCATION';
              delete locationAdd.editItemId;
            },
            edit: (id) => {
              locationAdd.editMode = true;
              locationAdd.heading.innerText = 'Edit Location';
              locationAddButton.element.innerText = 'UPDATE LOCATION';

              alchemy.location.get(id, onLocationGetSuccess, onLocationGetFail);

              function onLocationGetSuccess(location) {
                locationAdd.heading.innerText += ` (ID: ${location.id})`;
                locationAdd.editItemId = location.id;
                setTextFieldInput(locationName, location.name);
                setTextFieldInput(locationAlias, location.alias);
                setTextFieldInput(locationCapacity, location.capacity);
                setRadioInput(locationType.element, location.type);
                locationDepartment.mdcSelectHandler.setSelected(location.department_id);
              }

              function onLocationGetFail(error) {
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

          setupLocationDepartment();

          locationViewButton.element.addEventListener('click', () => {
            scrollTo(alchemyLocationSection.locationView.element);
          });

          locationAddButton.element.addEventListener('click', () => {
            const type = locationType.element.querySelector(':checked').getAttribute('value');
            const department = getSelectedDepartment();

            const isFormValid = locationAddForm.element.checkValidity() && department !== false;
            if (!isFormValid) {
              const message = 'Please fill out the form properly.';
              alchemyCommon.toast({ message });
              return false;
            }

            const location = {
              alias: locationAlias.mdc.input_.value,
              name: locationName.mdc.input_.value,
              capacity: Number(locationCapacity.mdc.input_.value),
              department_id: Number(department.id),
              type: Number(type)
            };

            const { editMode } = locationAdd;
            if (editMode) {
              location.id = locationAdd.editItemId;
              alchemy.location.update(
                location.id,
                JSON.stringify(location),
                onLocationUpdateSuccess,
                onLocationAddFail
              );
            } else {
              alchemy.location.add(
                JSON.stringify(location), onLocationAddSuccess,
                onLocationAddFail
              );
            }
            return true;
          });

          locationResetButton.element.addEventListener('click', () => {
            locationDepartment.mdcSelectHandler.clearSelection();
          });

          function onLocationUpdateSuccess(updatedLocation) {
            const { locationView } = alchemyLocationSection;
            const { locationTable } = locationView;
            locationTable.refresh();
            locationAddForm.element.reset();
            locationDepartment.mdcSelectHandler.clearSelection();
            locationAdd.switchMode.add();
            scrollTo(locationView.element);
            const extra = Location.transform(updatedLocation, 'short-info');
            const message = 'Location updated successfully.';

            alchemyCommon.toast({ message }, extra);
          }

          function onLocationAddSuccess(addedLocation) {
            const { locationTable } = alchemyLocationSection.locationView;
            locationTable.refresh();
            locationAddForm.element.reset();
            locationDepartment.mdcSelectHandler.clearSelection();
            const extra = Location.transform(addedLocation, 'short-info');
            const message = 'Location added successfully.';

            alchemyCommon.toast({ message }, extra);
          }

          function onLocationAddFail(error) {
            if (typeof error.json !== 'function') {
              console.error(error);
            } else {
              error.json().then((body) => {
                alchemyCommon.dialog.info({
                  header: `Error ${error.status}: ${error.statusText}`,
                  body: arrayToHtml(Object.values(body)),
                  accept: 'Okay'
                }).show();
              });
            }
          }

          function setupLocationDepartment() {
            locationDepartment.mdcSelectHandler =
              MDCSelectHandler
                .handle(locationDepartment.element)
                .clearItems()
                .init('Select Department', { storeData: true })
                .disable();

            const { departments } = alchemy.current;
            locationDepartment.mdcSelectHandler
              .addItems(departments, { assignments: { valueKey: 'name', idKey: 'id' } })
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

      function setupFacultySection() {
        const alchemyFacultySection = {
          element: document.querySelector('#alchemy-faculty'),
          facultyView: {
            element: document.querySelector('#alchemy-faculty-view'),
            facultyAddButton: {
              element: document.querySelector('#alchemy-faculty-view__add-button')
            },
            facultyEditButton: {
              element: document.querySelector('#alchemy-faculty-view__edit-button')
            },
            facultyDeleteButton: {
              element: document.querySelector('#alchemy-faculty-view__delete-button')
            },
            facultyFilterByText: {
              element: document.querySelector('#alchemy-faculty-view__filter-by-text')
            },
            facultyFilterByBranch: {
              element: document.querySelector('#alchemy-faculty-view__filter-by-branch')
            },
            facultyFilterByDesignation: {
              element: document.querySelector('#alchemy-faculty-view__filter-by-designation')
            },
            facultyTable: {
              element: document.querySelector('#alchemy-faculty-view__table'),
              table: document.querySelector('#alchemy-faculty-view__table table'),
              headers: ['code', 'Alias', 'Name', 'Designation', 'Department'],
              headersDataTypes: ['code', 'Alias', 'Name', 1, 1, 1],
              headersWidth: [12, 25, 16, 15, 20],
              selectedId: null
            }
          },
          facultyAdd: {
            element: document.querySelector('#alchemy-faculty-add'),
            mode: 'add',
            heading: document.querySelector('#alchemy-faculty-add h1'),
            facultyAddForm: { element: document.querySelector('#alchemy-faculty-add__form') },
            facultyCode: {
              element: document.querySelector('#alchemy-faculty-add__faculty-code'),
              input: document.querySelector('#alchemy-faculty-add__faculty-code input')
            },
            facultyName: {
              element: document.querySelector('#alchemy-faculty-add__faculty-name'),
              input: document.querySelector('#alchemy-faculty-add__faculty-name input')
            },
            facultyAlias: {
              element: document.querySelector('#alchemy-faculty-add__faculty-alias'),
              input: document.querySelector('#alchemy-faculty-add__faculty-alias input')
            },
            facultyDesignation: {
              element: document.querySelector('#alchemy-faculty-add__faculty-designation')
            },
            facultyDepartment: {
              element: document.querySelector('#alchemy-faculty-add__faculty-department')
            },
            facultyAddButton: { element: document.querySelector('#alchemy-faculty-add__add-button') },
            facultyResetButton: {
              element: document.querySelector('#alchemy-faculty-add__reset-button')
            },
            facultyViewButton: {
              element: document.querySelector('#alchemy-faculty-add__view-button')
            }
          }
        };

        setupFacultyView();
        setupFacultyAdd();

        function setupFacultyView() {
          const { facultyTable } = alchemyFacultySection.facultyView;

          const facultyFilter = {
            departmentId: null,
            designationId: null,
            text: null
          };

          setupFacultyTable();
          setupFilterByText();
          setupFilterByBranch();
          setupFilterByDesignation();
          setupEvents();

          function setupFacultyTable() {
            const { facultyEditButton, facultyDeleteButton } = alchemyFacultySection.facultyView;

            facultyTable.deselectFaculty = () => {
              const selectedFaculty = facultyTable.element.querySelectorAll('tr.selected');
              facultyEditButton.element.setAttribute('disabled', '');
              facultyDeleteButton.element.setAttribute('disabled', '');
              Array.prototype.forEach.call(
                selectedFaculty,
                item => (item.classList.remove('selected'))
              );
              facultyTable.selectedId = null;
            };

            facultyTable.refresh = () => {
              facultyTable.deselectFaculty();
              alchemy.faculty.search(filterObject(facultyFilter), (data) => {
                const transformedData = Faculty.transform(data, 'table');
                facultyTable.mdcDataTableHelper
                  .setData(transformedData);
                if (!facultyTable.element.querySelector('td')) {
                  facultyTable.element.classList.add('alchemy-faculty-table--empty');
                } else {
                  facultyTable.element.classList.remove('alchemy-faculty-table--empty');
                }
              });
            };

            const { headers, headersDataTypes, headersWidth } = facultyTable;
            facultyTable.mdcDataTableHelper =
              MDCDataTableHelper
                .handle(facultyTable.element)
                .setIdKey('id')
                .setHeaders(headers, headersDataTypes, headersWidth);
            facultyTable.refresh();

            facultyDeleteButton.element.addEventListener('click', () => {
              if (!facultyDeleteButton.element.hasAttribute('disabled')) {
                alchemy.faculty.delete(
                  facultyTable.selectedId,
                  onFacultyDeleteSuccess,
                  onFacultyDeleteFail
                );
              }
            });
          }

          function onFacultyDeleteSuccess(deletedFaculty) {
            const message = 'Faculty deleted successfully.';
            const extra = Faculty.transform(deletedFaculty, 'short-info');
            facultyTable.refresh();
            alchemyCommon.toast({ message }, extra);
          }

          function onFacultyDeleteFail(error) {
            if (typeof error.json !== 'function') {
              console.error(error);
            } else {
              error.json().then((body) => {
                alchemyCommon.dialog.info({
                  header: `Error ${error.status}: ${error.statusText}`,
                  body: arrayToHtml(Object.values(body)),
                  accept: 'Okay'
                }).show();
              });
            }
          }

          function setupFilterByText() {
            const { facultyFilterByText } = alchemyFacultySection.facultyView;
            if (facultyFilterByText.element) {
              const searchTextField = mdc.textField
                .MDCTextField.attachTo(facultyFilterByText.element);
              const searchInput = searchTextField.input_;
              searchInput.addEventListener('input', onSearchInputChange);

              function onSearchInputChange(inputEvent) {
                facultyFilter.text = inputEvent.target.value;
                facultyTable.refresh();
              }
            }
          }

          function setupFilterByBranch() {
            const { facultyFilterByBranch } = alchemyFacultySection.facultyView;
            facultyFilterByBranch.mdcSelectHandler =
              MDCSelectHandler
                .handle(facultyFilterByBranch.element)
                .clearItems()
                .init('Select branch', { storeData: true })
                .disable();

            const allBranchesItem = { id: null, name: 'All', programme_id: alchemy.keys.programme };
            const { departments } = alchemy.current;

            facultyFilterByBranch.mdcSelectHandler
              .addItems(
                departments.concat([allBranchesItem]),
                { assignments: { valueKey: 'name', idKey: 'id' } }
              )
              .setOnChangeListener(onBranchChange)
              .enable();

            function onBranchChange() {
              const selectedItem = facultyFilterByBranch.mdcSelectHandler.getSelected();
              facultyFilter.departmentId = selectedItem.data.id;
              facultyTable.refresh();
            }
          }

          function setupFilterByDesignation() {
            const { facultyFilterByDesignation } = alchemyFacultySection.facultyView;
            facultyFilterByDesignation.mdcSelectHandler =
              MDCSelectHandler
                .handle(facultyFilterByDesignation.element)
                .clearItems()
                .init('Select Designation', { storeData: true })
                .disable();

            const { designations } = alchemy.current;
            const allDesignationsItem = { id: null, name: 'All' };

            facultyFilterByDesignation.mdcSelectHandler
              .addItems(
                designations.concat([allDesignationsItem]),
                { assignments: { valueKey: 'name', idKey: 'id' } }
              )
              .setOnChangeListener(onDesignationChange)
              .enable();

            function onDesignationChange() {
              const selectedItem = facultyFilterByDesignation.mdcSelectHandler.getSelected();
              facultyFilter.designationId = selectedItem.data.id;
              facultyTable.refresh();
            }
          }

          function setupEvents() {
            const {
              facultyAddButton,
              facultyEditButton,
              facultyDeleteButton
            } = alchemyFacultySection.facultyView;

            facultyTable.element.addEventListener('click', (mouseEvent) => {
              mouseEvent.stopPropagation();
              facultyTable.deselectFaculty();
              const { target } = mouseEvent;
              if (target.tagName !== 'TD') { return; }
              const selectedFaculty = target.parentNode;
              facultyTable.selectedId = selectedFaculty.getAttribute('data-id');
              selectedFaculty.classList.add('selected');
              facultyEditButton.element.removeAttribute('disabled');
              facultyDeleteButton.element.removeAttribute('disabled');
              window.addEventListener(
                'click',
                blurSelection(
                  [selectedFaculty, facultyEditButton.element, facultyDeleteButton.element],
                  facultyTable.deselectFaculty
                )
              );
            });

            const { facultyAdd } = alchemyFacultySection;

            facultyAddButton.element.addEventListener('click', () => {
              scrollTo(facultyAdd.element);
              facultyAdd.switchMode.add();
            });

            facultyEditButton.element.addEventListener('click', () => {
              scrollTo(facultyAdd.element);
              facultyAdd.switchMode.edit(facultyTable.selectedId);
            });
          }
        }

        function setupFacultyAdd() {
          const { facultyAdd } = alchemyFacultySection;
          const {
            facultyAddForm,
            facultyName,
            facultyAlias,
            facultyCode,
            facultyDesignation,
            facultyDepartment,
            facultyAddButton,
            facultyResetButton,
            facultyViewButton
          } = facultyAdd;

          facultyName.mdc = mdc.textField.MDCTextField.attachTo(facultyName.element);
          facultyAlias.mdc = mdc.textField.MDCTextField.attachTo(facultyAlias.element);
          facultyCode.mdc = mdc.textField.MDCTextField.attachTo(facultyCode.element);

          facultyAdd.switchMode = {
            add: () => {
              facultyAdd.editMode = false;
              facultyAdd.heading.innerText = 'Add Faculty';
              facultyAddButton.element.innerText = 'ADD FACULTY';
              delete facultyAdd.editItemId;
            },
            edit: (id) => {
              facultyAdd.editMode = true;
              facultyAdd.heading.innerText = 'Edit Faculty';
              facultyAddButton.element.innerText = 'UPDATE FACULTY';

              alchemy.faculty.get(id, onFacultyGetSuccess, onFacultyGetFail);

              function onFacultyGetSuccess(faculty) {
                facultyAdd.heading.innerText += ` (ID: ${faculty.id})`;
                facultyAdd.editItemId = faculty.id;
                setTextFieldInput(facultyName, faculty.name);
                setTextFieldInput(facultyAlias, faculty.alias);
                setTextFieldInput(facultyCode, faculty.code);
                facultyDesignation.mdcSelectHandler.setSelected(faculty.designation_id);
                facultyDepartment.mdcSelectHandler.setSelected(faculty.department_id);
              }

              function onFacultyGetFail(error) {
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

          setupFacultyDepartment();
          setupFacultyDesignation();

          facultyViewButton.element.addEventListener('click', () => {
            scrollTo(alchemyFacultySection.facultyView.element);
          });

          facultyAddButton.element.addEventListener('click', () => {
            const department = getSelectedDepartment();
            const designation = getSelectedDesignation();

            const isFormValid = facultyAddForm.element.checkValidity() && department !== false;
            if (!isFormValid) {
              const message = 'Please fill out the form properly.';
              alchemyCommon.toast({ message });
              return false;
            }

            const faculty = {
              alias: facultyAlias.mdc.input_.value,
              name: facultyName.mdc.input_.value,
              code: facultyCode.mdc.input_.value,
              designation_id: Number(designation.id),
              department_id: Number(department.id)
            };

            const { editMode } = facultyAdd;
            if (editMode) {
              faculty.id = facultyAdd.editItemId;
              alchemy.faculty.update(
                faculty.id,
                JSON.stringify(faculty),
                onFacultyUpdateSuccess,
                onFacultyAddFail
              );
            } else {
              alchemy.faculty.add(JSON.stringify(faculty), onFacultyAddSuccess, onFacultyAddFail);
            }
            return true;
          });

          facultyResetButton.element.addEventListener('click', () => {
            facultyDepartment.mdcSelectHandler.clearSelection();
          });

          function onFacultyUpdateSuccess(updatedFaculty) {
            const { facultyView } = alchemyFacultySection;
            const { facultyTable } = facultyView;
            facultyTable.refresh();
            facultyAddForm.element.reset();
            facultyDepartment.mdcSelectHandler.clearSelection();
            facultyAdd.switchMode.add();
            scrollTo(facultyView.element);
            const extra = Faculty.transform(updatedFaculty, 'short-info');
            const message = 'Faculty updated successfully.';
            alchemyCommon.toast({ message }, extra);
          }

          function onFacultyAddSuccess(addedFaculty) {
            const { facultyTable } = alchemyFacultySection.facultyView;
            facultyTable.refresh();
            facultyAddForm.element.reset();
            facultyDepartment.mdcSelectHandler.clearSelection();
            const extra = Faculty.transform(addedFaculty, 'short-info');
            const message = 'Faculty added successfully.';

            alchemyCommon.toast({ message }, extra);
          }

          function onFacultyAddFail(error) {
            if (typeof error.json !== 'function') {
              console.error(error);
            } else {
              error.json().then((body) => {
                alchemyCommon.dialog.info({
                  header: `Error ${error.status}: ${error.statusText}`,
                  body: arrayToHtml(Object.values(body)),
                  accept: 'Okay'
                }).show();
              });
            }
          }

          function setupFacultyDepartment() {
            facultyDepartment.mdcSelectHandler =
              MDCSelectHandler
                .handle(facultyDepartment.element)
                .clearItems()
                .init('Select Department', { storeData: true })
                .disable();

            const { departments } = alchemy.current;
            facultyDepartment.mdcSelectHandler
              .addItems(departments, { assignments: { valueKey: 'name', idKey: 'id' } })
              .enable();
          }

          function getSelectedDepartment() {
            const selectedDepartment = facultyDepartment.mdcSelectHandler.getSelected();
            if (selectedDepartment && selectedDepartment.data) {
              return selectedDepartment.data;
            }
            return false;
          }

          function setupFacultyDesignation() {
            facultyDesignation.mdcSelectHandler =
              MDCSelectHandler
                .handle(facultyDesignation.element)
                .clearItems()
                .init('Select Designation', { storeData: true })
                .disable();

            const { designations } = alchemy.current;
            facultyDesignation.mdcSelectHandler
              .addItems(
                designations,
                { assignments: { valueKey: 'name', idKey: 'id' } }
              )
              .enable();
          }

          function getSelectedDesignation() {
            const selectedDesignation = facultyDesignation.mdcSelectHandler.getSelected();
            if (selectedDesignation && selectedDesignation.data) {
              return selectedDesignation.data;
            }
            return false;
          }
        }
      }

      function setupCourseOfferedSection() {
        const alchemyCourseOfferedSection = {
          classSelect: {
            element: document.querySelector('#alchemy-course-offered__class')
          },
          courseOfferedList: {
            element: document.querySelector('#alchemy-course-offered__list'),
            storage: []
          },
          courseOfferedAddDialog: {
            element: document.querySelector('#alchemy-course-offered__add-dialog'),
            courseSelect: {
              element: document.querySelector('#alchemy-course-offered__courses'),
              clearSelectionButton: document.querySelector('#alchemy-course-offered__courses .alchemy-select__cancel'),
              menu: {
                element: document.querySelector('#alchemy-course-offered__courses--menu'),
                list: document.querySelector('alchemy-course-offered__courses--menu .mdc-list')
              }
            }
          },
          courseListSection: document.querySelector('#alchemy-course-offered__course-list-section'),
          courseSettingSection: {
            element: document.querySelector('#alchemy-course-offered__course-setting-section'),
            courseName: document.querySelector('#alchemy-course-offered__course-name'),
            courseDetail: document.querySelector('#alchemy-course-offered__course-detail'),
            deleteButton: document.querySelector('#alchemy-course-offered__delete-button'),
            saveButton: document.querySelector('#alchemy-course-offered__save-button'),
            lectureSection: {
              element: document.querySelector('#alchemy-course-offered__lecture-section'),
              lectureLocation: {
                element: document.querySelector('#alchemy-course-offered__lecture-location'),
                clearSelectionButton: document.querySelector('#alchemy-course-offered__lecture-location .alchemy-select__cancel'),
                menu: {
                  element: document.querySelector('#alchemy-course-offered__lecture-location--menu'),
                  list: document.querySelector('#alchemy-course-offered__lecture-location--menu .mdc-list')
                }
              },
              lectureFaculty: {
                element: document.querySelector('#alchemy-course-offered__lecture-faculty'),
                clearSelectionButton: document.querySelector('#alchemy-course-offered__lecture-faculty .alchemy-select__cancel'),
                menu: {
                  element: document.querySelector('#alchemy-course-offered__lecture-faculty--menu'),
                  list: document.querySelector('#alchemy-course-offered__lecture-faculty--menu .mdc-list')
                }
              },
              lectureFaculty2: {
                element: document.querySelector('#alchemy-course-offered__lecture-faculty-second'),
                clearSelectionButton: document.querySelector('#alchemy-course-offered__lecture-faculty-second .alchemy-select__cancel'),
                menu: {
                  element: document.querySelector('#alchemy-course-offered__lecture-faculty-second--menu'),
                  list: document.querySelector('#alchemy-course-offered__lecture-faculty-second--menu .mdc-list')
                }
              }
            },
            practicalSection: {
              element: document.querySelector('#alchemy-course-offered__practical-section'),
              practicalLocation: {
                element: document.querySelector('#alchemy-course-offered__practical-location'),
                clearSelectionButton: document.querySelector('#alchemy-course-offered__practical-location .alchemy-select__cancel'),
                menu: {
                  element: document.querySelector('#alchemy-course-offered__practical-location--menu'),
                  list: document.querySelector('#alchemy-course-offered__practical-location--menu .mdc-list')
                }
              },
              practicalBatch: document.querySelector('#alchemy-course-offered__practical-batch')
            },
            tutorialSection: {
              element: document.querySelector('#alchemy-course-offered__tutorial-section'),
              tutorialLocation: {
                element: document.querySelector('#alchemy-course-offered__tutorial-location'),
                clearSelectionButton: document.querySelector('#alchemy-course-offered__tutorial-location .alchemy-select__cancel'),
                menu: {
                  element: document.querySelector('#alchemy-course-offered__tutorial-location--menu'),
                  list: document.querySelector('#alchemy-course-offered__tutorial-location--menu .mdc-list')
                }
              },
              tutorialBatch: document.querySelector('#alchemy-course-offered__tutorial-batch')
            },
            previousData: {},
            nextData: {}
          }
        };

        setupClassSelect();
        setupCourseOfferedAddDialog();
        setupCourseSettingSection();

        function setupClassSelect() {
          const { classSelect, courseListSection, courseSettingSection } = alchemyCourseOfferedSection;
          classSelect.mdcSelectHandler =
            MDCSelectHandler
              .handle(classSelect.element)
              .clearItems()
              .init('Select class', { storeData: true })
              .disable();

          const { classes } = alchemy.current;
          const classesList = Class_.transform(classes, 'list');

          classSelect.mdcSelectHandler
            .addItems(classesList, { assignments: { valueKey: 'name', idKey: 'id' } })
            .setOnChangeListener(onClassChange)
            .enable();

          setupCourseListEvents();

          function onClassChange() {
            const { courseOfferedList } = alchemyCourseOfferedSection;
            const selectedClass = classSelect.mdcSelectHandler.getSelected().data;
            alchemy.courseOffered.search({ classId: selectedClass.id }, (courseOfferedArray) => {
              courseOfferedList.storage = courseOfferedArray;
              const courseOfferedGroupByCourses = CourseOffered.transform(
                courseOfferedArray,
                'group-by-course'
              );
              const listItems = arrayToMdcList(courseOfferedGroupByCourses, {
                primary: r => r.course.name,
                secondary: r => Course.transform(r.course, 'detail'),
                also: (r, course) => {
                  r.setAttribute('data-id', course.id);
                  return r;
                }
              });
              courseOfferedList.element.innerHTML = '';
              listItems.forEach((item) => {
                courseOfferedList.element.appendChild(item);
              });
              courseListSection.style.display = 'block';
              courseSettingSection.element.style.display = 'none';
              scrollTo(courseListSection);
            });
          }
          function setupCourseListEvents() {
            const { courseOfferedList } = alchemyCourseOfferedSection;
            courseOfferedList.element.addEventListener('click', onListItemClick);
            function onListItemClick(e) {
              const { storage } = courseOfferedList;
              const target = assertPath(e, 'mdc-list-item');
              if (!target) return;
              const courseOfferedId = target.getAttribute('data-id');
              if (courseOfferedId === null) throw new Error('Course Offered Id is null');
              const course = storage.find(r => r.id === (+courseOfferedId));
              loadCourseOffered(course.course_id);
              setData(courseSettingSection.previousData);
              console.log(getData());
            }
          }
        }

        function setupCourseOfferedAddDialog() {
          const { courseOfferedAddDialog } = alchemyCourseOfferedSection;
          courseOfferedAddDialog.mdc =
            mdc.dialog.MDCDialog.attachTo(courseOfferedAddDialog.element);
          // courseOfferedAddDialog.mdc.show();
          setupCourseSelect();
          function setupCourseSelect() {
            // Auto-complete sample
            const { courseOfferedList } = alchemyCourseOfferedSection;
            const { courseSelect } = courseOfferedAddDialog;

            courseSelect.mdc = mdc.textField.MDCTextField.attachTo(courseSelect.element);

            const getData = (text, callback) => alchemy.course.search({ text }, callback);
            const getDataFilter = () => {
              const courseOfferedIds = courseOfferedList.storage
                .map(r => r.course.id)
                .filter(unique);
              return removeItemsById(courseOfferedIds);
            };
            const transform = course => mdcListItem(course.name, Course.transform(course, 'detail'));
            const onSelectionChange = (selected) => {
              if (selected && selected.data) {
                setTextFieldInput(courseSelect, selected.data.name);
              }
            };

            AutoCompleteComponent.attachTo(courseSelect, transform, getData)
              .setDataFilter(getDataFilter)
              .setOnSelectionChange(onSelectionChange);
          }
        }

        function setupCourseSettingSection() {
          const { courseSettingSection } = alchemyCourseOfferedSection;
          const { lectureSection, practicalSection, tutorialSection } = courseSettingSection;

          const { lectureLocation, lectureFaculty, lectureFaculty2 } = lectureSection;
          const { practicalBatch, practicalLocation } = practicalSection;
          const { tutorialBatch, tutorialLocation } = tutorialSection;

          function setupLectureLocation() {
            // TODO: Add filter by lab or lecture
            lectureLocation.mdc = mdc.textField.MDCTextField.attachTo(lectureLocation.element);
            const searchLocations = (text, callback) => alchemy.location.search({ text }, callback);
            const transform = location => mdcListItem(location.alias, Location.transform(location, 'detail'));
            const onSelectionChange = (selected) => {
              if (selected && selected.data) {
                setTextFieldInput(lectureLocation, selected.data.alias);
              }
            };

            lectureLocation.acc = AutoCompleteComponent
              .attachTo(lectureLocation, transform, searchLocations)
              .setOnSelectionChange(onSelectionChange);
          }

          function setupLectureFaculty() {
            lectureFaculty.mdc = mdc.textField.MDCTextField.attachTo(lectureFaculty.element);
            lectureFaculty2.mdc = mdc.textField.MDCTextField.attachTo(lectureFaculty2.element);

            const getData = (text, callback) => alchemy.faculty.search({ text }, callback);
            const transform = faculty => mdcListItem(faculty.alias, Faculty.transform(faculty, 'detail'));
            const onSelectionChange = (selected) => {
              if (selected && selected.data) {
                setTextFieldInput(lectureFaculty, selected.data.alias);
              }
            };
            const onSelectionChange2 = (selected) => {
              if (selected && selected.data) {
                setTextFieldInput(lectureFaculty2, selected.data.alias);
              }
            };
            lectureFaculty.acc = AutoCompleteComponent
              .attachTo(lectureFaculty, transform, getData)
              .setOnSelectionChange(onSelectionChange);
            lectureFaculty2.acc = AutoCompleteComponent
              .attachTo(lectureFaculty2, transform, getData)
              .setOnSelectionChange(onSelectionChange2);
          }
          function setupPracticalLocation() {
            practicalLocation.mdc = mdc.textField.MDCTextField.attachTo(practicalLocation.element);

            const getData = (text, callback) => alchemy.location.search({ text }, callback);
            const transform = location => mdcListItem(location.alias, Location.transform(location, 'detail'));
            const onSelectionChange = (selected) => {
              if (selected && selected.data) {
                setTextFieldInput(practicalLocation, selected.data.alias);
              }
            };
            practicalLocation.acc = AutoCompleteComponent
              .attachTo(practicalLocation, transform, getData)
              .setOnSelectionChange(onSelectionChange);
          }
          function setupTutorialLocation() {
            tutorialLocation.mdc = mdc.textField.MDCTextField.attachTo(tutorialLocation.element);

            const getData = (text, callback) => alchemy.location.search({ text }, callback);
            const transform = location => mdcListItem(location.alias, Location.transform(location, 'detail'));
            const onSelectionChange = (selected) => {
              if (selected && selected.data) {
                setTextFieldInput(tutorialLocation, selected.data.alias);
              }
            };
            tutorialLocation.acc = AutoCompleteComponent
              .attachTo(tutorialLocation, transform, getData)
              .setOnSelectionChange(onSelectionChange);
          }

          setupLectureLocation();
          setupLectureFaculty();
          setupPracticalLocation();
          setupTutorialLocation();
        }

        function __loadCourseOffered(courseId) {
          const { courseOfferedList, courseSettingSection } = alchemyCourseOfferedSection;
          const { storage } = courseOfferedList;
          const { courseName, courseDetail } = courseSettingSection;
          const { lectureSection, practicalSection, tutorialSection } = courseSettingSection;
          const { saveButton, deleteButton } = courseSettingSection;
          const { COURSE_TYPE_PRACTICAL, COURSE_TYPE_TUTORIAL } = alchemy.current;

          const coursesOffered = storage.filter(r => (r.course_id === courseId));
          courseSettingSection.previousData = { };

          if (!coursesOffered) throw new Error('Courses Offered cannot be found in storage.', courseId, storage);

          const [courseOffered] = coursesOffered;
          const { course } = courseOffered;

          courseSettingSection.element.style.display = 'flex';
          courseName.innerText = course.name;
          courseDetail.innerHTML = `${course.code} &bull; ${course.alias}`;
          scrollTo(courseSettingSection.element);

          const hasLectureComponent = course.lecture > 0;
          const hasPracticalComponent = course.practical > 0;
          const hasTutorialComponent = course.tutorial > 0;
          const isTwoPersonCourse = course.persons === 2;
          const classId = course.class.id;

          courseSettingSection.previousData = {
            hasLectureComponent,
            hasPracticalComponent,
            hasTutorialComponent,
            isTwoPersonCourse,
            courseId,
            classId,
            coursesOffered
          };

          courseSettingSection.nextData = Object.assign({}, courseSettingSection.previousData);

          console.log(courseSettingSection.previousData);

          lectureSection.element.style.display = hasLectureComponent ? 'grid' : 'none';
          practicalSection.element.style.display = hasPracticalComponent ? 'grid' : 'none';
          tutorialSection.element.style.display = hasTutorialComponent ? 'grid' : 'none';

          if (hasLectureComponent) {
            const { lectureLocation, lectureFaculty, lectureFaculty2 } = lectureSection;
            lectureLocation.acc.setSelected(courseOffered.location);
            lectureFaculty.acc.setSelected(courseOffered.faculty[0]);
            if (isTwoPersonCourse) {
              lectureFaculty2.acc.setSelected(courseOffered.faculty[1]);
            }
          }

          if (hasPracticalComponent) {
            const practicals = coursesOffered.filter(r => r.course_type === COURSE_TYPE_PRACTICAL);
            const practicalHasCommonLocation = isCommon(practicals.map(r => r.location_id));
            const { practicalBatch } = practicalSection;
            const { practicalLocation } = practicalSection;
            setRadioInput(practicalBatch, practicalHasCommonLocation ? 0 : 1);
            setOnRadioSwitch(practicalBatch, console.log);
            practicalLocation.acc.setSelected(courseOffered.location);
          }

          if (hasTutorialComponent) {
            const tutorials = coursesOffered.filter(r => r.course_type === COURSE_TYPE_TUTORIAL);
            const tutorialHasCommonLocation = isCommon(tutorials.map(r => r.location_id));

            const { tutorialLocation } = tutorialSection;
            tutorialLocation.acc.setSelected(courseOffered.location);
          }
        }

        function loadCourseOffered(courseId) {
          const { courseSettingSection, courseOfferedList } = alchemyCourseOfferedSection;
          const { COURSE_TYPE_PRACTICAL, COURSE_TYPE_TUTORIAL } = alchemy.current;
          const { storage } = courseOfferedList;

          const coursesOffered = storage.filter(r => (r.course_id === courseId));
          if (!coursesOffered) {
            throw new Error('Courses Offered cannot be found in storage.', courseId, storage);
          }

          // eslint-disable-next-line prefer-destructuring
          const course = coursesOffered[0].course;
          const _class = coursesOffered[0].__class;
          const hasLectureComponent = course.lecture > 0;
          const hasPracticalComponent = course.practical > 0;
          const hasTutorialComponent = course.tutorial > 0;
          const isTwoPersonCourse = course.persons === 2;
          const practicals = coursesOffered.filter(r => r.course_type === COURSE_TYPE_PRACTICAL);
          const tutorials = coursesOffered.filter(r => r.course_type === COURSE_TYPE_TUTORIAL);
          const practicalHasCommonLocation = isCommon(practicals.map(r => r.location_id));
          const tutorialHasCommonLocation = isCommon(tutorials.map(r => r.location_id));
          const profileId = coursesOffered[0].profile_id;

          courseSettingSection.previousData = {
            hasLectureComponent,
            hasPracticalComponent,
            hasTutorialComponent,
            practicalHasCommonLocation,
            tutorialHasCommonLocation,
            isTwoPersonCourse,
            course,
            _class,
            coursesOffered,
            profileId,
            batches: practicals.length || tutorials.length || 0
          };

          console.log(courseSettingSection.previousData);

          courseSettingSection.nextData = Object.assign({}, courseSettingSection.previousData);

          return courseSettingSection.previousData;
        }

        function setData(data) {
          const { courseSettingSection } = alchemyCourseOfferedSection;
          const { courseName, courseDetail } = courseSettingSection;
          const { lectureSection, practicalSection, tutorialSection } = courseSettingSection;
          const { COURSE_TYPE_PRACTICAL, COURSE_TYPE_TUTORIAL } = alchemy.current;

          const {
            hasLectureComponent,
            hasPracticalComponent,
            hasTutorialComponent,
            practicalHasCommonLocation,
            tutorialHasCommonLocation,
            isTwoPersonCourse,
            course,
            coursesOffered,
            batches
          } = data;

          courseName.innerText = course.name;
          courseDetail.innerHTML = `${course.code} &bull; ${course.alias}`;

          lectureSection.element.style.display = hasLectureComponent ? 'grid' : 'none';
          practicalSection.element.style.display = hasPracticalComponent ? 'grid' : 'none';
          tutorialSection.element.style.display = hasTutorialComponent ? 'grid' : 'none';

          if (hasLectureComponent) {
            const { lectureLocation, lectureFaculty, lectureFaculty2 } = lectureSection;
            const courseOffered = coursesOffered[0];
            lectureLocation.acc.setSelected(courseOffered.location);
            lectureFaculty.acc.setSelected(courseOffered.faculty[0]);
            if (isTwoPersonCourse) {
              lectureFaculty2.acc.setSelected(courseOffered.faculty[1]);
            }
          }

          if (hasPracticalComponent) {
            const practicals = coursesOffered.filter(r => r.course_type === COURSE_TYPE_PRACTICAL);
            const { practicalLocation, practicalBatch } = practicalSection;
            setRadioInput(practicalBatch, practicalHasCommonLocation ? 0 : 1);
            console.log('practicals', practicals, coursesOffered);
            practicalLocation.acc.setSelected(practicals[0].location);
            limitElements(practicalBatch, batches);

            const radioElements = enumerateRadioElements(practicalBatch);
            for (let i = 0; i <= batches; i += 1) {
              radioElements[i].setAttribute('data-location-id', null);
            }
            radioElements[0].setAttribute('data-location-id', practicals[0].location_id);
            practicals.forEach((practical) => {
              radioElements[practical.batch].setAttribute('data-location-id', practical.location_id);
            });
          }

          if (hasTutorialComponent) {
            const tutorials = coursesOffered.filter(r => r.course_type === COURSE_TYPE_TUTORIAL);
            const { tutorialLocation, tutorialBatch } = tutorialSection;
            setRadioInput(tutorialBatch, tutorialHasCommonLocation ? 0 : 1);
            tutorialLocation.acc.setSelected(tutorials[0].location);
            limitElements(tutorialBatch, batches);

            const radioElements = enumerateRadioElements(tutorialBatch);
            for (let i = 0; i <= batches; i += 1) {
              radioElements[i].setAttribute('data-location-id', null);
            }
            radioElements[0].setAttribute('data-location-id', tutorials[0].location_id);
            tutorials.forEach((tutorial) => {
              radioElements[tutorial.batch].setAttribute('data-location-id', tutorial.location_id);
            });
          }

          courseSettingSection.element.style.display = 'flex';
          scrollTo(courseSettingSection.element);
        }

        function getData() {
          const { courseSettingSection } = alchemyCourseOfferedSection;
          const { lectureSection, practicalSection, tutorialSection } = courseSettingSection;
          const { previousData } = courseSettingSection;

          const {
            hasLectureComponent,
            hasPracticalComponent,
            hasTutorialComponent,
            isTwoPersonCourse,
            course,
            _class,
            profileId,
            batches
          } = previousData;

          const courseOffered = [];
          const common = {
            class_id: _class.id,
            course_id: course.id,
            profile_id: profileId
          };

          if (hasLectureComponent) {
            const { lectureLocation, lectureFaculty, lectureFaculty2 } = lectureSection;
            const locationId = lectureLocation.acc.getSelected().data.id;
            const { COURSE_TYPE_LECTURE } = alchemy.current;
            const faculty = [];
            const facultyId = lectureFaculty.acc.getSelected().data.id;
            faculty.push(facultyId);
            if (isTwoPersonCourse) {
              const facultyId2 = lectureFaculty2.acc.getSelected().data.id;
              faculty.push(facultyId2);
            }
            const lecture = Object.assign({}, common, {
              batch: 0,
              location_id: locationId,
              course_type: COURSE_TYPE_LECTURE,
              faculty
            });
            courseOffered.push(lecture);
          }
          if (hasPracticalComponent) {
            const practicals = [];
            const { practicalBatch } = practicalSection;
            const practicalHasCommonLocation = (+getSelectedRadio(practicalBatch).value) === 0;
            const { COURSE_TYPE_PRACTICAL } = alchemy.current;
            const radioElements = enumerateRadioElements(practicalBatch);
            if (practicalHasCommonLocation) {
              const locationId = (+radioElements[0].getAttribute('data-location-id') || null);
              for (let i = 1; i <= batches; i += 1) {
                const practical = Object.assign({}, common, {
                  batch: i,
                  location_id: locationId,
                  course_type: COURSE_TYPE_PRACTICAL
                });
                practicals.push(practical);
              }
            } else {
              for (let i = 1; i <= batches; i += 1) {
                const locationId = (+radioElements[i].getAttribute('data-location-id') || null);
                const practical = Object.assign({}, common, {
                  batch: i,
                  location_id: locationId,
                  course_type: COURSE_TYPE_PRACTICAL
                });
                practicals.push(practical);
              }
            }
            courseOffered.push(...practicals);
          }
          if (hasTutorialComponent) {
            const tutorials = [];
            const { tutorialBatch } = tutorialSection;
            const tutorialHasCommonLocation = (+getSelectedRadio(tutorialBatch).value) === 0;
            const { COURSE_TYPE_TUTORIAL } = alchemy.current;
            const radioElements = enumerateRadioElements(tutorialBatch);
            for (let i = 0; i <= batches; i += 1) {
              const index = tutorialHasCommonLocation ? 0 : i;
              const locationId = (+radioElements[index].getAttribute('data-location-id') || null);
              const tutorial = Object.assign({}, common, {
                batch: i,
                location_id: locationId,
                course_type: COURSE_TYPE_TUTORIAL
              });
              tutorials.push(tutorial);
            }
            courseOffered.push(...tutorials);
          }

          return courseOffered;
        }
      }

      function setupTimeTableSection() {}

      // function setupProfileSection() {}

      function setupClassSection() {
        const alchemyClassSection = {
          element: document.querySelector('#alchemy-class'),
          classView: {
            element: document.querySelector('#alchemy-class-view'),
            classAddButton: {
              element: document.querySelector('#alchemy-class-view__add-button')
            },
            classEditButton: {
              element: document.querySelector('#alchemy-class-view__edit-button')
            },
            classDeleteButton: {
              element: document.querySelector('#alchemy-class-view__delete-button')
            },
            classFilterByText: {
              element: document.querySelector('#alchemy-class-view__filter-by-text')
            },
            classFilterByLevel: {
              element: document.querySelector('#alchemy-class-view__filter-by-level')
            },
            classFilterByDivision: {
              element: document.querySelector('#alchemy-class-view__filter-by-division')
            },
            classFilterByBranch: {
              element: document.querySelector('#alchemy-class-view__filter-by-branch')
            },
            classTable: {
              element: document.querySelector('#alchemy-class-view__table'),
              table: document.querySelector('#alchemy-class-view__table table'),
              headers: ['Level', 'Division', 'Location', 'Department'],
              headersDataTypes: [1, 1, 'Location', 'Department'],
              headersWidth: [15, 25, 20, 40],
              selectedId: null
            }
          },
          classAdd: {
            element: document.querySelector('#alchemy-class-add'),
            mode: 'add',
            heading: document.querySelector('#alchemy-class-add h1'),
            classAddForm: { element: document.querySelector('#alchemy-class-add__form') },
            classLevel: {
              element: document.querySelector('#alchemy-class-add__class-level'),
              input: document.querySelector('#alchemy-class-add__class-level input')
            },
            classDivision: {
              element: document.querySelector('#alchemy-class-add__class-division'),
              input: document.querySelector('#alchemy-class-add__class-division input')
            },
            classLocationSelect: {
              element: document.querySelector('#alchemy-class__class-location'),
              clearSelectionButton: document.querySelector('#alchemy-class__class-location .alchemy-select__cancel'),
              menu: {
                element: document.querySelector('#alchemy-class__class-location--menu'),
                list: document.querySelector('alchemy-class__class-location--menu .mdc-list')
              }
            },
            classLocationList: {
              element: document.querySelector('#alchemy-class-location__list'),
              storage: []
            },
            classDepartment: {
              element: document.querySelector('#alchemy-class-add__class-department')
            },
            classAddButton: {
              element: document.querySelector('#alchemy-class-add__add-button')
            },
            classResetButton: {
              element: document.querySelector('#alchemy-class-add__reset-button')
            },
            classViewButton: {
              element: document.querySelector('#alchemy-class-add__view-button')
            }
          }
        };

        setupClassView();
        setupClassAdd();


        function setupClassView() {
          const { classTable } = alchemyClassSection.classView;

          const classFilter = {
            departmentId: null,
            level: null,
            division: null,
            text: null
          };

          setupClassTable();
          setupFilterByText();
          setupFilterByBranch();
          setupFilterByLevel();
          setupFilterByDivision();
          setupEvents();

          function setupClassTable() {
            const { classEditButton, classDeleteButton } =
              alchemyClassSection.classView;

            classTable.deselectClass = () => {
              const selectedClass = classTable.element.querySelectorAll('tr.selected');
              classEditButton.element.setAttribute('disabled', '');
              classDeleteButton.element.setAttribute('disabled', '');
              Array.prototype.forEach.call(
                selectedClass,
                item => (item.classList.remove('selected'))
              );
              classTable.selectedId = null;
            };

            classTable.refresh = () => {
              classTable.deselectClass();
              alchemy.class_.search(filterObject(classFilter), (data) => {
                const transformedData = Class_.transform(data, 'table');
                classTable.mdcDataTableHelper
                  .setData(transformedData);
                if (!classTable.element.querySelector('td')) {
                  classTable.element.classList.add('alchemy-class-table--empty');
                } else {
                  classTable.element.classList.remove('alchemy-class-table--empty');
                }
              });
            };

            const { headers, headersDataTypes, headersWidth } = classTable;
            classTable.mdcDataTableHelper =
              MDCDataTableHelper
                .handle(classTable.element)
                .setIdKey('id')
                .setHeaders(headers, headersDataTypes, headersWidth);
            classTable.refresh();

            classDeleteButton.element.addEventListener('click', () => {
              if (!classDeleteButton.element.hasAttribute('disabled')) {
                alchemy.class_.delete(
                  classTable.selectedId,
                  onClassDeleteSuccess,
                  onClassDeleteFail
                );
              }
            });
          }

          function onClassDeleteSuccess(deletedClass) {
            const message = 'Class deleted successfully.';
            const extra = Class_.transform(deletedClass, 'short-info');
            classTable.refresh();
            alchemyCommon.toast({ message }, extra);
          }

          function onClassDeleteFail(error) {
            if (typeof error.json !== 'function') {
              console.error(error);
            } else {
              error.json().then((body) => {
                alchemyCommon.dialog.info({
                  header: `Error ${error.status}: ${error.statusText}`,
                  body: arrayToHtml(Object.values(body)),
                  accept: 'Okay'
                }).show();
              });
            }
          }

          function setupFilterByText() {
            const { classFilterByText } = alchemyClassSection.classView;
            if (classFilterByText.element) {
              const searchTextField = mdc.textField.MDCTextField
                .attachTo(classFilterByText.element);
              const searchInput = searchTextField.input_;
              searchInput.addEventListener('input', onSearchInputChange);

              function onSearchInputChange(inputEvent) {
                classFilter.text = inputEvent.target.value;
                classTable.refresh();
              }
            }
          }
          function setupFilterByBranch() {
            const { classFilterByBranch } = alchemyClassSection.classView;
            classFilterByBranch.mdcSelectHandler =
              MDCSelectHandler
                .handle(classFilterByBranch.element)
                .clearItems()
                .init('Select branch', { storeData: true })
                .disable();

            const allBranchesItem = { id: null, name: 'All', programme_id: alchemy.keys.programme };
            const { departments } = alchemy.current;

            classFilterByBranch.mdcSelectHandler
              .addItems(
                departments.concat([allBranchesItem]),
                { assignments: { valueKey: 'name', idKey: 'id' } }
              )
              .setOnChangeListener(onBranchChange)
              .enable();

            function onBranchChange() {
              const selectedItem = classFilterByBranch.mdcSelectHandler.getSelected();
              classFilter.departmentId = selectedItem.data.id;
              classTable.refresh();
            }
          }
          function setupFilterByLevel() {
            const { classFilterByLevel } = alchemyClassSection.classView;
            classFilterByLevel.mdcSelectHandler =
              MDCSelectHandler
                .handle(classFilterByLevel.element)
                .clearItems()
                .init('Select Level', { storeData: true })
                .disable();

            const allLevelItem = { id: null, level: 'All' };
            const { levels } = alchemy.current;

            classFilterByLevel.mdcSelectHandler
              .addItems(
                levels.concat([allLevelItem]),
                { assignments: { valueKey: 'level', idKey: 'id' } }
              )
              .setOnChangeListener(onLevelChange)
              .enable();

            function onLevelChange() {
              const selectedItem = classFilterByLevel.mdcSelectHandler.getSelected();
              classFilter.level = selectedItem.data.id;
              classTable.refresh();
            }
          }
          function setupFilterByDivision() {
            const { classFilterByDivision } = alchemyClassSection.classView;
            classFilterByDivision.mdcSelectHandler =
              MDCSelectHandler
                .handle(classFilterByDivision.element)
                .clearItems()
                .init('Select division', { storeData: true })
                .disable();

            const allDivisionItem = { id: null, division: 'All' };
            const { divisions } = alchemy.current;

            classFilterByDivision.mdcSelectHandler
              .addItems(
                divisions.concat([allDivisionItem]),
                { assignments: { valueKey: 'division', idKey: 'id' } }
              )
              .setOnChangeListener(onDivisionChange)
              .enable();

            function onDivisionChange() {
              const selectedItem = classFilterByDivision.mdcSelectHandler.getSelected();
              classFilter.division = selectedItem.data.id;
              classTable.refresh();
            }
          }


          function setupEvents() {
            const {
              classAddButton,
              classEditButton,
              classDeleteButton
            } = alchemyClassSection.classView;

            classTable.element.addEventListener('click', (mouseEvent) => {
              mouseEvent.stopPropagation();
              classTable.deselectClass();
              const { target } = mouseEvent;
              if (target.tagName !== 'TD') { return; }
              const selectedClass = target.parentNode;
              classTable.selectedId = selectedClass.getAttribute('data-id');
              selectedClass.classList.add('selected');
              classEditButton.element.removeAttribute('disabled');
              classDeleteButton.element.removeAttribute('disabled');
              window.addEventListener(
                'click',
                blurSelection(
                  [selectedClass, classEditButton.element, classDeleteButton.element],
                  classTable.deselectClass
                )
              );
            });

            const { classAdd } = alchemyClassSection;

            classAddButton.element.addEventListener('click', () => {
              scrollTo(classAdd.element);
              classAdd.switchMode.add();
            });

            classEditButton.element.addEventListener('click', () => {
              scrollTo(classAdd.element);
              classAdd.switchMode.edit(classTable.selectedId);
            });
          }
        }
        function setupClassAdd() {
          const { classAdd } = alchemyClassSection;
          const {
            classAddForm,
            classLevel,
            classDivision,
            classDepartment,
            classAddButton,
            classResetButton,
            classViewButton
          } = classAdd;

          classLevel.mdc = mdc.textField.MDCTextField.attachTo(classLevel.element);
          classDivision.mdc = mdc.textField.MDCTextField.attachTo(classDivision.element);

          classAdd.switchMode = {
            add: () => {
              classAdd.editMode = false;
              classAdd.heading.innerText = 'Add Class';
              classAddButton.element.innerText = 'ADD CLASS';
              delete classAdd.editItemId;
            },
            edit: (id) => {
              classAdd.editMode = true;
              classAdd.heading.innerText = 'Edit Class';
              classAddButton.element.innerText = 'UPDATE CLASS';

              alchemy.class_.get(id, onClassGetSuccess, onClassGetFail);

              function onClassGetSuccess(class_) {
                console.log(class_);
                classAdd.heading.innerText += ` (ID: ${class_.id})`;
                classAdd.editItemId = class_.id;
                setTextFieldInput(classLevel, class_.level);
                setTextFieldInput(classDivision, class_.division);
                classAdd.classLocationSelect.acc.setSelected(class_.default_class);

                classDepartment.mdcSelectHandler.setSelected(class_.department_id);
              }

              function onClassGetFail(error) {
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

          setupClassDepartment();
          setupClassLocationSelect();

          function setupClassLocationSelect() {
            // Auto-complete sample
            const { classLocationSelect } = classAdd;

            classLocationSelect.mdc = mdc.textField.MDCTextField
              .attachTo(classLocationSelect.element);

            const getData = (text, callback) => alchemy.location.search({ text }, callback);
            const transform = location => mdcListItem(location.alias, Location.transform(location, 'detail'));
            const onSelectionChange = (selected) => {
              if (selected && selected.data) {
                setTextFieldInput(classLocationSelect, selected.data.alias);
              }
            };

            classLocationSelect.acc = AutoCompleteComponent
              .attachTo(classLocationSelect, transform, getData)
              .setOnSelectionChange(onSelectionChange);
          }
          classViewButton.element.addEventListener('click', () => {
            scrollTo(alchemyClassSection.classView.element);
          });

          classAddButton.element.addEventListener('click', () => {
            // const location = classLocation.element.querySelector(':checked')
            // .getAttribute('value');
            const department = getSelectedDepartment();
            const location = getSelectedLocation();

            const isFormValid = classAddForm.element.checkValidity() && department !== false;
            if (!isFormValid) {
              const message = 'Please fill out the form properly.';
              alchemyCommon.toast({ message });
              return false;
            }

            const class_ = {
              level: classLevel.mdc.input_.value,
              division: classDivision.mdc.input_.value,
              default_class: Number(location.id),
              department_id: Number(department.id)
            };

            const { editMode } = classAdd;
            if (editMode) {
              class_.id = classAdd.editItemId;
              alchemy.class_.update(
                class_.id,
                JSON.stringify(class_),
                onClassUpdateSuccess,
                onClassAddFail
              );
            } else {
              alchemy.class_.add(
                JSON.stringify(class_), onClassAddSuccess,
                onClassAddFail
              );
            }
            return true;
          });

          classResetButton.element.addEventListener('click', () => {
            classDepartment.mdcSelectHandler.clearSelection();
          });

          function onClassUpdateSuccess(updatedClass) {
            const { classView } = alchemyClassSection;
            const { classTable } = classView;
            classTable.refresh();
            classAddForm.element.reset();
            classDepartment.mdcSelectHandler.clearSelection();
            classAdd.switchMode.add();
            scrollTo(classView.element);
            const extra = Class_.transform(updatedClass, 'short-info');
            const message = 'Class updated successfully.';
            alchemyCommon.toast({ message }, extra);
          }

          function onClassAddSuccess(addedClass) {
            const { classTable } = alchemyClassSection.classView;
            classTable.refresh();
            classAddForm.element.reset();
            classDepartment.mdcSelectHandler.clearSelection();
            const extra = Class_.transform(addedClass, 'short-info');
            const message = 'Class_ added successfully.';
            alchemyCommon.toast({ message }, extra);
          }

          function onClassAddFail(error) {
            if (typeof error.json !== 'function') {
              console.error(error);
            } else {
              error.json().then((body) => {
                alchemyCommon.dialog.info({
                  header: `Error ${error.status}: ${error.statusText}`,
                  body: arrayToHtml(Object.values(body)),
                  accept: 'Okay'
                }).show();
              });
            }
          }

          function setupClassDepartment() {
            classDepartment.mdcSelectHandler =
              MDCSelectHandler
                .handle(classDepartment.element)
                .clearItems()
                .init('Select Department', { storeData: true })
                .disable();

            const { departments } = alchemy.current;
            classDepartment.mdcSelectHandler
              .addItems(departments, { assignments: { valueKey: 'name', idKey: 'id' } })
              .enable();
          }

          function getSelectedDepartment() {
            const selectedDepartment = classDepartment.mdcSelectHandler.getSelected();
            if (selectedDepartment && selectedDepartment.data) {
              return selectedDepartment.data;
            }
            return false;
          }

          function getSelectedLocation() {
            const selectedLocation = classAdd.classLocationSelect.acc.getSelected();
            if (selectedLocation && selectedLocation.data) {
              return selectedLocation.data;
            }
            return false;
          }
        }
      }

      function setupDesignationSection() {
        const alchemyDesignationSection = {
          element: document.querySelector('#alchemy-designation'),
          designationView: {
            element: document.querySelector('#alchemy-designation-view'),
            designationAddButton: {
              element: document.querySelector('#alchemy-designation-view__add-button')
            },
            designationEditButton: {
              element: document.querySelector('#alchemy-designation-view__edit-button')
            },
            designationDeleteButton: {
              element: document.querySelector('#alchemy-designation-view__delete-button')
            },
            designationTable: {
              element: document.querySelector('#alchemy-designation-view__table'),
              table: document.querySelector('#alchemy-designation-view__table table'),
              headers: ['Name', 'Hours', 'Programme'],
              headersDataTypes: ['Name', 1, 1],
              headersWidth: [30, 30, 40],
              selectedId: null
            }
          },
          designationAdd: {
            element: document.querySelector('#alchemy-designation-add'),
            mode: 'add',
            heading: document.querySelector('#alchemy-designation-add h1'),
            designationAddForm: { element: document.querySelector('#alchemy-designation-add__form') },
            designationName: {
              element: document.querySelector('#alchemy-designation-add__designation-name'),
              input: document.querySelector('#alchemy-designation-add__designation-name input')
            },
            designationHours: {
              element: document.querySelector('#alchemy-designation-add__designation-hours'),
              input: document.querySelector('#alchemy-designation-add__designation-hours input')
            },
            designationProgramme: {
              element: document.querySelector('#alchemy-designation-add__designation-programme')
            },
            designationAddButton: {
              element: document.querySelector('#alchemy-designation-add__add-button')
            },
            designationResetButton: {
              element: document.querySelector('#alchemy-designation-add__reset-button')
            },
            designationViewButton: {
              element: document.querySelector('#alchemy-designation-add__view-button')
            }
          }
        };

        setupDesignationView();
        setupDesignationAdd();

        function setupDesignationView() {
          const { designationTable } = alchemyDesignationSection.designationView;

          setupDesignationTable();
          setupEvents();

          function setupDesignationTable() {
            const { designationEditButton, designationDeleteButton } =
              alchemyDesignationSection.designationView;

            designationTable.deselectDesignation = () => {
              const selectedDesignation = designationTable.element.querySelectorAll('tr.selected');
              designationEditButton.element.setAttribute('disabled', '');
              designationDeleteButton.element.setAttribute('disabled', '');
              Array.prototype.forEach.call(
                selectedDesignation,
                item => (item.classList.remove('selected'))
              );
              designationTable.selectedId = null;
            };

            designationTable.refresh = () => {
              designationTable.deselectDesignation();
              alchemy.designation.all((data) => {
                const transformedData = Designation.transform(data, 'table');
                designationTable.mdcDataTableHelper
                  .setData(transformedData);
                if (!designationTable.element.querySelector('td')) {
                  designationTable.element.classList.add('alchemy-designation-table--empty');
                } else {
                  designationTable.element.classList.remove('alchemy-designation-table--empty');
                }
              });
            };

            const { headers, headersDataTypes, headersWidth } = designationTable;
            designationTable.mdcDataTableHelper =
              MDCDataTableHelper
                .handle(designationTable.element)
                .setIdKey('id')
                .setHeaders(headers, headersDataTypes, headersWidth);
            designationTable.refresh();

            designationDeleteButton.element.addEventListener('click', () => {
              if (!designationDeleteButton.element.hasAttribute('disabled')) {
                alchemy.designation.delete(
                  designationTable.selectedId,
                  onDesignationDeleteSuccess,
                  onDesignationDeleteFail
                );
              }
            });
          }

          function onDesignationDeleteSuccess(deletedDesignation) {
            const message = 'Designation deleted successfully.';
            const extra = Designation.transform(deletedDesignation, 'short-info');
            designationTable.refresh();
            alchemyCommon.toast({ message }, extra);
          }

          function onDesignationDeleteFail(error) {
            if (typeof error.json !== 'function') {
              console.error(error);
            } else {
              error.json().then((body) => {
                alchemyCommon.dialog.info({
                  header: `Error ${error.status}: ${error.statusText}`,
                  body: arrayToHtml(Object.values(body)),
                  accept: 'Okay'
                }).show();
              });
            }
          }

          function setupEvents() {
            const {
              designationAddButton,
              designationEditButton,
              designationDeleteButton
            } = alchemyDesignationSection.designationView;

            designationTable.element.addEventListener('click', (mouseEvent) => {
              mouseEvent.stopPropagation();
              designationTable.deselectDesignation();
              const { target } = mouseEvent;
              if (target.tagName !== 'TD') { return; }
              const selectedDesignation = target.parentNode;
              designationTable.selectedId = selectedDesignation.getAttribute('data-id');
              selectedDesignation.classList.add('selected');
              designationEditButton.element.removeAttribute('disabled');
              designationDeleteButton.element.removeAttribute('disabled');
              window.addEventListener(
                'click',
                blurSelection(
                  [
                    selectedDesignation,
                    designationEditButton.element,
                    designationDeleteButton.element],
                  designationTable.deselectDesignation
                )
              );
            });

            const { designationAdd } = alchemyDesignationSection;

            designationAddButton.element.addEventListener('click', () => {
              scrollTo(designationAdd.element);
              designationAdd.switchMode.add();
            });

            designationEditButton.element.addEventListener('click', () => {
              scrollTo(designationAdd.element);
              designationAdd.switchMode.edit(designationTable.selectedId);
            });
          }
        }

        function setupDesignationAdd() {
          const { designationAdd } = alchemyDesignationSection;
          const {
            designationAddForm,
            designationName,
            designationHours,
            designationProgramme,
            designationAddButton,
            designationResetButton,
            designationViewButton
          } = designationAdd;

          designationHours.mdc = mdc.textField.MDCTextField.attachTo(designationHours.element);
          designationName.mdc = mdc.textField.MDCTextField.attachTo(designationName.element);

          designationAdd.switchMode = {
            add: () => {
              designationAdd.editMode = false;
              designationAdd.heading.innerText = 'Add Designation';
              designationAddButton.element.innerText = 'ADD DESIGNATION';
              delete designationAdd.editItemId;
            },
            edit: (id) => {
              designationAdd.editMode = true;
              designationAdd.heading.innerText = 'Edit Designation';
              designationAddButton.element.innerText = 'UPDATE DESIGNATION';

              alchemy.designation.get(id, onDesignationGetSuccess, onDesignationGetFail);

              function onDesignationGetSuccess(designation) {
                designationAdd.heading.innerText += ` (ID: ${designation.id})`;
                designationAdd.editItemId = designation.id;
                setTextFieldInput(designationName, designation.name);
                setTextFieldInput(designationHours, designation.hours);
                designationProgramme.mdcSelectHandler.setSelected(designation.programme_id);
              }

              function onDesignationGetFail(error) {
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

          setupDesignationProgramme();

          designationViewButton.element.addEventListener('click', () => {
            scrollTo(alchemyDesignationSection.designationView.element);
          });

          designationAddButton.element.addEventListener('click', () => {
            const programme = getSelectedProgramme();

            const isFormValid = designationAddForm.element.checkValidity() && programme !== false;
            if (!isFormValid) {
              const message = 'Please fill out the form properly.';
              alchemyCommon.toast({ message });
              return false;
            }

            const designation = {
              name: designationName.mdc.input_.value,
              hours: designationHours.mdc.input_.value,
              programme_id: Number(programme.id)
            };

            const { editMode } = designationAdd;
            if (editMode) {
              designation.id = designationAdd.editItemId;
              alchemy.designation.update(
                designation.id,
                JSON.stringify(designation),
                onDesignationUpdateSuccess,
                onDesignationAddFail
              );
            } else {
              alchemy.designation.add(
                JSON.stringify(designation), onDesignationAddSuccess,
                onDesignationAddFail
              );
            }
            return true;
          });

          designationResetButton.element.addEventListener('click', () => {
            designationProgramme.mdcSelectHandler.clearSelection();
            designationProgramme.mdcSelectHandler.setSelected(alchemy.current.programme.id);
          });

          function onDesignationUpdateSuccess(updatedDesignation) {
            const { designationView } = alchemyDesignationSection;
            const { designationTable } = designationView;
            designationTable.refresh();
            designationAddForm.element.reset();
            designationProgramme.mdcSelectHandler.clearSelection();
            designationAdd.switchMode.add();
            scrollTo(designationView.element);
            const extra = Designation.transform(updatedDesignation, 'short-info');
            const message = 'Designation updated successfully.';

            alchemyCommon.toast({ message }, extra);
          }

          function onDesignationAddSuccess(addedDesignation) {
            const { designationTable } = alchemyDesignationSection.designationView;
            designationTable.refresh();
            designationAddForm.element.reset();
            designationProgramme.mdcSelectHandler.clearSelection();
            const extra = Designation.transform(addedDesignation, 'short-info');
            const message = 'Designation added successfully.';

            alchemyCommon.toast({ message }, extra);
          }

          function onDesignationAddFail(error) {
            if (typeof error.json !== 'function') {
              console.error(error);
            } else {
              error.json().then((body) => {
                alchemyCommon.dialog.info({
                  header: `Error ${error.status}: ${error.statusText}`,
                  body: arrayToHtml(Object.values(body)),
                  accept: 'Okay'
                }).show();
              });
            }
          }

          function setupDesignationProgramme() {
            designationProgramme.mdcSelectHandler =
              MDCSelectHandler
                .handle(designationProgramme.element)
                .clearItems()
                .init('Select Programme', { storeData: true })
                .disable();

            alchemy.programme.all((programme) => {
              designationProgramme.mdcSelectHandler
                .addItems(
                  programme,
                  { assignments: { valueKey: 'name', idKey: 'id' } }
                )
                .enable();
              designationProgramme.mdcSelectHandler.setSelected(alchemy.current.programme.id);
            });
          }

          function getSelectedProgramme() {
            const selectedProgramme = designationProgramme.mdcSelectHandler.getSelected();
            if (selectedProgramme && selectedProgramme.data) {
              return selectedProgramme.data;
            }
            return false;
          }
        }
      }

      function setupDepartmentSection() {
        const alchemyDepartmentSection = {
          element: document.querySelector('#alchemy-department'),
          departmentView: {
            element: document.querySelector('#alchemy-department-view'),
            departmentAddButton: {
              element: document.querySelector('#alchemy-department-view__add-button')
            },
            departmentEditButton: {
              element: document.querySelector('#alchemy-department-view__edit-button')
            },
            departmentDeleteButton: {
              element: document.querySelector('#alchemy-department-view__delete-button')
            },
            departmentTable: {
              element: document.querySelector('#alchemy-department-view__table'),
              table: document.querySelector('#alchemy-department-view__table table'),
              headers: ['Name', 'Alias', 'Programme'],
              headersDataTypes: ['Name', 'Alias', 1],
              headersWidth: [30, 30, 40],
              selectedId: null
            }
          },
          departmentAdd: {
            element: document.querySelector('#alchemy-department-add'),
            mode: 'add',
            heading: document.querySelector('#alchemy-department-add h1'),
            departmentAddForm: { element: document.querySelector('#alchemy-department-add__form') },
            departmentName: {
              element: document.querySelector('#alchemy-department-add__department-name'),
              input: document.querySelector('#alchemy-department-add__department-name input')
            },
            departmentAlias: {
              element: document.querySelector('#alchemy-department-add__department-alias'),
              input: document.querySelector('#alchemy-department-add__department-alias input')
            },
            departmentProgramme: {
              element: document.querySelector('#alchemy-department-add__department-programme')
            },
            departmentAddButton: {
              element: document.querySelector('#alchemy-department-add__add-button')
            },
            departmentResetButton: {
              element: document.querySelector('#alchemy-department-add__reset-button')
            },
            departmentViewButton: {
              element: document.querySelector('#alchemy-department-add__view-button')
            }
          }
        };

        setupDepartmentView();
        setupDepartmentAdd();

        function setupDepartmentView() {
          const { departmentTable } = alchemyDepartmentSection.departmentView;

          setupDepartmentTable();
          setupEvents();

          function setupDepartmentTable() {
            const { departmentEditButton, departmentDeleteButton } =
              alchemyDepartmentSection.departmentView;

            departmentTable.deselectDepartment = () => {
              const selectedDepartment = departmentTable.element.querySelectorAll('tr.selected');
              departmentEditButton.element.setAttribute('disabled', '');
              departmentDeleteButton.element.setAttribute('disabled', '');
              Array.prototype.forEach.call(
                selectedDepartment,
                item => (item.classList.remove('selected'))
              );
              departmentTable.selectedId = null;
            };

            departmentTable.refresh = () => {
              departmentTable.deselectDepartment();
              alchemy.department.all((data) => {
                const transformedData = Department.transform(data, 'table');
                departmentTable.mdcDataTableHelper
                  .setData(transformedData);
                if (!departmentTable.element.querySelector('td')) {
                  departmentTable.element.classList.add('alchemy-department-table--empty');
                } else {
                  departmentTable.element.classList.remove('alchemy-department-table--empty');
                }
              });
            };

            const { headers, headersDataTypes, headersWidth } = departmentTable;
            departmentTable.mdcDataTableHelper =
              MDCDataTableHelper
                .handle(departmentTable.element)
                .setIdKey('id')
                .setHeaders(headers, headersDataTypes, headersWidth);
            departmentTable.refresh();

            departmentDeleteButton.element.addEventListener('click', () => {
              if (!departmentDeleteButton.element.hasAttribute('disabled')) {
                alchemy.department.delete(
                  departmentTable.selectedId,
                  onDepartmentDeleteSuccess,
                  onDepartmentDeleteFail
                );
              }
            });
          }

          function onDepartmentDeleteSuccess(deletedDepartment) {
            const message = 'Department deleted successfully.';
            const extra = Department.transform(deletedDepartment, 'short-info');
            departmentTable.refresh();
            alchemyCommon.toast({ message }, extra);
          }

          function onDepartmentDeleteFail(error) {
            if (typeof error.json !== 'function') {
              console.error(error);
            } else {
              error.json().then((body) => {
                alchemyCommon.dialog.info({
                  header: `Error ${error.status}: ${error.statusText}`,
                  body: arrayToHtml(Object.values(body)),
                  accept: 'Okay'
                }).show();
              });
            }
          }

          function setupEvents() {
            const {
              departmentAddButton,
              departmentEditButton,
              departmentDeleteButton
            } = alchemyDepartmentSection.departmentView;

            departmentTable.element.addEventListener('click', (mouseEvent) => {
              mouseEvent.stopPropagation();
              departmentTable.deselectDepartment();
              const { target } = mouseEvent;
              if (target.tagName !== 'TD') { return; }
              const selectedDepartment = target.parentNode;
              departmentTable.selectedId = selectedDepartment.getAttribute('data-id');
              selectedDepartment.classList.add('selected');
              departmentEditButton.element.removeAttribute('disabled');
              departmentDeleteButton.element.removeAttribute('disabled');
              window.addEventListener(
                'click',
                blurSelection(
                  [
                    selectedDepartment,
                    departmentEditButton.element,
                    departmentDeleteButton.element],
                  departmentTable.deselectDepartment
                )
              );
            });

            const { departmentAdd } = alchemyDepartmentSection;

            departmentAddButton.element.addEventListener('click', () => {
              scrollTo(departmentAdd.element);
              departmentAdd.switchMode.add();
            });

            departmentEditButton.element.addEventListener('click', () => {
              scrollTo(departmentAdd.element);
              departmentAdd.switchMode.edit(departmentTable.selectedId);
            });
          }
        }

        function setupDepartmentAdd() {
          const { departmentAdd } = alchemyDepartmentSection;
          const {
            departmentAddForm,
            departmentName,
            departmentAlias,
            departmentProgramme,
            departmentAddButton,
            departmentResetButton,
            departmentViewButton
          } = departmentAdd;

          departmentAlias.mdc = mdc.textField.MDCTextField.attachTo(departmentAlias.element);
          departmentName.mdc = mdc.textField.MDCTextField.attachTo(departmentName.element);

          departmentAdd.switchMode = {
            add: () => {
              departmentAdd.editMode = false;
              departmentAdd.heading.innerText = 'Add Department';
              departmentAddButton.element.innerText = 'ADD DEPARTMENT';
              delete departmentAdd.editItemId;
            },
            edit: (id) => {
              departmentAdd.editMode = true;
              departmentAdd.heading.innerText = 'Edit Department';
              departmentAddButton.element.innerText = 'UPDATE DEPARTMENT';

              alchemy.department.get(id, onDepartmentGetSuccess, onDepartmentGetFail);

              function onDepartmentGetSuccess(department) {
                departmentAdd.heading.innerText += ` (ID: ${department.id})`;
                departmentAdd.editItemId = department.id;
                setTextFieldInput(departmentName, department.name);
                setTextFieldInput(departmentAlias, department.alias);
                departmentProgramme.mdcSelectHandler.setSelected(department.programme_id);
              }

              function onDepartmentGetFail(error) {
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

          setupDepartmentProgramme();

          departmentViewButton.element.addEventListener('click', () => {
            scrollTo(alchemyDepartmentSection.departmentView.element);
          });

          departmentAddButton.element.addEventListener('click', () => {
            const programme = getSelectedProgramme();
            const isFormValid = departmentAddForm.element.checkValidity() && programme !== false;
            if (!isFormValid) {
              const message = 'Please fill out the form properly.';
              alchemyCommon.toast({ message });
              return false;
            }

            const department = {
              name: departmentName.mdc.input_.value,
              alias: departmentAlias.mdc.input_.value,
              programme_id: Number(programme.id)
            };

            const { editMode } = departmentAdd;
            if (editMode) {
              department.id = departmentAdd.editItemId;
              alchemy.department.update(
                department.id,
                JSON.stringify(department),
                onDepartmentUpdateSuccess,
                onDepartmentAddFail
              );
            } else {
              alchemy.department.add(
                JSON.stringify(department), onDepartmentAddSuccess,
                onDepartmentAddFail
              );
            }
            return true;
          });

          departmentResetButton.element.addEventListener('click', () => {
            departmentProgramme.mdcSelectHandler.clearSelection();
            departmentProgramme.mdcSelectHandler.setSelected(alchemy.current.programme.id);
          });

          function onDepartmentUpdateSuccess(updatedDepartment) {
            const { departmentView } = alchemyDepartmentSection;
            const { departmentTable } = departmentView;
            departmentTable.refresh();
            departmentAddForm.element.reset();
            departmentProgramme.mdcSelectHandler.clearSelection();
            departmentAdd.switchMode.add();
            scrollTo(departmentView.element);
            const extra = Department.transform(updatedDepartment, 'short-info');
            const message = 'Department updated successfully.';
            alchemyCommon.toast({ message }, extra);
          }

          function onDepartmentAddSuccess(addedDepartment) {
            const { departmentTable } = alchemyDepartmentSection.departmentView;
            departmentTable.refresh();
            departmentAddForm.element.reset();
            departmentProgramme.mdcSelectHandler.clearSelection();
            const extra = Department.transform(addedDepartment, 'short-info');
            const message = 'Department added successfully.';

            alchemyCommon.toast({ message }, extra);
          }

          function onDepartmentAddFail(error) {
            if (typeof error.json !== 'function') {
              console.error(error);
            } else {
              error.json().then((body) => {
                alchemyCommon.dialog.info({
                  header: `Error ${error.status}: ${error.statusText}`,
                  body: arrayToHtml(Object.values(body)),
                  accept: 'Okay'
                }).show();
              });
            }
          }

          function setupDepartmentProgramme() {
            departmentProgramme.mdcSelectHandler =
              MDCSelectHandler
                .handle(departmentProgramme.element)
                .clearItems()
                .init('Select Programme', { storeData: true, onChange: console.log })
                .disable();
            alchemy.programme.all((programme) => {
              departmentProgramme.mdcSelectHandler
                .addItems(
                  programme,
                  { assignments: { valueKey: 'name', idKey: 'id' } }
                )
                .enable();
            });
          }

          function getSelectedProgramme() {
            const selectedProgramme = departmentProgramme.mdcSelectHandler.getSelected();
            if (selectedProgramme && selectedProgramme.data) {
              return selectedProgramme.data;
            }
            return false;
          }
        }
      }
    },
    onFail: (error) => {
      Logger.error('Alchemy has crashed due to API communication issues.', error);
    }
  });
}
