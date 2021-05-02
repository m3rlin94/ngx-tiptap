import { Directive, ElementRef, forwardRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Editor } from '@tiptap/core';

@Directive({
  selector: 'tiptap, [tiptap], tiptap-editor, [tiptapEditor]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorDirective),
    multi: true
  }]
})

export class EditorDirective implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() editor: Editor;
  @Input() outputFormat: 'json' | 'html' = 'html';

  constructor(private el: ElementRef<HTMLElement>, private _renderer: Renderer2) { }

  private onChange: (value: Record<string, any> | string) => void = () => {/** */ };
  private onTouched: () => void = () => { /** */};

  // Writes a new value to the element.
  // This methods is called when programmatic changes from model to view are requested.
  writeValue(value: Record<string, any> | string | null): void {
    if (!value) {
      return
    }

    if (!this.outputFormat && typeof value === 'string') {
      this.outputFormat = 'html';
    }

    this.editor.chain().setContent(value, false).run()
  }

  // Registers a callback function that is called when the control's value changes in the UI.
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registers a callback function that is called by the forms API on initialization to update the form model on blur.
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Called by the forms api to enable or disable the element
  setDisabledState(isDisabled: boolean): void {
    this.editor.setEditable(!isDisabled);
    this._renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
  }

  private handleChange = ({ transaction }) => {
    if (!transaction.docChanged) {
      return
    }

    if (this.outputFormat === 'html') {
      this.onChange(this.editor.getHTML());
      return;
    }

    this.onChange(this.editor.getJSON());
  }

  ngOnInit() {
    if (!this.editor) {
      throw new Error('Required: Input `editor`')
    }

    // take the inner contents and clear the block
    const innerHTML = this.el.nativeElement.innerHTML
    this.el.nativeElement.innerHTML = ''

    // insert the editor in the dom
    this.el.nativeElement.appendChild(this.editor.options.element.firstChild)

    // update the options for the editor
    this.editor.setOptions({ element: this.el.nativeElement })

    // update content to the editor
    if (innerHTML) {
      this.editor.chain().setContent(innerHTML, false).run()
    }

    // register blur handler to update `touched` property
    this.editor.on('blur', () => {
      this.onTouched()
    })

    // register transaction handler to emit changes on update
    this.editor.on('transaction', this.handleChange)
  }

  ngOnDestroy() {
    this.editor.destroy()
  }
}
