import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui-old/AutoComplete/AutoComplete';

import ChipInput from './ChipInput';
import theme from '../utils/theme';

const styles = {
  floatingLabelFocusStyle: {
    color: theme.legacyPalette.primary2Color,
  },
  underlineStyle: {
    color: theme.legacyPalette.primary2Color,
    borderColor: theme.legacyPalette.primary2Color,
  },
  hintStyle: {
    color: theme.legacyPalette.hintColor,
  },
};

export default class ChipInputWrapper extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    input: PropTypes.object.isRequired,
  };

  onRequestAdd = (addedChip, input) => {
    const chip = addedChip.trim(); // get rid of extra spaces

    let values = input.value || [];
    values = values.slice();

    // check for duplicates, ignore case
    if (!values.map(value => value.toLowerCase()).includes(chip.toLowerCase())) {
      values.push(chip);
    }
    input.onChange(values);
  };

  onRequestDelete = (deletedChip, input) => {
    let values = input.value || [];
    values = values.filter(v => v !== deletedChip);
    input.onChange(values);
  };

  render() {
    const { input, ...rest } = this.props;

    return (
      <ChipInput

        {...input}
        value={input.value || []}
        onRequestAdd={addedChip => this.onRequestAdd(addedChip, input)}
        onRequestDelete={deletedChip => this.onRequestDelete(deletedChip, input)}
        onBlur={(e) => {
          if (e.target.value) {
            this.onRequestAdd(e.target.value, input);
          }
          input.onBlur();
        }}
        clearOnBlur
        newChipKeyCodes={[
          /* return */
          13,
          /* comma */
          188,
        ]}
        filter={AutoComplete.fuzzyFilter} // Autocomplete
        maxSearchResults={5} // Autocomplete (number of suggestions shown)
        openOnFocus
        hintStyle={styles.hintStyle}
        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        underlineFocusStyle={styles.underlineStyle}
        floatingLabelFixed
        className="formcontainer"
        fullWidth
        {...rest}
      />
    );
  }
}
