import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

type ShowIfEmptyContext = {
    condition: any[],
    templateToShow: TemplateRef<any>
}

@Directive({
    selector: '[appShowIfEmpty]'
})
export class ShowIfEmptyDirective {
    private hasView: boolean = false;
    private hasAlternativeView: boolean = false;

    @Input() set appShowIfEmpty(context: ShowIfEmptyContext) {
        const conditionIsValid: boolean = this.validateCondition(context.condition);
        this.updateView(conditionIsValid, context.templateToShow);
    }
    constructor(
        private readonly templateRef: TemplateRef<any>,
        private readonly viewContainer: ViewContainerRef
    ) {}

    private validateCondition(condition: any[]): boolean {
        return (condition && condition.length > 0);
    }

    private updateView(conditionIsValid: boolean, templateToShow: TemplateRef<any>): void {
        if (conditionIsValid) {
            this.showOriginalTemplate();
        } else {
            this.showAlternativeTemplate(templateToShow);
        }
    }

    private showOriginalTemplate(): void {
        if (!this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
            this.hasAlternativeView = false;
        }
    }

    private showAlternativeTemplate(templateToShow: TemplateRef<any>): void {
        if (!this.hasAlternativeView) {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(templateToShow);
            this.hasAlternativeView = true;
            this.hasView = false;
        }
    }
}
