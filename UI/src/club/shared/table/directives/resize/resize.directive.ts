import { Directive, ElementRef, EventEmitter, inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { CleanResizeConfig } from './config/resize.config';
import { ICleanResizeEvent } from './events/resized.event';
import { CleanResizeHandle } from './models/resize.handle';
import { CleanResizeHandlePosition, CleanResizePreset, presets } from './types/resize.types';

@Directive({ selector: '[clean-resize]' })
export class CleanResizeDirective implements OnInit {
    @Input({ alias: 'clean-resize', required: true }) resizeHandles: CleanResizePreset | CleanResizeHandlePosition | CleanResizeHandlePosition[];
    @Input({ alias: 'clean-resize-config' }) config: CleanResizeConfig;

    @Output() resized = new EventEmitter<ICleanResizeEvent>();

    private element = inject<ElementRef<HTMLElement>>(ElementRef);
    private renderer = inject(Renderer2);

    ngOnInit(): void {
        this.getPositions()
            .map(position => CleanResizeHandle
                .create(position, new CleanResizeConfig(this.config), this.element.nativeElement, this.renderer))
            .forEach(handle => handle.resized.subscribe(resizeEvent => this.resized.emit(resizeEvent)));
    }

    private getPositions(): CleanResizeHandlePosition[] {
        if (Array.isArray(this.resizeHandles))
            return this.resizeHandles;

        if (this.isResizePreset(this.resizeHandles))
            return presets[this.resizeHandles];

        return [this.resizeHandles];
    }

    private isResizePreset(value: unknown): value is CleanResizePreset {
        return typeof value === 'string' && value in presets;
    }
}