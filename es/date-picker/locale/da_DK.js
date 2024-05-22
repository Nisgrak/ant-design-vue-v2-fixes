import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from '../../vc-calendar/src/locale/da_DK';
import TimePickerLocale from '../../time-picker/locale/da_DK'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Vælg dato',
    rangePlaceholder: ['Startdato', 'Slutdato']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/vueComponent/ant-design-vue/blob/master/components/date-picker/locale/example.json

export default locale;