import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from '../../vc-calendar/src/locale/et_EE';
import TimePickerLocale from '../../time-picker/locale/et_EE'; // 统一合并为完整的 Locale

var locale = {
  lang: _extends({
    placeholder: 'Vali kuupäev',
    rangePlaceholder: ['Algus kuupäev', 'Lõpu kuupäev']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/vueComponent/ant-design-vue/blob/master/components/date-picker/locale/example.json

export default locale;