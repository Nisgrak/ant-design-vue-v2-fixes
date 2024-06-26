import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from '../../vc-calendar/src/locale/sr_RS';
import TimePickerLocale from '../../time-picker/locale/sr_RS'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Izaberite datum',
    rangePlaceholder: ['Početni datum', 'Krajnji datum']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/vueComponent/ant-design-vue/blob/master/components/date-picker/locale/example.json

export default locale;