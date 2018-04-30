/* eslint-disable no-restricted-globals,no-undef,no-unused-vars */
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
      const matchingItemIndex = items.findIndex(item => (+item.getAttribute('data-id') === id));
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
      idAttribute: 'data-id'
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
        tdElement.innerText = tuple;
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
