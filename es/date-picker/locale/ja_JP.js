import _extends from "@babel/runtime/helpers/esm/extends";
import CalendarLocale from '../../vc-calendar/src/locale/ja_JP';
import TimePickerLocale from '../../time-picker/locale/ja_JP';
var locale = {
  lang: _extends({
    placeholder: '日付を選択',
    rangePlaceholder: ['開始日付', '終了日付']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/vueComponent/ant-design-vue/blob/master/components/date-picker/locale/example.json

export default locale;