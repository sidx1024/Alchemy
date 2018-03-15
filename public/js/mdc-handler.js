class MDCSelectHandler {
  constructor(mdcSelect) {
    if (!mdcSelect)
      return;
    this.mdcSelect = mdcSelect;
    return this;
  }

  static handle(mdcSelect) {
    return new MDCSelectHandler(mdcSelect);
  }

  init(label, options = {}) {
    this.select = mdc.select.MDCSelect.attachTo(this.mdcSelect);
    console.log(this.select);
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
    this.select.listen('MDCSelect:change', f);
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

  setLabel(label) {
    if (!label)
      return;
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
    if (!Array.isArray(items))
      return;

    items.forEach(
      (item, index) => { this.addItem(item, Object.assign({}, options, {index: index})); });
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
            .map((key) => { mdcListItem.setAttribute(key, options.attributes[key]); });
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
    if (!mdcList)
      return;
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
