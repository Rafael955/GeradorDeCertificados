import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  // Seletor: Adiciona a diretiva ao atributo [appMaxlength]
  selector: '[appMaxLength]',
  // Registra a classe como um provedor de validação do Angular
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxLengthDirective, multi: true }]
})
export class MaxLengthDirective implements Validator {
// Recebe o valor do limite (por exemplo, 150)
  @Input('appMaxLength') maxLength: string = "0";

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    // 1. Garante que temos um valor
    if (!value || !this.maxLength) {
      return null;
    }

    // 2. Verifica se o comprimento (length) excede o limite
    if (value.length > Number(this.maxLength)) {
      // 3. Retorna um *erro customizado* (ex: 'maxLimit')
      // Isso é o que você usará no seu @else if do template
      return {
        'appMaxLength': {
          requiredLength: this.maxLength,
          actualLength: value.length
        }
      };
    }

    return null;
  }
}
