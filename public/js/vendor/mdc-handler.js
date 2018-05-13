/* eslint-disable no-restricted-globals,no-undef,no-unused-vars,prefer-template,no-underscore-dangle */
class MDCSelectHandler {
  constructor(mdcSelect) {
    if (!mdcSelect) { return; }
    this.mdcSelect = mdcSelect;
  }

  static handle(mdcSelect) {
    return new MDCSelectHandler(mdcSelect);
  }

  init(label, options = {}) {
    this.select = mdc.selects.MDCSelects.attachTo(this.mdcSelect);
    this.setLabel(label);
    if (typeof options.onChange === 'function') {
      this.setOnChangeListener(options.onChange);
    }
    if (typeof options.extra === 'function') {
      options.extra(this.mdcSelect);
    }
    if (options.storeData) {
      this.hasStorageData = true;
      this.storageData = [];
    }
    return this;
  }

  setOnChangeListener(f) {
    this.select.listen('MDCSelects:change', f);
    return this;
  }

  getSelected() {
    const selectedOption = this.select.selectedOptions[0];
    const selectedOptionData = {
      index: this.select.selectedIndex,
      value: this.select.value,
      item: selectedOption
    };
    if (this.hasStorageData) {
      selectedOptionData.data = this.storageData[this.select.selectedIndex];
    }
    return selectedOptionData;
  }

  setSelected(id) {
    const items = Array.from(this.mdcSelect.querySelectorAll('li'));
    if (items.length > 0) {
      const matchingItemIndex = items.findIndex(item => (+item.getAttribute('data-store-index') === id));
      if (matchingItemIndex > -1) {
        this.select.selectedIndex = matchingItemIndex;
        this.floatLabelAbove();
      }
    }
  }

  clearSelection() {
    const items = Array.from(this.mdcSelect.querySelectorAll('li'));
    if (items.length > 0) {
      items.forEach((item) => {
        item.removeAttribute('aria-selected');
      });
    }
    this.floatLabelAbove(true); // remove floating label
  }

  floatLabelAbove(remove) {
    const mdcLabel = this.mdcSelect.querySelector('.mdc-select__label');
    if (mdcLabel) {
      if (remove) {
        mdcLabel.classList.remove('mdc-select__label--float-above');
        const selectedText = this.mdcSelect.querySelector('.mdc-select__selected-text');
        if (selectedText) {
          selectedText.innerText = '';
        }
      } else {
        mdcLabel.classList.add('mdc-select__label--float-above');
      }
    }
  }

  setLabel(label) {
    if (!label) { return; }
    this.mdcSelect.querySelector('.mdc-select__label').innerText = label;
    return this;
  }

  enable(extra) {
    if (typeof extra === 'function') {
      extra(this.mdcSelect);
    }
    this.mdcSelect.removeAttribute('aria-disabled');
    return this;
  }

  disable(extra) {
    if (typeof extra === 'function') {
      extra(this.mdcSelect);
    }
    this.mdcSelect.setAttribute('aria-disabled', 'true');
    return this;
  }

  addItems(items, options) {
    if (!Array.isArray(items)) { return; }

    items.forEach((item, index) => { this.addItem(item, Object.assign({}, options, { index })); });
    return this;
  }

  addItem(item, options) {
    const defaultOptions = {
      idAttribute: 'data-store-index'
    };
    options = Object.assign({}, defaultOptions, options);

    const mdcList = this.mdcSelect.querySelector('.mdc-select__menu .mdc-menu__items');
    let mdcListItem = document.createElement('li');
    if (options.assignments) {
      mdcListItem.innerText = item[options.assignments.valueKey];
      if (options.assignments.idKey) {
        mdcListItem.setAttribute(options.idAttribute, item[options.assignments.idKey]);
      }
      this.itemProps = Object.assign({}, this.itemProps, options.assignments);
    } else {
      mdcListItem.innerText = item;
    }
    mdcListItem.setAttribute('tab-index', options.index);
    mdcListItem.classList.add('mdc-list-item');
    mdcListItem.setAttribute('role', 'option');
    mdcListItem.setAttribute('tab-index', '0');
    if (options.attributes) {
      Object.keys(options.attributes)
        .forEach((key) => { mdcListItem.setAttribute(key, options.attributes[key]); });
    }
    if (options.isSelected) {
      mdcListItem.setAttribute('aria-selected', 'true');
    }
    if (options.isDisabled) {
      mdcListItem.setAttribute('tab-index', '-1');
      mdcListItem.setAttribute('aria-disabled', 'true');
    } else {
      mdcListItem.setAttribute('tab-index', '0');
    }
    if (typeof options.extra === 'function') {
      mdcListItem = options.extra(mdcListItem);
    }
    mdcList.appendChild(mdcListItem);
    if (this.hasStorageData) {
      this.storageData[options.index] = (item);
    }
    return this;
  }

  clearItems() {
    const mdcList = this.mdcSelect.querySelector('.mdc-select__menu .mdc-menu__items');
    if (!mdcList) { return; }
    while (mdcList.firstChild) {
      mdcList.removeChild(mdcList.firstChild);
    }
    this.mdcSelect.querySelector('.mdc-select__selected-text').innerText = '';
    const selectLabel = this.mdcSelect.querySelector('.mdc-select__label--float-above');
    if (selectLabel) {
      selectLabel.classList.remove('mdc-select__label--float-above');
    }
    return this;
  }
}

class MDCDataTableHelper {
  constructor(mdcDataTable) {
    if (!mdcDataTable) { return; }
    this.mdcDataTable = mdcDataTable;
    this.tableHeader = mdcDataTable.querySelector('thead');
    this.tableBody = mdcDataTable.querySelector('tbody');
    this.idKey = false;
  }

  static handle(mdcDataTable) {
    return new MDCDataTableHelper(mdcDataTable);
  }

  setIdKey(idKey) {
    this.idKey = idKey;
    return this;
  }

  setHeaders(headers, dataTypes, widths) {
    if (!Array.isArray(headers)) {
      return;
    }
    const { tableHeader } = this;
    while (tableHeader.firstChild) {
      tableHeader.removeChild(tableHeader.firstChild);
    }

    const trElement = document.createElement('tr');
    headers.forEach((header, index) => {
      if (header === this.idKey) {
        return;
      }
      const thElement = document.createElement('th');
      thElement.innerText = header;
      if (dataTypes) {
        const isNumeric = !isNaN(dataTypes[index]);
        if (isNumeric) {
          thElement.classList.add('mdc-data-table--numeric');
        }
        thElement.classList.add('mdc-data-table--sortable');
      }
      if (widths) {
        const width = widths[index];
        if (!isNaN(width)) {
          thElement.style.width = `${width}%`;
        }
      }
      trElement.appendChild(thElement);
    });
    tableHeader.appendChild(trElement);
    return this;
  }

  setData(data) {
    if (!Array.isArray(data)) {
      return;
    }
    this.clearData();
    const { tableBody, idKey } = this;
    data.forEach((row) => {
      const trElement = document.createElement('tr');
      if (row.hasOwnProperty(idKey)) {
        trElement.setAttribute('data-id', row[idKey]);
      }
      Object.values(row).forEach((tuple, index) => {
        if (this.idKey && index < 1) {
          return;
        }
        const isNumericData = !isNaN(tuple);
        const tdElement = document.createElement('td');
        if (isNumericData) {
          tdElement.classList.add('mdc-data-table--numeric');
        }
        tdElement.innerHTML = tuple;
        trElement.appendChild(tdElement);
      });
      tableBody.appendChild(trElement);
    });
    return this;
  }

  clearData() {
    const { tableBody } = this;
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
    return this;
  }
}

class MDCExpansionPanelHelper {
  static handle(element) {
    return mdc.expansionPanel.MDCExpansionPanel.attachTo(element);
  }

  static init(items) {
    if (items instanceof Array) {
      return items.map(item => MDCExpansionPanelHelper.handle(item));
    }
    if (items instanceof NodeList) {
      return Array.from(items).map(item => MDCExpansionPanelHelper.handle(item));
    }
    return MDCExpansionPanelHelper.handle(items);
  }
}

class MDCExpansionPanelAccordionHelper {
  static handle(element) {
    console.log('accordian', element);
    return mdc.expansionPanel.MDCExpansionPanelAccordion.attachTo(element);
  }

  static init(items) {
    if (items instanceof Array) {
      return items.map(item => MDCExpansionPanelAccordionHelper.handle(item));
    }
    if (items instanceof NodeList) {
      return Array.from(items).map(item => MDCExpansionPanelAccordionHelper.handle(item));
    }
    return MDCExpansionPanelAccordionHelper.handle(items);
  }
}

class AutoCompleteComponent {
  constructor(element, itemToHTML, dataRetriever) {
    this.textField = element.mdc.input_;
    this.menu = element.menu.element;
    this.clearSelectionButton = element.clearSelectionButton;
    this.list = this.menu.querySelector('ul');

    if (!this.textField) throw new Error('TextField is null.');
    if (!this.menu) throw new Error('Menu is null.');
    if (!this.clearSelectionButton) throw new Error('ClearSelectionButton is null.');
    if (!this.list) throw new Error('List is null.');

    //
    if (!this.list) throw new Error('Cannot find ul element.');
    this.dataRetriever = dataRetriever;
    this.itemToHTML = itemToHTML;
    this.storage = null;
    this.selected = null;
    this.focusedItemIndex = null;
    this.onSelect = console.log;
    this.getFilter = _ => (__ => __);
    //

    this.textField.addEventListener('blur', e => this.onBlur(e));
    this.textField.addEventListener('keydown', e => this.keyDown(e));
    this.textField.addEventListener('input', e => this.onInput(e));
    this.menu.addEventListener('click', e => this.onMenuClick(e));
    this.clearSelectionButton.addEventListener('click', e => this.onClear(e));
  }

  static attachTo() {
    // eslint-disable-next-line prefer-rest-params
    return new AutoCompleteComponent(...arguments);
  }

  setList(list) {
    if (!list) throw new Error('List is null.');
    this.list.innerHTML = '';
    this.storage = [];
    const dataFilter = this.getFilter();
    list.filter(dataFilter).forEach((item, i) => {
      const listItem = this.itemToHTML(item);
      listItem.setAttribute('data-store-index', i);
      this.list.appendChild(listItem);
      this.storage[i] = { data: item, item: listItem };
    });
    this.clearSelected();
    this.setFocus(0);
  }

  onClear(e) {
    this.clearSelected(e);
    this.textField.value = '';
    this.textField.focus();
  }

  openMenu() {
    this.fitMenu();
    this.menu.classList.add('mdc-menu--open');
  }

  hideMenu() {
    this.menu.classList.remove('mdc-menu--open');
  }

  fitMenu() {
    const bounds = this.textField.getBoundingClientRect();
    this.menu.style.top = bounds.top + bounds.height + 'px';
    this.menu.style.left = bounds.left + 'px';
    this.menu.style.width = bounds.width + 'px';
  }

  old_keyDown(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') { // typing one letter
        if (this.textField.value.length > 1) {
          this.dataRetriever(this.textField.value, list => this.setList(list));
          this.openMenu();
        } else {
          this.hideMenu();
        }
      } else { // navigation
        switch (e.key) {
          case 'ArrowDown':
            this.focusNext();
            break;
          case 'ArrowUp':
            this.focusPrev();
            break;
          case 'Enter':
            this.setSelected(this.focusedItemIndex);
            this.onBlur();
            break;
          default:
            break;
        }
      }
    }
  }

  keyDown(e) {
    if (e instanceof KeyboardEvent) {
      switch (e.key) {
        case 'ArrowDown':
          this.focusNext();
          break;
        case 'ArrowUp':
          this.focusPrev();
          break;
        case 'Enter':
          this.setSelected(this.focusedItemIndex);
          this.onBlur();
          break;
        default:
          break;
      }
    }
  }

  onInput(e) {
    if (this.textField.value.length > 0) {
      this.dataRetriever(this.textField.value, list => this.setList(list));
      this.openMenu();
    } else {
      this.hideMenu();
    }
  }

  getSelected() {
    return this.selected;
  }

  setSelected(storageIndex) {
    if (typeof storageIndex === 'object') {
      this.storage = [storageIndex];
      this.setSelected(0);
      return;
    }
    if (storageIndex === null) {
      this.clearSelected();
      return;
    }
    this.selected = this.storage[storageIndex];
    this.onSelect(this.selected);
    this.clearSelectionButton.classList.add('alchemy-select__cancel--visible');
    this.textField.blur();
  }

  clearSelected() {
    this.selected = null;
    this.clearSelectionButton.classList.remove('alchemy-select__cancel--visible');
  }

  onBlur() {
    if (this.selected === null) {
      this.textField.value = '';
      this.textField.blur();
    }
    setTimeout(() => this.hideMenu(), 250);
  }

  setFocus(itemIndex) {
    const item = this.storage[itemIndex];
    this.clearFocus();
    if (!item || !item.item) {
      return;
    }
    this.focusedItemIndex = itemIndex;
    item.item.classList.add('focused');
  }

  clearFocus() {
    const focusedItem = this.menu.querySelector('.focused');
    if (focusedItem) {
      focusedItem.classList.remove('focused');
    }
    this.focusedItemIndex = null;
  }

  focusNext() {
    if (this.focusedItemIndex === null) {
      this.setFocus(0);
    } else {
      this.setFocus((this.focusedItemIndex + 1) % this.storage.length);
    }
  }

  focusPrev() {
    if (this.focusedItemIndex === null) {
      this.setFocus(0); // focus first item
    } else if (this.focusedItemIndex === 0) { // if first item
      this.setFocus(this.storage.length - 1); // focus last item
    } else {
      this.setFocus(this.focusedItemIndex - 1); // focus previous item
    }
  }

  onMenuClick(e) {
    const target = assertPath(e, 'mdc-list-item');
    if (!target) return;
    const storageIndex = target.getAttribute('data-store-index');
    if (storageIndex === null) throw new Error('Storage index is null', storageIndex);
    this.setSelected(storageIndex);
    this.onBlur();
    if (typeof this.onSelect === 'function') {
      this.onSelect();
    }
    return this.selected;
  }

  setOnSelectionChange(onSelect) {
    this.onSelect = onSelect;
    return this;
  }

  setDataFilter(getFilterFunction) {
    this.getFilter = getFilterFunction;
    return this;
  }
}
