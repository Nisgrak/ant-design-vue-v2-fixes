import type { HTMLAttributes } from 'vue';
export interface TypographyProps extends HTMLAttributes {
    prefixCls?: string;
}
interface InternalTypographyProps extends TypographyProps {
    component?: string;
}
declare const Typography: import("vue").DefineComponent<InternalTypographyProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    component?: unknown;
    prefixCls?: unknown;
    innerHTML?: unknown;
    class?: unknown;
    style?: unknown;
    accesskey?: unknown;
    contenteditable?: unknown;
    contextmenu?: unknown;
    dir?: unknown;
    draggable?: unknown;
    hidden?: unknown;
    id?: unknown;
    lang?: unknown;
    placeholder?: unknown;
    spellcheck?: unknown;
    tabindex?: unknown;
    title?: unknown;
    translate?: unknown;
    radiogroup?: unknown;
    role?: unknown;
    about?: unknown;
    datatype?: unknown;
    inlist?: unknown;
    prefix?: unknown;
    property?: unknown;
    resource?: unknown;
    typeof?: unknown;
    vocab?: unknown;
    autocapitalize?: unknown;
    autocorrect?: unknown;
    autocave?: unknown;
    color?: unknown;
    itemprop?: unknown;
    itemscope?: unknown;
    itemtype?: unknown;
    itemid?: unknown;
    itemref?: unknown;
    results?: unknown;
    security?: unknown;
    unselectable?: unknown;
    inputmode?: unknown;
    is?: unknown;
    'aria-activedescendant'?: unknown;
    'aria-atomic'?: unknown;
    'aria-autocomplete'?: unknown;
    'aria-busy'?: unknown;
    'aria-checked'?: unknown;
    'aria-colcount'?: unknown;
    'aria-colindex'?: unknown;
    'aria-colspan'?: unknown;
    'aria-controls'?: unknown;
    'aria-current'?: unknown;
    'aria-describedby'?: unknown;
    'aria-details'?: unknown;
    'aria-disabled'?: unknown;
    'aria-dropeffect'?: unknown;
    'aria-errormessage'?: unknown;
    'aria-expanded'?: unknown;
    'aria-flowto'?: unknown;
    'aria-grabbed'?: unknown;
    'aria-haspopup'?: unknown;
    'aria-hidden'?: unknown;
    'aria-invalid'?: unknown;
    'aria-keyshortcuts'?: unknown;
    'aria-label'?: unknown;
    'aria-labelledby'?: unknown;
    'aria-level'?: unknown;
    'aria-live'?: unknown;
    'aria-modal'?: unknown;
    'aria-multiline'?: unknown;
    'aria-multiselectable'?: unknown;
    'aria-orientation'?: unknown;
    'aria-owns'?: unknown;
    'aria-placeholder'?: unknown;
    'aria-posinset'?: unknown;
    'aria-pressed'?: unknown;
    'aria-readonly'?: unknown;
    'aria-relevant'?: unknown;
    'aria-required'?: unknown;
    'aria-roledescription'?: unknown;
    'aria-rowcount'?: unknown;
    'aria-rowindex'?: unknown;
    'aria-rowspan'?: unknown;
    'aria-selected'?: unknown;
    'aria-setsize'?: unknown;
    'aria-sort'?: unknown;
    'aria-valuemax'?: unknown;
    'aria-valuemin'?: unknown;
    'aria-valuenow'?: unknown;
    'aria-valuetext'?: unknown;
    onCopy?: unknown;
    onCut?: unknown;
    onPaste?: unknown;
    onCompositionend?: unknown;
    onCompositionstart?: unknown;
    onCompositionupdate?: unknown;
    onDrag?: unknown;
    onDragend?: unknown;
    onDragenter?: unknown;
    onDragexit?: unknown;
    onDragleave?: unknown;
    onDragover?: unknown;
    onDragstart?: unknown;
    onDrop?: unknown;
    onFocus?: unknown;
    onFocusin?: unknown;
    onFocusout?: unknown;
    onBlur?: unknown;
    onChange?: unknown;
    onBeforeinput?: unknown;
    onInput?: unknown;
    onReset?: unknown;
    onSubmit?: unknown;
    onInvalid?: unknown;
    onLoad?: unknown;
    onError?: unknown;
    onKeydown?: unknown;
    onKeypress?: unknown;
    onKeyup?: unknown;
    onAuxclick?: unknown;
    onClick?: unknown;
    onContextmenu?: unknown;
    onDblclick?: unknown;
    onMousedown?: unknown;
    onMouseenter?: unknown;
    onMouseleave?: unknown;
    onMousemove?: unknown;
    onMouseout?: unknown;
    onMouseover?: unknown;
    onMouseup?: unknown;
    onAbort?: unknown;
    onCanplay?: unknown;
    onCanplaythrough?: unknown;
    onDurationchange?: unknown;
    onEmptied?: unknown;
    onEncrypted?: unknown;
    onEnded?: unknown;
    onLoadeddata?: unknown;
    onLoadedmetadata?: unknown;
    onLoadstart?: unknown;
    onPause?: unknown;
    onPlay?: unknown;
    onPlaying?: unknown;
    onProgress?: unknown;
    onRatechange?: unknown;
    onSeeked?: unknown;
    onSeeking?: unknown;
    onStalled?: unknown;
    onSuspend?: unknown;
    onTimeupdate?: unknown;
    onVolumechange?: unknown;
    onWaiting?: unknown;
    onSelect?: unknown;
    onScroll?: unknown;
    onTouchcancel?: unknown;
    onTouchend?: unknown;
    onTouchmove?: unknown;
    onTouchstart?: unknown;
    onPointerdown?: unknown;
    onPointermove?: unknown;
    onPointerup?: unknown;
    onPointercancel?: unknown;
    onPointerenter?: unknown;
    onPointerleave?: unknown;
    onPointerover?: unknown;
    onPointerout?: unknown;
    onWheel?: unknown;
    onAnimationstart?: unknown;
    onAnimationend?: unknown;
    onAnimationiteration?: unknown;
    onTransitionend?: unknown;
    onTransitionstart?: unknown;
} & {
    class: any;
    inlist: any;
} & {
    style?: import("vue").StyleValue;
    prefixCls?: string;
    title?: string;
    onCopy?: (payload: ClipboardEvent) => void;
    onCut?: (payload: ClipboardEvent) => void;
    onPaste?: (payload: ClipboardEvent) => void;
    onCompositionend?: (payload: CompositionEvent) => void;
    onCompositionstart?: (payload: CompositionEvent) => void;
    onCompositionupdate?: (payload: CompositionEvent) => void;
    onDrag?: (payload: DragEvent) => void;
    onDragend?: (payload: DragEvent) => void;
    onDragenter?: (payload: DragEvent) => void;
    onDragexit?: (payload: DragEvent) => void;
    onDragleave?: (payload: DragEvent) => void;
    onDragover?: (payload: DragEvent) => void;
    onDragstart?: (payload: DragEvent) => void;
    onDrop?: (payload: DragEvent) => void;
    onFocus?: (payload: FocusEvent) => void;
    onFocusin?: (payload: FocusEvent) => void;
    onFocusout?: (payload: FocusEvent) => void;
    onBlur?: (payload: FocusEvent) => void;
    onChange?: (payload: Event) => void;
    onBeforeinput?: (payload: Event) => void;
    onInput?: (payload: Event) => void;
    onReset?: (payload: Event) => void;
    onSubmit?: (payload: Event) => void;
    onInvalid?: (payload: Event) => void;
    onLoad?: (payload: Event) => void;
    onError?: (payload: Event) => void;
    onKeydown?: (payload: KeyboardEvent) => void;
    onKeypress?: (payload: KeyboardEvent) => void;
    onKeyup?: (payload: KeyboardEvent) => void;
    onAuxclick?: (payload: MouseEvent) => void;
    onClick?: (payload: MouseEvent) => void;
    onContextmenu?: (payload: MouseEvent) => void;
    onDblclick?: (payload: MouseEvent) => void;
    onMousedown?: (payload: MouseEvent) => void;
    onMouseenter?: (payload: MouseEvent) => void;
    onMouseleave?: (payload: MouseEvent) => void;
    onMousemove?: (payload: MouseEvent) => void;
    onMouseout?: (payload: MouseEvent) => void;
    onMouseover?: (payload: MouseEvent) => void;
    onMouseup?: (payload: MouseEvent) => void;
    onAbort?: (payload: Event) => void;
    onCanplay?: (payload: Event) => void;
    onCanplaythrough?: (payload: Event) => void;
    onDurationchange?: (payload: Event) => void;
    onEmptied?: (payload: Event) => void;
    onEncrypted?: (payload: Event) => void;
    onEnded?: (payload: Event) => void;
    onLoadeddata?: (payload: Event) => void;
    onLoadedmetadata?: (payload: Event) => void;
    onLoadstart?: (payload: Event) => void;
    onPause?: (payload: Event) => void;
    onPlay?: (payload: Event) => void;
    onPlaying?: (payload: Event) => void;
    onProgress?: (payload: Event) => void;
    onRatechange?: (payload: Event) => void;
    onSeeked?: (payload: Event) => void;
    onSeeking?: (payload: Event) => void;
    onStalled?: (payload: Event) => void;
    onSuspend?: (payload: Event) => void;
    onTimeupdate?: (payload: Event) => void;
    onVolumechange?: (payload: Event) => void;
    onWaiting?: (payload: Event) => void;
    onSelect?: (payload: Event) => void;
    onScroll?: (payload: UIEvent) => void;
    onTouchcancel?: (payload: TouchEvent) => void;
    onTouchend?: (payload: TouchEvent) => void;
    onTouchmove?: (payload: TouchEvent) => void;
    onTouchstart?: (payload: TouchEvent) => void;
    onPointerdown?: (payload: PointerEvent) => void;
    onPointermove?: (payload: PointerEvent) => void;
    onPointerup?: (payload: PointerEvent) => void;
    onPointercancel?: (payload: PointerEvent) => void;
    onPointerenter?: (payload: PointerEvent) => void;
    onPointerleave?: (payload: PointerEvent) => void;
    onPointerover?: (payload: PointerEvent) => void;
    onPointerout?: (payload: PointerEvent) => void;
    onWheel?: (payload: WheelEvent) => void;
    onAnimationstart?: (payload: AnimationEvent) => void;
    onAnimationend?: (payload: AnimationEvent) => void;
    onAnimationiteration?: (payload: AnimationEvent) => void;
    onTransitionend?: (payload: TransitionEvent) => void;
    onTransitionstart?: (payload: TransitionEvent) => void;
    role?: string;
    tabindex?: string | number;
    hidden?: boolean | "false" | "true";
    color?: string;
    contextmenu?: string;
    component?: string;
    id?: string;
    "aria-hidden"?: boolean | "false" | "true";
    placeholder?: string;
    dir?: string;
    "aria-selected"?: boolean | "false" | "true";
    prefix?: string;
    draggable?: boolean | "false" | "true";
    innerHTML?: string;
    accesskey?: string;
    contenteditable?: "inherit" | (boolean | "false" | "true");
    lang?: string;
    spellcheck?: boolean | "false" | "true";
    translate?: "yes" | "no";
    radiogroup?: string;
    about?: string;
    datatype?: string;
    property?: string;
    resource?: string;
    typeof?: string;
    vocab?: string;
    autocapitalize?: string;
    autocorrect?: string;
    autocave?: string;
    itemprop?: string;
    itemscope?: boolean | "false" | "true";
    itemtype?: string;
    itemid?: string;
    itemref?: string;
    results?: string | number;
    security?: string;
    unselectable?: "on" | "off";
    inputmode?: "url" | "email" | "text" | "none" | "search" | "tel" | "numeric" | "decimal";
    is?: string;
    "aria-activedescendant"?: string;
    "aria-atomic"?: boolean | "false" | "true";
    "aria-autocomplete"?: "none" | "both" | "inline" | "list";
    "aria-busy"?: boolean | "false" | "true";
    "aria-checked"?: "mixed" | (boolean | "false" | "true");
    "aria-colcount"?: string | number;
    "aria-colindex"?: string | number;
    "aria-colspan"?: string | number;
    "aria-controls"?: string;
    "aria-current"?: "date" | "time" | "page" | (boolean | "false" | "true") | "step" | "location";
    "aria-describedby"?: string;
    "aria-details"?: string;
    "aria-disabled"?: boolean | "false" | "true";
    "aria-dropeffect"?: "link" | "none" | "copy" | "move" | "popup" | "execute";
    "aria-errormessage"?: string;
    "aria-expanded"?: boolean | "false" | "true";
    "aria-flowto"?: string;
    "aria-grabbed"?: boolean | "false" | "true";
    "aria-haspopup"?: "dialog" | "menu" | "listbox" | "grid" | (boolean | "false" | "true") | "tree";
    "aria-invalid"?: (boolean | "false" | "true") | "grammar" | "spelling";
    "aria-keyshortcuts"?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-level"?: string | number;
    "aria-live"?: "off" | "polite" | "assertive";
    "aria-modal"?: boolean | "false" | "true";
    "aria-multiline"?: boolean | "false" | "true";
    "aria-multiselectable"?: boolean | "false" | "true";
    "aria-orientation"?: "horizontal" | "vertical";
    "aria-owns"?: string;
    "aria-placeholder"?: string;
    "aria-posinset"?: string | number;
    "aria-pressed"?: "mixed" | (boolean | "false" | "true");
    "aria-readonly"?: boolean | "false" | "true";
    "aria-relevant"?: "text" | "all" | "additions" | "additions text" | "removals";
    "aria-required"?: boolean | "false" | "true";
    "aria-roledescription"?: string;
    "aria-rowcount"?: string | number;
    "aria-rowindex"?: string | number;
    "aria-rowspan"?: string | number;
    "aria-setsize"?: string | number;
    "aria-sort"?: "none" | "ascending" | "descending" | "other";
    "aria-valuemax"?: string | number;
    "aria-valuemin"?: string | number;
    "aria-valuenow"?: string | number;
    "aria-valuetext"?: string;
}>, {
    class: any;
    inlist: any;
}>;
export default Typography;