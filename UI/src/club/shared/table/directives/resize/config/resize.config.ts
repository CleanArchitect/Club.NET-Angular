export class CleanResizeConfig {
    handleCssClass?: string;
    minWidth? = 10;
    minHeight? = 10;
    maxWidth?: number;
    maxHeight?: number;
    resizeHostElement? = true;

    constructor(config: Partial<CleanResizeConfig>) {
        Object.assign(this, config);
    }
}
