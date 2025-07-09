import { EventEmitter, Renderer2 } from '@angular/core';
import { fromEvent, takeUntil } from 'rxjs';
import { CleanResizeConfig } from '../config/resize.config';
import { ICleanResizeEvent } from '../events/resized.event';
import { CleanResizeDirection, CleanResizeHandlePosition } from '../types/resize.types';

export class CleanResizeHandle {
    resized = new EventEmitter<ICleanResizeEvent>();

    private get resizesWidth(): boolean {
        return this.handleElement.classList.contains('left') || this.handleElement.classList.contains('right');
    }

    private get resizesHeight(): boolean {
        return this.handleElement.classList.contains('top') || this.handleElement.classList.contains('bottom');
    }

    private constructor(private handleElement: HTMLElement, private config: CleanResizeConfig) { }

    static create(position: CleanResizeHandlePosition, config: CleanResizeConfig, resizeElement: HTMLElement, renderer: Renderer2): CleanResizeHandle {
        const handleElement = renderer.createElement('div') as HTMLElement;

        return new CleanResizeHandle(handleElement, config)
            .withClasses(position)
            .appendTo(resizeElement)
            .init(resizeElement);
    }

    private withClasses(position: CleanResizeHandlePosition): this {
        const classes = [this.config.handleCssClass, ...position.split(' ')]
            .filter(cssClass => !!cssClass?.trim());

        this.handleElement.classList.add('clean-resize-handle', ...classes);

        return this;
    }

    private appendTo(resizableElement: HTMLElement): this {
        resizableElement.style.position = 'relative';
        resizableElement.style.boxSizing = 'border-box';
        resizableElement.style.minWidth = `${this.config.minWidth}px`;
        resizableElement.style.maxWidth = `${this.config.maxWidth}px`;
        resizableElement.style.minHeight = `${this.config.minHeight}px`;
        resizableElement.style.maxHeight = `${this.config.maxHeight}px`;
        resizableElement.appendChild(this.handleElement);

        return this;
    }

    private init(resizableElement: HTMLElement): this {
        this.handleElement
            .addEventListener('mousedown', mouseDown => this
                .startResize(mouseDown, resizableElement), { passive: false });

        return this;
    }

    private startResize(startEvent: MouseEvent, resizableElement: HTMLElement) {
        startEvent.preventDefault();
        startEvent.stopPropagation();

        const startWidth = resizableElement.offsetWidth;
        const startHeight = resizableElement.offsetHeight;

        fromEvent<MouseEvent>(document, 'mousemove')
            .pipe(takeUntil(fromEvent<MouseEvent>(document, 'mouseup')))
            .subscribe(moveEvent => this.resize(resizableElement, startWidth, startHeight, startEvent, moveEvent));
    }

    private resize(resizableElement: HTMLElement, startWidth: number, startHeight: number, startEvent: MouseEvent, moveEvent: MouseEvent): void {
        const newWidth = startWidth + this.deltaMovement(moveEvent.clientX, startEvent.clientX, 'width');
        const newHeight = startHeight + this.deltaMovement(moveEvent.clientY, startEvent.clientY, 'height');

        if (this.config.resizeHostElement && this.resizesWidth)
            resizableElement.style.width = `${newWidth}px`;

        if (this.config.resizeHostElement && this.resizesHeight)
            resizableElement.style.height = `${newHeight}px`;

        this.emitEvent(resizableElement, newWidth, newHeight);
    }

    private emitEvent(resizableElement: HTMLElement, width: number, height: number): void {
        width = this.resizesWidth && !this.config.resizeHostElement ? width : resizableElement.offsetWidth;
        height = this.resizesHeight && !this.config.resizeHostElement ? height : resizableElement.offsetHeight;

        this.resized.emit({ width, height });
    }

    private deltaMovement(currentPosition: number, startPosition: number, direction: CleanResizeDirection): number {
        const delta = currentPosition - startPosition;

        return this.isInverse(direction) ? -delta : delta;
    }

    private isInverse(direction: CleanResizeDirection): boolean {
        return direction === 'width' && this.handleElement.classList.contains('left')
            || direction === 'height' && this.handleElement.classList.contains('top');
    }
}