import { useState } from 'react';
import moment from 'moment';
import * as chrono from 'chrono-node';
import Select, { components as SelectComponents, } from 'react-select';
const createOptionForDate = (d) => {
    const date = moment.isMoment(d) ? d : moment(d);
    return {
        date,
        value: date.toDate(),
        label: date.calendar(null, {
            sameDay: '[Today] (Do MMM YYYY)',
            nextDay: '[Tomorrow] (Do MMM YYYY)',
            nextWeek: '[Next] dddd (Do MMM YYYY)',
            lastDay: '[Yesterday] (Do MMM YYYY)',
            lastWeek: '[Last] dddd (Do MMM YYYY)',
            sameElse: 'Do MMMM YYYY',
        }),
    };
};
const defaultOptions = [
    'today',
    'tomorrow',
    'yesterday',
].map((i) => createOptionForDate(chrono.parseDate(i)));
const createCalendarOptions = (date = new Date()) => {
    const daysInMonth = Array.apply(null, Array(moment(date).daysInMonth())).map((x, i) => {
        const d = moment(date).date(i + 1);
        return Object.assign(Object.assign({}, createOptionForDate(d)), { display: 'calendar' });
    });
    return {
        label: moment(date).format('MMMM YYYY'),
        options: daysInMonth,
    };
};
defaultOptions.push(createCalendarOptions());
const suggestions = [
    'sunday',
    'saturday',
    'friday',
    'thursday',
    'wednesday',
    'tuesday',
    'monday',
    'december',
    'november',
    'october',
    'september',
    'august',
    'july',
    'june',
    'may',
    'april',
    'march',
    'february',
    'january',
    'yesterday',
    'tomorrow',
    'today',
].reduce((acc, str) => {
    for (let i = 1; i < str.length; i++) {
        acc[str.substr(0, i)] = str;
    }
    return acc;
}, {});
const suggest = (str) => str
    .split(/\b/)
    .map((i) => suggestions[i] || i)
    .join('');
const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const daysHeaderStyles = {
    marginTop: '5px',
    paddingTop: '5px',
    paddingLeft: '2%',
    borderTop: '1px solid #eee',
};
const daysHeaderItemStyles = {
    color: '#999',
    cursor: 'default',
    fontSize: '75%',
    fontWeight: 500,
    display: 'inline-block',
    width: '12%',
    margin: '0 1%',
    textAlign: 'center',
};
const daysContainerStyles = {
    paddingTop: '5px',
    paddingLeft: '2%',
};
const Group = (props) => {
    const { Heading, getStyles, getClassNames, children, label, headingProps, cx, theme, selectProps, } = props;
    return (React.createElement("div", { "aria-label": label, css: getStyles('group', props) },
        React.createElement(Heading, Object.assign({ selectProps: selectProps, theme: theme, getStyles: getStyles, getClassNames: getClassNames, cx: cx }, headingProps), label),
        React.createElement("div", { css: daysHeaderStyles }, days.map((day, i) => (React.createElement("span", { key: `${i}-${day}`, css: daysHeaderItemStyles }, day)))),
        React.createElement("div", { css: daysContainerStyles }, children)));
};
const getOptionStyles = (defaultStyles) => (Object.assign(Object.assign({}, defaultStyles), { display: 'inline-block', width: '12%', margin: '0 1%', textAlign: 'center', borderRadius: '4px' }));
const Option = (props) => {
    const { data, getStyles, innerRef, innerProps } = props;
    if (data.display === 'calendar') {
        const defaultStyles = getStyles('option', props);
        const styles = getOptionStyles(defaultStyles);
        if (data.date.date() === 1) {
            const indentBy = data.date.day();
            if (indentBy) {
                styles.marginLeft = `${indentBy * 14 + 1}%`;
            }
        }
        return (React.createElement("span", Object.assign({}, innerProps, { css: styles, ref: innerRef }), data.date.format('D')));
    }
    else
        return React.createElement(SelectComponents.Option, Object.assign({}, props));
};
const DatePicker = (props) => {
    const [options, setOptions] = useState(defaultOptions);
    const handleInputChange = (value) => {
        if (!value) {
            setOptions(defaultOptions);
            return;
        }
        const date = chrono.parseDate(suggest(value.toLowerCase()));
        if (!date) {
            setOptions([]);
            return;
        }
        setOptions([createOptionForDate(date), createCalendarOptions(date)]);
    };
    return (React.createElement(Select, Object.assign({}, props, { components: { Group, Option }, filterOption: null, isMulti: false, isOptionSelected: (o, v) => v.some((i) => i.date.isSame(o.date, 'day')), maxMenuHeight: 380, onChange: props.onChange, onInputChange: handleInputChange, options: options, value: props.value })));
};
export default () => {
    const [value, setValue] = useState(defaultOptions[0]);
    return (React.createElement(DatePicker, { value: value, onChange: (newValue) => setValue(newValue) }));
};

